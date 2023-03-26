import { createSlice } from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload;
      const index = state.findIndex((value) => value.id === id);
      state[index].votes += 1;
      state.sort((left, right) => -(left.votes - right.votes));
      return state;
      
    },
    createAnecdote(state, action) {
      return [
        ...state,
        action.payload,
      ];
    },
    init(_state, action) {
      return action.payload;
    }
  }
})

export const { vote, createAnecdote, init } = anecdoteSlice.actions;
export const anecdoteReducer = anecdoteSlice.reducer;
