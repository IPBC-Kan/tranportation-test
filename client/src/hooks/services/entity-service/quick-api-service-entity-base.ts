import { QuickEntityBase } from './entity-service.model';
import { QuickApiServiceBase } from './quick-api-service-base';

export abstract class QuickApiServiceEntityBase<
    TEntity extends QuickEntityBase<TKey>,
    TKey = number | string
> extends QuickApiServiceBase {
    protected async handleGetEntities(
        options: { url?: string; isAppended?: boolean } = {}
    ): Promise<TEntity[]> {
        const builtUrl = this.buildUrl(options);

        console.log(`Getting ${this.entityName} from ${builtUrl} ... `);

        const { data } = await this.apiProvider.get<TEntity[]>(builtUrl);

        const entities = data.map<TEntity>((entity: TEntity) =>
            this.manipulateEntityAfterFetch(entity)
        );

        console.log(`Fetched ${this.entityName}`, entities);

        return entities;
    }

    protected manipulateEntityAfterFetch(entity: TEntity): TEntity {
        return entity;
    }

    public async getEntities(): Promise<TEntity[]> {
        return this.handleGetEntities();
    }

    public async getEntity(entityId: TKey): Promise<TEntity> {
        console.log(`Getting Entity ${this.entityName}.${entityId} ... `);

        const entity = await this.getOrThrow<TEntity>({ url: String(entityId) });

        const fetchedEntity = this.manipulateEntityAfterFetch(entity);

        console.log(`Fetched Entity ${this.entityName}.${entityId})`, fetchedEntity);

        return fetchedEntity;
    }
}
