import { useState } from 'react';
import { TextField, Button } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const userAttributesFull = ["Username", "Password", "Email"]
const userAttributesChange = ["Email"]

function CreateUserDialog({openUserCreateDialog, setUserCreateDialog, showAlertMessage, sendCreateCommand}) {

    const [userAttributeValues, setuserAttributeValues] = useState(Array(userAttributesFull.length).fill(""));
    const [userAttributeErrorState, setUserAttributeErrorState] = useState(Array(userAttributesFull.length).fill(false));

    const handleUserCreateButton = () => {
        var errorCount = 0;

        var userValueArray = Object.entries(userAttributeValues);
        var userValueError = Array(userAttributesFull.length).fill(false);

        {userValueArray.forEach((val, index) => {
            if(val[1] === ""){
                userValueError[index] = true;
                errorCount += 1;
            }
        })}

        createAttributeList();

        setUserAttributeErrorState(userValueError);
        if (errorCount) {
            showAlertMessage("error", "Please fill in missing values above.")
        } 
        else {
            let formattedAttr = createAttributeList();

            sendCreateCommand(formattedAttr);
            setuserAttributeValues(Array(userAttributesFull.length).fill(""));
            setUserCreateDialog(false);
        }
    };

    const createAttributeList = () => {
        let response = userAttributeValues.map((value, index) => {
            return {
              "Name": userAttributesFull[index].toLowerCase(),
              "Value": value
            }
        });

        return response;
    }

    const handleCancelButton = () => {
        setUserAttributeErrorState(Array(userAttributesFull.length).fill(false));
        setuserAttributeValues(Array(userAttributesFull.length).fill(""));
        setUserCreateDialog(false);
    };

    return (
    
    <Dialog 
        fullWidth={true}
        maxWidth = {'md'}
        open={openUserCreateDialog} 
        onClose={handleCancelButton}
        >
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
            <DialogContentText>
            To create a ITS Technician Profile, Please fill out the required fields below.
            </DialogContentText>
                <Grid 
                    alignContent="center"
                    alignItems="center" 
                    display={"flex"}
                    direction={"row"}
                    justifyContent="space-around"
                    xs={10}>
                    {userAttributesFull.map((user, index) => (
                        <TextField
                            margin="dense"
                            required
                            fullWidth
                            error={userAttributeErrorState[index]}
                            defaultValue={userAttributeValues[index][1]}
                            onChange={(event) => {userAttributeValues[index] = event.target.value}}
                            id={user}
                            label={user}
                            xs={2}
                            key={user + "." + index}
                        />
                    ))}
                </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleUserCreateButton}>Create User</Button>
            <Button onClick={handleCancelButton}>Cancel</Button>
        </DialogActions>
    </Dialog>
    )
}

function UpdateUserAtributesDialog({openUserAttributeUpdateDialog, setUserAttributeUpdateDialog, showAlertMessage, sendUpdateCommand}) {

    const [userAttributeValues, setuserAttributeValues] = useState(Array(userAttributesChange.length).fill(""));
    const [userAttributeErrorState, setUserAttributeErrorState] = useState(Array(userAttributesChange.length).fill(false));

    const handleUserAtributesButton = () => {
        var errorCount = 0;

        var userValueArray = Object.entries(userAttributeValues);
        var userValueError = Array(userAttributesChange.length).fill(false);

        var returnArray = [];

        {userValueArray.forEach((val, index) => {
            if(val[1] === ""){
                userValueError[index] = true;
                errorCount += 1;
            }
        })}

        //setUserAttributeErrorState(userValueError);
        if (errorCount === userAttributesChange.length) {
            showAlertMessage("warning", "No Attributes Have Been Updated.")
        } 
        else {
            userAttributeValues.forEach((attribute, index) => {
                if (attribute !== "") {
                    returnArray.push({
                        Name: userAttributesChange[index].toLowerCase(),
                        Value: attribute
                    })
                }
                return
            })

            sendUpdateCommand(returnArray);
            setuserAttributeValues(Array(userAttributesChange.length).fill(""));
            setUserAttributeUpdateDialog(false);
        }
    };

    const handleCancelButton = () => {
        setUserAttributeErrorState(Array(userAttributesChange.length).fill(false));
        
        setUserAttributeUpdateDialog(false);
    };

    return (
    
    <Dialog 
        fullWidth={true}
        maxWidth = {'md'}
        open={openUserAttributeUpdateDialog} 
        onClose={handleCancelButton}
        >
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
            <DialogContentText>
            To Update a ITS Technician Profile, Please fill out the required fields below.
            </DialogContentText>
                <Grid 
                    alignContent="center"
                    alignItems="center" 
                    display={"flex"}
                    direction={"row"}
                    justifyContent="space-around"
                    xs={10}>
                    {userAttributesChange.map((user, index) => (
                        <TextField
                            margin="dense"
                            required
                            fullWidth
                            error={userAttributeErrorState[index]}
                            defaultValue={userAttributeValues[index][1]}
                            onChange={(event) => {userAttributeValues[index] = event.target.value}}
                            id={user}
                            label={user}
                            xs={2}
                            key={user + "." + index}
                        />
                    ))}
                </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleUserAtributesButton}>Update User Attributes</Button>
            <Button onClick={handleCancelButton}>Cancel</Button>
        </DialogActions>
    </Dialog>
    )
}

export {CreateUserDialog, UpdateUserAtributesDialog};