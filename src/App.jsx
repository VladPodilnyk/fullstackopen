import AnectodesApp from "./Anecdotes";
import FeedBackApp from "./Feedback";
import Phonebook, { predefData } from "./Phonebook";


const App = () => {
  return (
    <>
    <FeedBackApp />
    <AnectodesApp />
    <Phonebook init={predefData} />
    </>
  );
}


export default App
