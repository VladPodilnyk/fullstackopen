import { useState, useEffect, useCallback } from 'react'
import { ListForm } from "./components/ListForm";
import { LoginForm } from "./components/LoginForm";
import service from './services/blogs';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogList, setBlogList] = useState(null);

  const getAll = useCallback(async () => {
    const res = await service.getAll();
    console.log(res);
    setBlogList(res.data);
  }, [setBlogList]);

  useEffect(() => {
    if (user !== null) {
      getAll();
    }
    getAll();
  }, [user, getAll]);

  return (
    <>
    {/* {user === null ? <LoginForm setUser={setUser} /> : <ListForm user={user} blogList={blogList} />} */}
    { blogList === null ? null : <ListForm user={user} blogList={blogList} /> }
    </>
  )
}

export default App;
