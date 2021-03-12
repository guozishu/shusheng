import { createAsyncThunk, createSlice  } from '@reduxjs/toolkit';

const initialState = {
    list: null
  };

export const fetchUserById = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId: string) => {
        return await fetch(`http://localhost:3000/home`).then(res => res.json())
    }
  )

  export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUserById.fulfilled]: (state, { payload }) => {
            state.list = payload;
        },
        [fetchUserById.pending]: (state, { payload }) => {
            state.list = payload;
        },
        [fetchUserById.rejected]: (state, { payload }) => {
            state.list = payload;
        },
    }
  });

  export default testSlice.reducer