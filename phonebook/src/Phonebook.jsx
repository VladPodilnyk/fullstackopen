import { useEffect, useState } from 'react';
import { Header, Notification } from './components/generic';
import PhonebookController from './components/PhonebookController';
import PhonebookList from './components/PhonebookList';
import PhonebookSearch from './components/PhonebookSearch';
import server from './server';

const listToMap = (list) => {
    const map = new Map();
    list.forEach(element => map.set(element.name.trim().toLowerCase(), [element.number, element.id]));
    return map;
}

const Phonebook = () => {
    // in memory storage
    const [persons, setPersons] = useState(new Map());
    // stores filter key
    const [filterKey, setFilterKey] = useState('');

    const personDataDefault = { name: '', number: '' };
    const [personData, setPersonData] = useState(personDataDefault);

    const defaultMessage = { message: '', type: 'notification' };
    const [message, setMessage] = useState({ message: '', type: 'notification' });

    // preload phonebook from a db (on component mount);
    useEffect(() => {
        server.getAll().then(response => {
            const init = listToMap(response.data);
            setPersons(init);
        });
    }, []);

    // cleans up message
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(defaultMessage);
        }, 5000);

        return () => clearTimeout(timer);
    }, [message]);

    const onFilterChange = (event) => setFilterKey(event.target.value);
    const onDataChange = (event) => {
        const { name, value } = event.target;
        setPersonData({ ...personData, [name]: value });
    };

    const errorHandler = (error, msg) => {
        console.log(`Error: `, error);
        setMessage({ message: msg, type: 'error' });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (personData.name === '' || personData === '') {
            alert('Data is incomplete, please fill in all fields');
            return;
        }

        const newName = personData.name.trim().toLowerCase();
        if (persons.has(newName) && window.confirm(`Are you sure you want to update number for ${personData.name}?`)) {
            const [_, id] = persons.get(newName);
            server.update(id, personData).then(response => {
                const updatedData = new Map([...persons]);
                updatedData.set(newName, [personData.number, response.id]);
                setPersons(updatedData);
                setMessage({ ...defaultMessage, message: `Updated number for ${personData.name}` })
            }).catch(error => {
                const reason = error.response.data.error;
                errorHandler(error, `Failed to update number for ${personData.name} due to ${reason}`);
            });
        } else {    
            server.create(personData).then(response => {
                const updatedData = new Map([...persons, [personData.name, [personData.number, response.data.id]]]);
                setPersons(updatedData);
                setMessage({ ...defaultMessage, message: `Add number for person ${personData.name}` });
            }).catch(error => {
                const reason = error.response.data.error;
                errorHandler(error, `Failed to add number for ${personData.name} due to: ${reason}`);
            });
        }

        setPersonData(personDataDefault);
    };

    const onDelete = (personId, personName) => {
        if (window.confirm(`Are you sure you want to remove ${personName} and id ${personId} from a phonebook?`)) {
            server.deleteItem(personId)
            .then(_ => {
                setMessage({ ...defaultMessage, message: `Deleted number for ${personName}` });
                const updatedMap = new Map([...persons].filter(person => person[0] != personName));
                setPersons(updatedMap);
            })
            .catch(error => errorHandler(error, `Failed to delete data for ${personName} due to: ${error.message}`));
        }
    }


    return (
        <>
        <Header name='Phonebook' />
        <PhonebookSearch name='filter shown with' currentInput={filterKey} onChangeHandler={onFilterChange} />
        <Notification value={message} />
        <PhonebookController personData={personData} onDataChange={onDataChange} onSubmitHandler={onSubmit} />
        <PhonebookList filterKey={filterKey} records={persons} onDeleteAction={onDelete} />
        </>
    );
}

export default Phonebook;