import { QuickHttpMethod } from './entity-service.model';

export abstract class QuickOfflineBackuper {
    abstract backup(url: string, method: QuickHttpMethod, body?: any): Promise<void>;
}
