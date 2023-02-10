export const ListForm = ({user, blogList}) => {
    const test = 'test';
    return (
        <div>
            <h1>blogs</h1>
            <p>{test} logged-in</p>
            <ul>
                {blogList.map((value) => {
                   return  <li key={value.id}>{value.title} {value.author}</li>;
                })}
            </ul>
        </div>
    );
}