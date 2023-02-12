import { Notification } from "./Notification"

export const PageContainer = ({
    title,
    isNotificationVisible,
    notificationType,
    notificationMessage,
    children
}) => {
    return (
        <div>
            <h1>{title}</h1>
            {isNotificationVisible ? <Notification type={notificationType} message={notificationMessage} /> : null}
            {children}
        </div>
    )
}