import { useDispatch } from "react-redux";
import { createAction } from "../reducers/anecdoteReducer";

export const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addNote = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        dispatch(createAction(content));
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addNote}>
                <div><input name="anecdote" /></div>
                <button type="submit">add</button>
            </form>
        </>
    );
}