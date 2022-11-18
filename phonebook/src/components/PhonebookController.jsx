import { Button, Header } from "./generic";
import PhonebookInputElement from "./PhonebookInputElement";

const PhonebookController = ({ personData, onDataChange, onSubmitHandler }) => {
    return (
        <>
        <Header name='add number'/>
        <form onSubmit={onSubmitHandler}>
            <PhonebookInputElement name='name' currentInput={personData.name} onChangeHandler={onDataChange} />
            <PhonebookInputElement name='number' currentInput={personData.number} onChangeHandler={onDataChange} />
            <Button type='submit' text='add' />
        </form>
        </>
    );
}

export default PhonebookController;