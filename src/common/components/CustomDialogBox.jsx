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

import React from 'react'
import { Dialog,DialogActions,DialogContent,DialogContentText, DialogTitle, Button}  from '@mui/material';
import { Trans } from "react-i18next";

export const CustomDialogBox = ({isDialogOpen, title, content, handleConfirmation, handleCancellation,
  confirmColor}) => {
  return (
    <Dialog open={isDialogOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="CustomDialogBox.alert-dialog-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button id="CustomDialogBox.Confirm_Button" onClick={() => {handleConfirmation()}} 
              variant='contained' autoFocus color={confirmColor}>              
              <Trans  i18nKey="MainPage.Confirm" ns="mainPage"></Trans>
            </Button>
            <Button id="CustomDialogBox.Cancel_Button" onClick={()=>{handleCancellation(false)}}>
              <Trans  i18nKey="MainPage.Cancel" ns="mainPage"></Trans>
            </Button>
        </DialogActions>
    </Dialog>
  )
}
