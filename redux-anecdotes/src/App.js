import { AnecdoteList } from './components/AnecdoteList'
import { AnecdoteForm } from './components/AndecdoteForm'
import { AnecdoteSearch } from './components/AnecdoteSearch'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteSearch />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App