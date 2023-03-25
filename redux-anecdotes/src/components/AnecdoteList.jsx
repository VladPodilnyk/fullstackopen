import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

export const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter !== "") {
            const res =  state.anecdote.filter((value) => {
                return value.content.toLowerCase().includes(state.filter);
            });

            console.log('debug >>> res = ', res);
            return res;
        }

        return state.anecdote;
    });
    const dispatch = useDispatch()

    const voteHandler = (id) => {
        dispatch(vote(id));
        const anecdote = anecdotes.find((value) => value.id === id);
        dispatch(setNotification(`You have voted for ${anecdote.content}`));
    }

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