import { useState } from "react";
import { Header, Button } from "./common"
import { findMax } from "./utils";

const RandomAnecdote = (props) => {
    return (
        <>
        <Header name='Anecdote of the day' />
        <p>{props.selectedAnecdote}</p>
        <p>votes: {props.votes}</p>
        <Button text='vote' onClick={props.onVoteClick} />
        <Button text='next' onClick={props.onNextClick} />
        </>
    );
}

const MostVotedAnecdote = (props) => {
    if (props.votes === 0) {
        return (
            <>
            <Header name='Most voted anecdote' />
            <p>Nobody voted yet</p>
            </>
        );
    }
    return (
        <>
        <Header name='Most voted anecdote' />
        <p>{props.selectedAnecdote}</p>
        <p>votes: {props.votes}</p>
        </>
    );
}


const AnectodesApp = () => {
    const anecdotes = [
      'If it hurts, do it more often.',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ];
    const zeroArray = new Array(anecdotes.length).fill(0);
    const [votes, setVotes] = useState(zeroArray);
    const [selected, setSelected] = useState(0)

    const voteHandler = () => {
        const updatedVotes = [...votes];
        updatedVotes[selected] += 1;
        setVotes(updatedVotes);
        return;
    }

    const nextHandler = () => {
        const randomValue = Math.floor(Math.random() * (anecdotes.length - 1));
        setSelected(randomValue);
        return;
    }

    const [idx, max] = findMax(votes);
  
    return (
        <>
        <RandomAnecdote selectedAnecdote={anecdotes[selected]} votes={votes[selected]} onVoteClick={voteHandler} onNextClick={nextHandler} />
        <MostVotedAnecdote selectedAnecdote={anecdotes[idx]} votes={max} />
        </>
    )
}

export default AnectodesApp;

