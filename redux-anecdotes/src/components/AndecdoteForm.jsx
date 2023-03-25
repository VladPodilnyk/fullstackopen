import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

export const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addNote = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        dispatch(createAnecdote(content));
        dispatch(setNotification("The new anectode has been created."));
        event.target.anecdote.value = "";
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