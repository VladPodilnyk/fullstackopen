import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: "",
  reducers: {
    setNotification(_state, action) {
      return action.payload;
    }
  }
})

export const { setNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;