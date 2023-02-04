import { useState } from "react";

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isNotificationVisible, setNotificationVisible] = useState(false);

  const errorMessage = "You have to fill in username and password fields!"

  const onUsernameChange = (event) => {
    if (event.target?.username) {
        setUsername(event.target.username);
    }
  }

  const onUsernamePassoword = (event) => {
    if (event.target?.password) {
        setPassword(event.target.password);
    }
  }

  const handleLogin = () => {
    if (username && username !== '' && password && password !== '') {

    } else {
        setNotificationVisible(true)
    }
    return;
  }


  return (
    <div>
      <h2>log in to application</h2>
      {isNotificationVisible ? <Notification type="error" message={errorMessage}/> : null}
      <div>usename: <input name="username" value={username} onChange={onUsernameChange} /></div>
      <div>assoword: <input name="password" value={password} onChange={onUsernamePassoword} /></div>
      <button onClick={handleLogin}>login</button>
    </div>
  )
}