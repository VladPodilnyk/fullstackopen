import { useState } from 'react';
import service from '../services/blogs';

export const CreateForm = ({ setBlogList, showError, showNotification }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const onTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const onAuthorChange = (event) => {
        setAuthor(event.target.value);
    }

    const onUrlChange = (event) => {
        setUrl(event.target.value);
    }

    const onCreate = async () => {
        try {
            const res = await service.create({
                title: title,
                author: author,
                url: url
            });

            setBlogList((oldList) => oldList.concat([res.data]));
            showNotification(`a new blog '${title}' by ${author} added`);
            setTitle('');
            setAuthor('');
            setUrl('');
        } catch(e) {
            showError('failed to create a new blog :(');
        }
    }

    return (
        <div>
            <h1>create new</h1>
            <div>title <input name="title" value={title} onChange={onTitleChange} /></div>
            <div>author <input name="author" value={author} onChange={onAuthorChange} /></div>
            <div>url <input name="url" value={url} onChange={onUrlChange} /></div>
            <button onClick={onCreate}>create</button>
        </div>
    );
}