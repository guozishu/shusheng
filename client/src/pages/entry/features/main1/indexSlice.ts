import { createSlice, PayloadAction, createAsyncThunk  } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface Content {
    content: object
}

const initialState = {
  content: {}
} as Content


export const getContentInfo = createSlice({
    name: 'getMenuData',
    initialState,
    reducers: {
      getContent: (state, action: PayloadAction<object>) => {
        state.content = action.payload
      }
    }
  })
  
  export const { getContent } = getContentInfo.actions;

  export default getContentInfo.reducer
