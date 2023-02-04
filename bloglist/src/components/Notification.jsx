export const Notification = ({ value }) => {
  if (!value?.message || !value?.type) {
    return null;
  }

  return (
    <div className={value.type}>
        {value.message}
    </div>
  )
}