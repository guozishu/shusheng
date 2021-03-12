import { createSlice, PayloadAction, createAsyncThunk  } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface User {
    isShow: boolean,
    name: string
}

const initialState = {
    isShow: true,
    name: 'wanglong'
} as User


export const toggleName = createSlice({
    name: 'showName',
    initialState,
    reducers: {
      showName: (state, action: PayloadAction<boolean>) => {
        state.isShow = action.payload
      },
      hideName: (state, action: PayloadAction<boolean>) => {
        state.isShow = action.payload
      },
      changeName: (state, action: PayloadAction<string>) => {
          state.name = action.payload
      }
    }
  })
  
  export const { showName, hideName, changeName } = toggleName.actions;

  export const hideAsync = (isShow: boolean): AppThunk => dispatch => {
    setTimeout(() => {
      dispatch(hideName(isShow));
    }, 1000);
  };

  export const isNameShow = (state: RootState) => state.showName.isShow;

  export const userName = (state: RootState) => state.showName.name;

  export default toggleName.reducer
