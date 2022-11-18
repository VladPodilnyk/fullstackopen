import { Header, Button } from "./generic";

const PhonebookListElement = ({ name, number, onDeleteAction }) => (
    <li>{name} {number} <Button text='delete' onClick={onDeleteAction} /></li>
)

// this is bad, since there is no hits about of structure of records array :/
const getValuesToDisplay = (filterKey, records, onDeleteAction) => {
    let array = Array.from(records, ([person, data]) => ({ person, data }));

    if (filterKey !== '') {
        array = array.filter(record => record.person.toLowerCase().startsWith(filterKey));
    }

    return array.map(record => {
        const { person, data } = record;
        return (
            <PhonebookListElement 
                key={person} 
                name={person} 
                number={data[0]}  
                onDeleteAction={() => onDeleteAction(data[1], person)}
            />
        );
    });
}

const PhonebookList = ({ filterKey, records, onDeleteAction }) => {
    const values = getValuesToDisplay(filterKey, records, onDeleteAction);

    return (
        <>
        <Header name='Numbers' />
        <ul>{values}</ul>
        </>
    );
}

export default PhonebookList;