import { useState, useEffect, useCallback } from 'react'
import { CreateForm } from './CreateForm';
import { useNotification } from "../hooks/useNotification";
import { PageContainer } from './PageContainer';
import service from '../services/blogs';

export const ListForm = ({ user, setUser }) => {
    const [blogList, setBlogList] = useState([]);

    const { isVisible, notificationType, message, showNotification, showError } = useNotification();

    const getAll = useCallback(async () => {
        const res = await service.getAll();
        console.log('get all blogs result: ', res.data);
        setBlogList(res.data);
      }, [setBlogList, service]);
    
    useEffect(() => {
        showNotification(`welcome ${user.name}`);
        getAll();
    }, []);

    const handleLogout = () => {
        window.localStorage.removeItem('verifiedUser');
        service.setToken('');
        setUser(null);
    }

    return (
        <PageContainer
            title={"blogs"}
            isNotificationVisible={isVisible}
            notificationType={notificationType}
            notificationMessage={message}
        >
            <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
            <CreateForm
                setBlogList={setBlogList}
                showNotification={showNotification}
                showError={showError}
            />
            <ul>
                {blogList.map((value) => {
                   return  <li key={value.id}>{value.title} {value.author}</li>;
                })}
            </ul>
        </PageContainer>
    );
}