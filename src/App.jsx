import AnectodesApp from "./Anecdotes";
import CountrySearchApp from "./CountrySearch";
import FeedBackApp from "./Feedback";
import Phonebook, { predefData } from "./Phonebook";


const App = () => {
  return (
    <>
    <FeedBackApp />
    <AnectodesApp />
    <Phonebook />
    <CountrySearchApp />
    </>
  );
}


export default App
