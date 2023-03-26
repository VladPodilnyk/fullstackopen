import { useSelector, useDispatch } from 'react-redux'
import { initAnecdotes, voteForeAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useEffect } from 'react';

export const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter !== "") {
            const res =  state.anecdote.filter((value) => {
                return value.content.toLowerCase().includes(state.filter);
            });

            return res;
        }

        return state.anecdote;
    });
    const dispatch = useDispatch();

    const voteHandler = (id) => {
        dispatch(voteForeAnecdote(id));
        const anecdote = anecdotes.find((value) => value.id === id);
        dispatch(setNotification(`You have voted for ${anecdote.content}`));
    }

    useEffect(() => {
      dispatch(initAnecdotes());
    }, [dispatch]);

    return (
        <>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => voteHandler(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
        </>
    );
}