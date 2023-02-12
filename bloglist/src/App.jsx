import { useEffect, useState } from 'react';
import { ListForm } from "./components/ListForm";
import { LoginForm } from "./components/LoginForm";
import service from './services/blogs';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifiedUser = JSON.parse(window.localStorage.getItem('verifiedUser'))
    if (verifiedUser) {
      setUser(verifiedUser);
      service.setToken(verifiedUser.token);
    }
  }, []);

  return (
    <>
    {user === null ? <LoginForm setUser={setUser} /> : <ListForm user={user} setUser={setUser} />}
    </>
  )
}

export default App;
