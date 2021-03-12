import { createSlice, PayloadAction, createAsyncThunk  } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface Menu {
    menuList: object
}

const initialState = {
    menuList: {}
} as Menu


export const toggleName = createSlice({
    name: 'getMenuData',
    initialState,
    reducers: {
      getMenuList: (state, action: PayloadAction<object>) => {
        state.menuList = action.payload
      }
    }
  })
  
  export const { getMenuList } = toggleName.actions;

  export default toggleName.reducer
