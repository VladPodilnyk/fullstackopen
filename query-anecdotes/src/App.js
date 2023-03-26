import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {anecodesService} from './server/anecdotes';
import { useNotificationDispatcher } from './context/NotificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const notificationDispatcher = useNotificationDispatcher();

  const voteMut = useMutation(anecodesService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
      notificationDispatcher({ type: 'SET_NOTIFICATION', payload: 'You have voted!!!' });
      setTimeout(
        () => notificationDispatcher({ type: 'CLEAN_NOTIFICATION' }),
        3000
      );
    }
  });

  const onVote = (anecdote) => {
    voteMut.mutate({...anecdote, votes: anecdote.votes + 1});
  }


  const {isError, isLoading, data} = useQuery('anecdotes', anecodesService.getAll, {
    retry: false,
    refetchOnWindowFocus: false
  });

  if (isError) {
    return <div>service is not availble at the moment...</div>;
  }

  if (isLoading) {
    return <div>loading data...</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {data.map(value =>
        <div key={value.id}>
          <div>
            {value.content}
          </div>
          <div>
            has {value.votes}
            <button onClick={() => onVote(value)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
