import { useState, useEffect } from "react";
import { PageContainer } from "./PageContainer";
import { useNotification } from "../hooks/useNotification";
import service from "../services/blogs";

export const LoginForm = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isVisible, notificationType, message, showNotification, showError } = useNotification();

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const onUsernamePassoword = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = async () => {
        if (username !== '' && password !== '') {
            try {
                const res = await service.login({
                    username: username,
                    password: password
                });
                window.localStorage.setItem('verifiedUser', JSON.stringify(res.data));
                service.setToken(res.data.token);
                setUser(res.data);
                setUsername('');
                setPassword('');
            } catch(e) {
                showError(e.message);
            }
        } else {
            showError("You have to fill in username and password fields!");
        }
    }


  return (
    <PageContainer
        title={"log in to application"}
        isNotificationVisible={isVisible}
        notificationType={notificationType}
        notificationMessage={message}
    >
      <div>username: <input name="username" value={username} onChange={onUsernameChange} /></div>
      <div>password: <input name="password" value={password} onChange={onUsernamePassoword} /></div>
      <button onClick={handleLogin}>login</button>
    </PageContainer>
  )
}