// TODO: refector this shitty code ASAP.
import { useEffect, useState } from 'react';
import { Button, Header } from './common';
import server from './server';

const listToMap = (list) => {
    const map = new Map();
    list.forEach(element => map.set(element.name.trim().toLowerCase(), [element.number, element.id]));
    return map;
}

const PhonebookListElement = (props) => (
    <li>{props.name} {props.number} <Button text='delete' onClick={props.onDelete} /></li>
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
        const array = [...props.records];
        //console.log(`onDelete (id = ${array[0][1][1]})`);
        return (
            <>
            <Header name='Numbers' />
            <ul>
                { 
                    array.map(record => 
                        <PhonebookListElement 
                            key={record[0]} 
                            name={record[0]} 
                            number={record[1][0]} 
                            onDelete={props.onDelete(record[0], record[1][1])} />
                    )
                }
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
                { 
                    array.map(record => 
                        <PhonebookListElement 
                            key={record[0]} 
                            name={record[0]} 
                            number={record[1]} 
                            onDelete={props.onDelete(record[0], record[1][1])} />
                    ) 
                }
            </ul>
        </>
    );
}

// TODO: actually this needs to be better organized, I don't like this huge number of local arrow functions.
const Phonebook = () => {
    //const init = listToMap()
    // in memory storage
    const [persons, setPersons] = useState(new Map());
    // stores filter result
    const [filter, setFilter] = useState(new Map());

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterValue, setFilterValue] = useState('');


    useEffect(() => {
        server.getAll().then(response => {
            const init = listToMap(response.data);
            setPersons(init);
            setFilter(init);
        });
    }, []);

    // this looks awful, must be a name or an id, but not both xD
    const onDelete = (name, id) => {
        return () => {
            if (window.confirm(`Are you sure you want to remove ${name} from a phonebook?`)) {
                server.deleteItem(id).then(response => {
                    console.log(response);
                });

                const updatedMap = new Map([...persons].filter(person => person[0] != name));
                setPersons(updatedMap);
                setFilter(updatedMap);
                setFilterValue('');
            }
        }
    }

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

        if (persons.has(newName.trim().toLowerCase()) && window.confirm(`Are you sure you want to update number for ${name}?`) ) {
            const person = persons.get(newName);
            const id = person[1]
            const updatedData = { name: newName, number: newNumber, id: id };
            //console.log(`upd data for id=${id} person = ${person[0]} | ${person[1]}`, updatedData);
            server.update(id, updatedData).then(response => {
                console.log(response);
                const updatedList = new Map([...persons]);
                updatedList.set(newName, [newNumber, id]);
                setPersons(updatedList);
                setNewName('');
                setNewNumber('');
            });
        } else {
            const userData = { name: newName, number: newNumber }

            server.create(userData).then(response => {
                console.log(response);
                const updatedList = new Map([...persons, [newName, [newNumber, response.data.id]]]);
                setPersons(updatedList);
                setNewName('');
                setNewNumber('');
            });
        }
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
        <PhonebookList records={persons} filterValue={filterValue} filteredRecords={filter} onDelete={onDelete}/>
        </>
    );
}

export default Phonebook;