import { QuickReduxAction } from "../state.model";

export interface QuickStateValueActionKeys {
  clear: string;
  set: string;
}

export type QuickStateValueAction<T> = QuickReduxAction<string, T>;

export interface QuickStateValueActions<T = any> {
  set: (item: T) => void;
  clear: () => void;
}
