import React from "react";
import { Alert, AlertTitle } from "@mui/material"

// User Notification Module to be used throughout the application
export default function NotificationModal({notificationType, message, headerTitle, onCloseNotification}) {
    return (
            <Alert severity={notificationType} onClose={onCloseNotification}>
                <AlertTitle>{headerTitle}</AlertTitle>
                {message}
            </Alert>
    );
}