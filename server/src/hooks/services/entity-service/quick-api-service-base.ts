import { isNil } from 'lodash';
import { QuickLogger } from '../quick-logger';
import {
    DownloadProps,
    QuickApiProvider,
    QuickHttpMethod,
    UrlBuildOptions,
    UrlBuildOptionsSimple
} from './entity-service.model';
import { QuickHttpStatusCode } from './http-status-code';
import { QuickOfflineBackuper } from './quick-offline-backuper';

export abstract class QuickApiServiceBase {
    private readonly httpMethodCallMapper;

    constructor(
        protected readonly logger: QuickLogger,
        protected readonly apiProvider: QuickApiProvider,
        protected readonly apiPrefix: string,
        protected readonly entityName: string,
        protected readonly apiBackuper?: QuickOfflineBackuper
    ) {
        this.httpMethodCallMapper = {
            GET: apiProvider.get,
            POST: apiProvider.post,
            PUT: apiProvider.put,
            DELETE: apiProvider.delete
        };
    }

    protected buildUrl(urlProps: UrlBuildOptions): string {
        const { url, isAppended = true } = urlProps;

        if (!url) {
            return this.apiPrefix;
        }

        if (isAppended) {
            return url
                ? `${this.apiPrefix.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`
                : this.apiPrefix;
        }

        return url;
    }

    private async handleCall<T>(
        options: UrlBuildOptions,
        method: QuickHttpMethod,
        throwExceptionIfNotOk: boolean,
        body?: any
    ) {
        const builtUrl = this.buildUrl(options);

        const backup = () => {
            this.apiBackuper.backup(builtUrl, method, body);
        };

        try {
            const callback = this.httpMethodCallMapper[method];

            this.logger.info(`Handling call for ${builtUrl} (${method}) ... `);

            if (options?.transformToFormData && body) {
                const formData = new FormData();
                for (const [key, value] of Object.entries(body)) {
                    if (!isNil(value)) {
                        // Is the value an object or an array and not a file
                        if (typeof value === 'object' && !(value instanceof File)) {
                            formData.append(key, JSON.stringify(value));
                        } else {
                            formData.append(key, value as any);
                        }
                    }
                }

                body = formData;
            }

            const response = await callback<T>(builtUrl, body);

            if (response.httpStatusCode !== QuickHttpStatusCode.OK) {
                if (options.offlineBackup) {
                    backup();
                }

                if (throwExceptionIfNotOk) {
                    throw new Error(
                        `Cannot handle call for ${builtUrl} (${method}): Response's status is ${response.httpStatusCode} and throw flag is on`
                    );
                }
            }

            return response;
        } catch (err) {
            this.logger.error(
                `Cannot Handle call for ${builtUrl} (${method}), exception was thrown`,
                err
            );

            if (options.offlineBackup) {
                this.logger.info(
                    `Backing up failed API call for ${builtUrl} (${method}) ... `
                );

                backup();
            }

            throw err;
        }
    }

    protected get<T>(options: UrlBuildOptions = {}) {
        return this.handleCall<T>(options, 'GET', false);
    }

    protected async getOrThrow<T>(options: UrlBuildOptions = {}) {
        const { data } = await this.handleCall<T>(options, 'GET', true);

        return data;
    }

    protected delete<T = any>(options: UrlBuildOptions = {}) {
        return this.handleCall<T>(options, 'DELETE', false);
    }

    protected async deleteOrThrow<T>(options: UrlBuildOptions = {}) {
        const { data } = await this.handleCall<T>(options, 'DELETE', true);

        return data;
    }

    protected post<T>(body: any, options: UrlBuildOptions = {}) {
        return this.handleCall<T>(options, 'POST', false, body);
    }

    protected async postOrThrow<T>(body: any, options: UrlBuildOptions = {}) {
        const { data } = await this.handleCall<T>(options, 'POST', true, body);

        return data;
    }

    protected async put<T>(body: any, options: UrlBuildOptions = {}) {
        return this.handleCall<T>(options, 'PUT', false, body);
    }

    protected async putOrThrow<T>(body: any, options: UrlBuildOptions = {}) {
        const { data } = await this.handleCall<T>(options, 'PUT', true, body);

        return data;
    }

    protected async downloadFile(url: UrlBuildOptionsSimple, fileName?: string) {
        const finalUrl = this.buildUrl(url);

        const data = await this.apiProvider.get(finalUrl, {
            responseType: 'blob'
        });

        let fileNameToSave: string;

        if (fileName) {
            fileNameToSave = fileName;
        } else {
            const urlObj = new URL(finalUrl);

            fileNameToSave = urlObj.pathname?.length
                ? urlObj.pathname.split('/').pop()
                : 'file';
        }

        this.apiProvider.saveBlob(data.data as Blob, fileNameToSave);
    }

    protected async downloadFileComplexOrThrow(options: DownloadProps) {
        try {
            const { method, urlBuildOpts, fileName } = options;
            const finalUrl = this.buildUrl(urlBuildOpts);

            let data = null;

            switch (method) {
                case 'GET': {
                    data = await this.apiProvider.get(finalUrl, {
                        responseType: 'blob'
                    });
                    break;
                }
                case 'POST': {
                    const { body } = options;
                    data = await this.apiProvider.post(finalUrl, body, {
                        responseType: 'blob'
                    });
                    break;
                }
                case 'PUT': {
                    const { body } = options;
                    data = await this.apiProvider.put(finalUrl, body, {
                        responseType: 'blob'
                    });
                    break;
                }
                case 'DELETE': {
                    data = await this.apiProvider.delete(finalUrl, {
                        responseType: 'blob'
                    });
                    break;
                }
            }

            this.apiProvider.saveBlob(data.data as Blob, fileName);
        } catch (err: any) {
            throw err;
        }
    }
}
