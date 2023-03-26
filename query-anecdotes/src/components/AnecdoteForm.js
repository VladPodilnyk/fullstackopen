import { useMutation, useQueryClient } from 'react-query'
import {anecodesService} from '../server/anecdotes';
import { useNotificationDispatcher } from '../context/NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatcher = useNotificationDispatcher();

  const createNodeMut = useMutation(anecodesService.createNew, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
      notificationDispatcher({ type: 'SET_NOTIFICATION', payload: 'A new anecdote has been created.' });
      setTimeout(
        () => notificationDispatcher({ type: 'CLEAN_NOTIFICATION' }),
        3000
      );
    },
    onError: () => {
      notificationDispatcher({ type: 'SET_NOTIFICATION', payload: 'Erros has occured.' });
      setTimeout(
        () => notificationDispatcher({ type: 'CLEAN_NOTIFICATION' }),
        3000
      );
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    createNodeMut.mutate(content);
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
