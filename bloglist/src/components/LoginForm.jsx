import { useState } from "react";
import service from "../services/blogs";

export const LoginForm = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isNotificationVisible, setNotificationVisible] = useState(false);

    const invalidDataError = "You have to fill in username and password fields!"
    let errorMessage;

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const onUsernamePassoword = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = async () => {
        if (username && username !== '' && password && password !== '') {
            try {
                const res = await service.login({
                    username: username,
                    password: password
                });
                setToken(res.data.token);
                setUser(res.data);
            } catch(e) {
                errorMessage = e.message;
                setNotificationVisible(true);
                setTimeout(
                    setNotificationVisible(false),
                    5000
                );
        }
        } else {
            errorMessage = invalidDataError;
            setNotificationVisible(true);
            setTimeout(
                setNotificationVisible(false),
                5000
            );
        }
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