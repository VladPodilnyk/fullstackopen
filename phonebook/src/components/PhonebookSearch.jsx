import PhonebookInputElement from "./PhonebookInputElement";

const PhonebookSearch = ({ name, currentInput, onChangeHandler }) => {
    return (
        <PhonebookInputElement name={name} currentInput={currentInput} onChangeHandler={onChangeHandler} />
    );
}

export default PhonebookSearch;
