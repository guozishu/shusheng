import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reducers from '../reducers/index'

export const store = configureStore(reducers);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
