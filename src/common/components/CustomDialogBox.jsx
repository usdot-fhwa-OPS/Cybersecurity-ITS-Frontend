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
