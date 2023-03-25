import { AnecdoteList } from './components/AnecdoteList'
import { AnecdoteForm } from './components/AndecdoteForm'
import { AnecdoteSearch } from './components/AnecdoteSearch'
import { Notification } from './components/Notification';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteSearch />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App