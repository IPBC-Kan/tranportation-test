import { QuickHttpStatusCode } from './http-status-code';

export type QuickHttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface QuickEntityBase<TKey = number | string> {
    id: TKey;
}

export interface UrlBuildOptionsSimple {
    url?: string;
    isAppended?: boolean;
}

export interface UrlBuildOptions extends UrlBuildOptionsSimple {
    offlineBackup?: boolean;
    transformToFormData?: boolean;
}

interface DownloadWithPayload {
    method: 'PUT' | 'POST';
    body?: any;
    fileName: string;
    urlBuildOpts: UrlBuildOptionsSimple;
}

interface Download {
    method: 'GET' | 'DELETE';
    fileName: string;
    urlBuildOpts: UrlBuildOptionsSimple;
}

export type DownloadProps = DownloadWithPayload | Download;

export interface QuickApiProvider {
    updateJwtToken: (token: string) => void;

    get: <T>(
        url: string,
        options?: { responseType?: 'blob' }
    ) => Promise<{ data: T; httpStatusCode: QuickHttpStatusCode }>;

    post: <T>(
        url: string,
        body: any,
        options?: { responseType?: 'blob' }
    ) => Promise<{ data: T; httpStatusCode: QuickHttpStatusCode }>;

    put: <T>(
        url: string,
        body: any,
        options?: { responseType?: 'blob' }
    ) => Promise<{ data: T; httpStatusCode: QuickHttpStatusCode }>;

    delete: <T>(
        url: string,
        options?: { responseType?: 'blob' }
    ) => Promise<{ data: T; httpStatusCode: QuickHttpStatusCode }>;

    saveBlob: (data: Blob, fileName: string) => void;
}
