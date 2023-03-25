import { useEffect, useState } from "react";
import { useSelector } from "react-redux"


export const Notification = () => {
  const notification = useSelector(state => state.notification);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification !== "") {
      setIsVisible(true);
      setTimeout(
        () => setIsVisible(false),
        5000,
      )
    }
  }, [notification]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <>
      {isVisible ? (
          <div style={style}>
          {notification}
        </div>
      ) : null}
    </>
  )
}
