import { QuickReduxAction } from '../state.model';

export interface QuickReducerArrayAction<T>
    extends QuickReduxAction<
        string,
        { data: T; key?: string; condition?: (item: T) => boolean }
    > {
    index?: number;
}

export interface QuickStateArrayActions<T = any> {
    clear: () => void;
    push: (item: T) => void;
    set: (item: T[]) => void;
    setItem: (item: T, index: number) => void;
    remove: (item: T) => void;
    removeByIndex: (index: number) => void;
    removeWhere: (condition: (item: T) => boolean) => void;
    updateWhere: (item: T, condition: (item: T) => boolean) => void;
    upsert: (item: any, condition: (item: T) => boolean) => void;
    partialUpdateWhere: (item: T, condition: (item: T) => boolean) => void;
}
