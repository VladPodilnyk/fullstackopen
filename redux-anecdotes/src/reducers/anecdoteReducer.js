import { createSlice } from '@reduxjs/toolkit';
import { anecodesService } from '../server/anecdotes';

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
    appendAnecdote(state, action) {
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

export const { vote, appendAnecdote, init } = anecdoteSlice.actions;
export const anecdoteReducer = anecdoteSlice.reducer;

export const initAnecdotes = () => {
  return async (dipatch) => {
    const res = await anecodesService.getAll();
    dipatch(init(res))
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const res = await anecodesService.createNew(anecdote);
    dispatch(appendAnecdote(res));
  }
};

export const voteForeAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState().anecdote;
    const index = state.findIndex((value) => value.id === id);
    const updatedData = {
      ...state[index],
      votes: state[index].votes + 1
    };
    await anecodesService.update(id, updatedData);
    dispatch(vote(id));
  }
};

