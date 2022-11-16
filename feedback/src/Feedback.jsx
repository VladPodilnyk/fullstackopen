import { useState } from 'react'
import { Header, Button } from './common';

const StatisticsLine = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.value}</td>
        </tr>
    );
}

const Statistics = (props) => {
    if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
        return (
            <>
            <Header name='statistics' />
            <p>No feedback given</p>
            </>
        );
    }


    const total = props.good + props.neutral + props.bad;
    const avg = (props.good - props.bad) / total;
    const percentageOfGood = `${(props.good / total) * 100} %`;

    return (
        <>
        <Header name='statistics' />
        <table>
            <tbody>
                <StatisticsLine name='good' value={props.good} />
                <StatisticsLine name='neutral' value={props.neutral} />
                <StatisticsLine name='bad' value={props.bad} />
                <StatisticsLine name='total' value={total} />
                <StatisticsLine name='avg' value={avg} />
                <StatisticsLine name='positive' value={percentageOfGood} />
            </tbody>
        </table>
        </>
    );
}


export const FeedBackApp = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <>
        <Header name='give feedback' />
        <Button text='good' onClick={() => setGood(good + 1)} />
        <Button text='neutral' onClick={() => setNeutral(neutral + 1)} />
        <Button text='bad' onClick={() => setBad(bad + 1)} />
        <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    );
}

export default FeedBackApp;