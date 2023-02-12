export const Notification = ({ type, message }) => {
  return (
    <div className={type}>
        {message}
    </div>
  )
}