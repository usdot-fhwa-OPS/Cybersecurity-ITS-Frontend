/*
 * Copyright (C) 2024 LEIDOS.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

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