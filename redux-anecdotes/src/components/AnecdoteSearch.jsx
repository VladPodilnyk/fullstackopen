import { useDispatch } from "react-redux"
import { setSearchToken } from "../reducers/filterReducer";

export const AnecdoteSearch = () => {
    const dispatch = useDispatch();

    const onChange = (event) => {
        const token = event.target.value.toLowerCase().trim();
        dispatch(setSearchToken(token));
    }

    return (
        <div>
            filter: <input name="filter" onChange={onChange} />
        </div>
    )
}