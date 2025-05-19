import { QuickLogger } from '../quick-logger';
import {
    QuickApiProvider,
    QuickEntityBase,
    UrlBuildOptions
} from './entity-service.model';
import { QuickApiServiceEntityBase } from './quick-api-service-entity-base';

export abstract class QuickApiEntityService<
    TEntity extends QuickEntityBase<TKey>,
    TKey = number | string
> extends QuickApiServiceEntityBase<TEntity, TKey> {
    constructor(
        logger: QuickLogger,
        apiProvider: QuickApiProvider,
        apiPrefix: string,
        entityName: string
    ) {
        super(logger, apiProvider, apiPrefix, entityName);
    }

    protected async handleCreateEntity(
        body: any,
        options: UrlBuildOptions = {}
    ): Promise<TEntity> {
        console.log(`Handling Creating ${this.entityName} ... `, body);

        const data = await this.postOrThrow<TEntity>(body, options);

        const createdEntity = this.manipulateEntityAfterFetch(data);

        console.log(`Handled Create Entity`, createdEntity);

        return createdEntity;
    }

    public async create(entity: TEntity): Promise<TEntity> {
        return this.handleCreateEntity(entity);
    }

    protected async handleUpdateEntity(entity: TEntity, options: UrlBuildOptions = {}) {
        console.log(`Updating ${this.entityName} (${entity?.id}) ... `, entity);

        const data = await this.putOrThrow<TEntity>(entity, options);

        const updatedEntity = this.manipulateEntityAfterFetch(data);

        console.log(`Updated Entity`, updatedEntity);

        return updatedEntity;
    }

    public async update(entity: TEntity): Promise<TEntity> {
        return this.handleUpdateEntity(entity);
    }

    public async remove(entity: TEntity | TKey): Promise<boolean> {
        const customerId = (entity as TEntity)?.id || (entity as TKey);

        await this.apiProvider.delete(`${this.apiPrefix}/${customerId}`);

        return true;
    }
}
