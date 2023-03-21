import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer';

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

    const vote = (id) => {
        dispatch(voteAction(id))
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
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
        </>
    );
}