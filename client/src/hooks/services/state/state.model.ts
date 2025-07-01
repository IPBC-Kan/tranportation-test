import { Action } from "@reduxjs/toolkit";

// export interface QuickReduxAction<TType = string, T = any> {
//   type: TType;
//   payload?: T;
// }
export interface QuickReduxAction<TType extends string = string, TPayload = any>
  extends Action<TType> {
  payload?: TPayload;
}

export type QuickReducer<TState = any> = (
  state: TState,
  action: QuickReduxAction
) => TState;

export type QuickReduxDispatch = (action: QuickReduxAction) => void;
