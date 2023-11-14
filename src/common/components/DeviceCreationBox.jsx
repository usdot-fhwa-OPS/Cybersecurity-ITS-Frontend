import { useState } from 'react';
import { TextField, Button } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const deviceAttributesFull = ["Device Type", "Device Brand", "Device Model"]
const deviceAttributesDB = ["DeviceType", "DeviceBrand", "DeviceModel"]
const deviceAttributesChange = ["Email"]

function CreateDeviceDialog({openDeviceCreateDialog, setDeviceCreateDialog, showAlertMessage, sendCreateCommand}) {

    const [deviceValues, setDeviceValues] = useState(Array(deviceAttributesFull.length).fill(""));
    const [userDeviceErrorState, setDeviceErrorState] = useState(Array(deviceAttributesFull.length).fill(false));

    const handleDeviceCreateButton = () => {
        var errorCount = 0;

        var userValueArray = Object.entries(deviceValues);
        var userValueError = Array(deviceAttributesFull.length).fill(false);

        {userValueArray.forEach((val, index) => {
            if(val[1] === ""){
                userValueError[index] = true;
                errorCount += 1;
            }
        })}

        createAttributeList();

        setDeviceErrorState(userValueError);
        if (errorCount) {
            showAlertMessage("error", "Please fill in missing values above.")
        } 
        else {
            let formattedAttr = createAttributeList();
            sendCreateCommand(formattedAttr);
            setDeviceValues(Array(deviceAttributesFull.length).fill(""));
            setDeviceCreateDialog(false);
        }
    };

    const createAttributeList = () => {
        return {
            "devicelist": [
                {
                "DeviceType": deviceValues[0],
                "DeviceBrand": deviceValues[1],
                "DeviceModel": deviceValues[2]
                }
            ]
        }
    }

    const handleCancelButton = () => {
        setDeviceErrorState(Array(deviceAttributesFull.length).fill(false));
        setDeviceValues(Array(deviceAttributesFull.length).fill(""))
        setDeviceCreateDialog(false);
    };

    return (
    
    <Dialog 
        fullWidth={true}
        maxWidth = {'md'}
        open={openDeviceCreateDialog} 
        onClose={handleCancelButton}
        >
        <DialogTitle>Create Device Entry</DialogTitle>
        <DialogContent>
            <DialogContentText>
            To add a device, please fill out the fields below.
            </DialogContentText>
                <Grid 
                    alignContent="center"
                    alignItems="center" 
                    display={"flex"}
                    direction={"row"}
                    justifyContent="space-around"
                    xs={10}>
                    {deviceAttributesFull.map((user, index) => (
                        <TextField
                            margin="dense"
                            required
                            fullWidth
                            error={userDeviceErrorState[index]}
                            defaultValue={deviceValues[index][1]}
                            onChange={(event) => {deviceValues[index] = event.target.value}}
                            id={user}
                            label={user}
                            xs={2}
                            key={user + "." + index}
                        />
                    ))}
                </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleDeviceCreateButton}>Create Device</Button>
            <Button onClick={handleCancelButton}>Cancel</Button>
        </DialogActions>
    </Dialog>
    )
}

function UpdateUserAtributesDialog({openUserAttributeUpdateDialog, setUserAttributeUpdateDialog, showAlertMessage, sendUpdateCommand}) {

    const [userAttributeValues, setuserAttributeValues] = useState(Array(deviceAttributesChange.length).fill(""));
    const [userAttributeErrorState, setUserAttributeErrorState] = useState(Array(deviceAttributesChange.length).fill(false));

    const handleUserAtributesButton = () => {
        var errorCount = 0;

        var userValueArray = Object.entries(userAttributeValues);
        var userValueError = Array(deviceAttributesChange.length).fill(false);

        var returnArray = [];

        {userValueArray.forEach((val, index) => {
            if(val[1] === ""){
                userValueError[index] = true;
                errorCount += 1;
            }
        })}

        //setUserAttributeErrorState(userValueError);
        if (errorCount === deviceAttributesChange.length) {
            showAlertMessage("warning", "No Attributes Have Been Updated.")
        } 
        else {
            userAttributeValues.forEach((attribute, index) => {
                if (attribute !== "") {
                    returnArray.push({
                        Name: deviceAttributesChange[index].toLowerCase(),
                        Value: attribute
                    })
                }
                return
            })

            sendUpdateCommand(returnArray);
            setuserAttributeValues(Array(deviceAttributesChange.length).fill(""));
            setUserAttributeUpdateDialog(false);
        }
    };

    const handleCancelButton = () => {
        setUserAttributeErrorState(Array(deviceAttributesChange.length).fill(false));
        
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
                    {deviceAttributesChange.map((user, index) => (
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

export {CreateDeviceDialog};