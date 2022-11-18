const PhonebookInputElement = ({ name, currentInput, onChangeHandler }) => (
    <div>{name}: <input name={name} value={currentInput} onChange={onChangeHandler} /></div>
)

export default PhonebookInputElement;