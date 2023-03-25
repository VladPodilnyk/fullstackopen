import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: "",
  reducers: {
    setSearchToken(_state, action) {
      return action.payload;
    }
  }
})

export const { setSearchToken } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;