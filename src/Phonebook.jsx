import { useState } from 'react'
import { Header, Button } from './common';

export const predefData = [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ];

const listToMap = (list) => {
    const map = new Map();
    list.forEach(element => map.set(element.name, element.number));
    return map;
}

const PhonebookListElement = (props) => (
    <li>{props.name} {props.number}</li>
)

const PhonebookInputElement = (props) => (
    <div>{props.name}: <input value={props.currentInput} onChange={props.onChangeHandler} /></div>
)

const PhonebookSearch = (props) => {
    return (
        <PhonebookInputElement name={props.name} currentInput={props.currentInput} onChangeHandler={props.onChangeHandler} />
    );
}

const PhonebookController = (props) => {
    return (
        <>
        <Header name='add number'/>
        <form onSubmit={props.onSubmitHandler}>
            <PhonebookInputElement name='name' currentInput={props.name} onChangeHandler={props.onNameChange} />
            <PhonebookInputElement name='number' currentInput={props.number} onChangeHandler={props.onNumberChange} />
            <Button type='submit' text='add' />
        </form>
        </>
    );
}

const PhonebookList = (props) => {
    if (props.filterValue === '' || props.filterValue === undefined) {
        // ugly workaround that I need to implement bc js Map doesn't have a `map` method :/
        console.log(`here we go filter value = ${props.filter}`);
        const array = [...props.records];
        return (
            <>
            <Header name='Numbers' />
            <ul>
                { array.map(record => <PhonebookListElement key={record[0]} name={record[0]} number={record[1]} />) }
            </ul>
            </>
        );
    }

    // ugly workaround that I need to implement bc js Map doesn't have a `map` method :/
    const array = [...props.filteredRecords];
    return (
        <>
        <Header name='Numbers' />
        <ul>
            { array.map(record => <PhonebookListElement key={record[0]} name={record[0]} number={record[1]} />) }
        </ul>
        </>
    );
}

const Phonebook = (props) => {
    const init = listToMap(props.init)
    // in memory storage
    const [persons, setPersons] = useState(init);
    // stores filter result
    const [filter, setFilter] = useState(init);

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterValue, setFilterValue] = useState('');

    const onFilterChange = (event) => {
        const inputValue = event.target.value.toLowerCase().trim();
        setFilterValue(event.target.value);
       
        const filteredValues = new Map();
        persons.forEach((value, key) => {
            if (key.toLowerCase().startsWith(inputValue)) {
                filteredValues.set(key, value);
            }
        });

        setFilter(filteredValues);
    };

    const addNumber = (event) => {
        event.preventDefault();

        if (newName === '') {
            alert('Name field is empty.');
            return;
        }

        if (newNumber === '') {
            alert('Number field is empty.');
            return;
        }

        if (persons.has(newName)) {
            alert(`${newName} phone number has been already in the list.`);
            return;
        }

        const updatedList = new Map([...persons, [newName, newNumber]]);
        setPersons(updatedList);
        setNewName('');
        setNewNumber('');
    };

    const onNameChangeHandler = (event) => setNewName(event.target.value);
    const onNumberChangeHandler = (event) => setNewNumber(event.target.value);

    return (
        <>
        <Header name='Phonebook' />
        <PhonebookSearch name='filter shown with' currentInput={filterValue} onChangeHandler={onFilterChange} />
        <PhonebookController
            name={newName}
            number={newNumber}
            onNameChange={onNameChangeHandler}
            onNumberChange={onNumberChangeHandler}
            onSubmitHandler={addNumber}
        />
        <PhonebookList records={persons} filterValue={filterValue} filteredRecords={filter} />
        </>
    );
}

export default Phonebook;