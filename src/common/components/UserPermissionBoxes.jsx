import { useState, useEffect } from 'react';
import { Autocomplete, Button, FormControl, InputLabel, ListSubheader, MenuItem, Select, Stack, TextField } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import { createFilterOptions } from '@mui/material/Autocomplete';

import { UserApi } from '../../api/UserApi';
import { PermissionsApi } from '../../api/PermissionsApi';
import { permissionsList } from '../utils/permissionsList';

const filter = createFilterOptions();

const userAttributesFull = ["Permission Type", "Permission Specifier"]

 
function UpdateUserPermissionsDialog({
    openUserPermissionsDialog,
    setUserPermissionsUpdateDialog,
    showAlertMessage,
    setHandleStatusCheck,
    userName
}){

    const [userPermissions, setUserPermissions] = useState([""]);
    const [userPermissionText, setUserPermissionText] = useState("");
    const [userPermissionsLoaded, setUserPermissionsLoaded] = useState(false);

    const [value, setValue] = useState(null);
    const [permissionDialogOpen, openAddPermissionDialog] = useState(false);
    
    const [permissionTypeError, setPermissionTypeError] = useState(false);
    const [permissionValueError, setPermissionValueError] = useState(false);
  
    const [dialogValue, setDialogValue] = useState({
      type: '',
      value: '',
    });
    
    useEffect(() => {
        if (openUserPermissionsDialog){

            handleGetUserPermissionsButton();
        }
        else {
            setUserPermissions([""]);
            setUserPermissionsLoaded(false);
        }
    }, [openUserPermissionsDialog])

    const handleCancelButton = () => {
        setUserPermissionsUpdateDialog(false);
    };

    const handleGetUserPermissionsButton = async () => {

        try {
            await Promise.all(
                UserApi.getUserPermissions(userName).then ((response) => {
                    
                    setHandleStatusCheck(response)
                    if ("Count" in response){
                        if (response["Count"] > 0) {
                            setUserPermissionText("User Permissions")
                            setUserPermissions(response["Items"][0]["permissions"]);
                        }
                        else {
                            setUserPermissionText("User Permission List is Empty.")
                            setUserPermissions([]);
                        }
                    }
                    else {
                        setUserPermissionText("Error Getting User Permissions.")
                        setUserPermissions([]);
                    }
                }).then(() => {
                    setUserPermissionsLoaded(true);
                })
            )
        }
        catch {
            console.log("Error Getting Permissions.")
        }
    };

    const addUserPermission = async () => {
        try {
            let permission = [...userPermissions, dialogValue.type + ":" + dialogValue.value];
            await Promise.all(
                PermissionsApi.addUserPermission(userName, permission).then ((response) => {
                    
                    setHandleStatusCheck(response);
                    handleGetUserPermissionsButton();
                }).then(() => {
                    setUserPermissionsLoaded(true);
                })
            )
        }
        catch {
            console.log("Error Getting Permissions.")
        }
    };

    const removeUserPermission = async (exPermission) => {
        try {
            let permissionList = userPermissions.filter((permission) => permission !== exPermission);
            await Promise.all(
                PermissionsApi.addUserPermission(userName, permissionList)
                .then ((response) => {
                    
                    setHandleStatusCheck(response);
                    handleGetUserPermissionsButton();
                }).then(() => {
                    setUserPermissionsLoaded(true);
                })
            )
        }
        catch {
            console.log("Error Getting Permissions.")
        }
    };
  
    const handleAddPermissionDialogClose = () => {
        setDialogValue({
            type: '',
            value: ''
        });
        setPermissionTypeError(false)
        setPermissionValueError(false)
        openAddPermissionDialog(false);
    };
  
    const handleAddPermissionDialogSubmit = (event) => {
        console.log("Submit Permissions")
        console.log(event)
        console.log(dialogValue)

        event.preventDefault();
        if ((dialogValue.type === "") || (dialogValue.value === "")) {
            setPermissionTypeError(false)
            setPermissionValueError(false)
            if (dialogValue.type === "") {
                setPermissionTypeError(true)
                showAlertMessage("info", "Please fill in both values.");
            }
            if (dialogValue.value === "") {
                setPermissionValueError(true)
                showAlertMessage("info", "Please fill in both values.");
            }
            return;
        }
        else {
            setPermissionTypeError(false)
            setPermissionValueError(false)
            setValue({
                type: dialogValue.type,
                value: dialogValue.value,
            });
            addUserPermission();
            handleAddPermissionDialogClose();
        }
    };
    
    const handleDeleteButton = (event, permission) => {
        console.log(event);
        console.log(permission);
        removeUserPermission(permission)
    }

    return (
    
    <Dialog 
        fullWidth={true}
        maxWidth = {'md'}
        open={openUserPermissionsDialog} 
        onClose={handleCancelButton}
        >
        <DialogTitle>Modify User Permissions</DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
            {userName}'s permissions are listed below. Add permissions through search bar.
            </DialogContentText>
            <Grid
                alignContent="center"
                alignItems="center" 
                display={"flex"}
                direction={"column"}
                justifyContent="space-around"
                height={400}
                xs={10}
                padding={1}
                >
                { (userPermissionsLoaded && (userPermissions.length > 0)) ?
                    <List
                        variant="filled" 
                        style={{
                            maxHeight: "100%",
                            width: 400,
                            overflow: 'auto'
                        }}
                        subheader={
                            <ListSubheader 
                                component="div"
                                sx={{pt: 1}}
                                id='nested-list-subheader'>
                                <Typography>
                                    Approved User Permissions
                                </Typography>
                            </ListSubheader>
                        }
                        dense>
                        { userPermissions.map((permission) => {
                            return (
                                <ListItem
                                    secondaryAction={
                                        <IconButton 
                                            onClick={(event) => handleDeleteButton(event, permission)}
                                            edge="end"
                                            aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                <ListItemText
                                    primary={permission}
                                />
                                </ListItem>
                            )
                            })
                        } 
                    </List>
                    :
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        {userPermissionText}
                    </Typography>
                }
                
                <Stack alignItems={"center"} xs={4}>
                    <Typography>
                        Search User Settings
                    </Typography>
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            if (typeof newValue === 'string') {
                                // timeout to avoid instant validation of the dialog's form.
                                setTimeout(() => {
                                    openAddPermissionDialog(true);
                                    setDialogValue({
                                        value: newValue,
                                        type: '',
                                    });
                                });
                            } 
                            else if (newValue && newValue.inputValue) {
                                openAddPermissionDialog(true);
                                setDialogValue({
                                    value: newValue.inputValue,
                                    type: '',
                                });
                            } else {
                                setValue(newValue);
                            }
                        }}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);

                            if (params.inputValue !== '') {
                                filtered.push({
                                    inputValue: params.inputValue,
                                    type: `Add "${params.inputValue}"`,
                                });
                            }

                            return filtered;
                        }}
                        id="free-solo-dialog-demo"
                        options={userPermissions.map((option) => option)}
                        getOptionLabel={(option) => {
                            // e.g. value selected with enter, right from the input
                            if (typeof option === 'string') {
                                return option;
                            }
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            return option.value;
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        renderOption={(props, option) => {
                            if (typeof option === 'string'){
                                option = {type: option}
                            }
                            return  <li {...props}>{option.type}</li>
                        }}
                        sx={{ width: 300 }}
                        freeSolo
                        renderInput={(params) => {
                            return <TextField
                                {...params}
                                label="Search input"
                                InputProps={{
                                ...params.InputProps,
                                type: 'search',
                                }}
                            />
                        }}
                    />
                </Stack>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleGetUserPermissionsButton}>Refresh User Permissions</Button>
            <Button onClick={handleCancelButton}>Cancel</Button>
        </DialogActions>
      
        <Dialog open={permissionDialogOpen} onClose={handleAddPermissionDialogClose}>
            <DialogTitle>Add new permission</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Add new permission below
                </DialogContentText>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="inputLabelPermissionType">Permission Type</InputLabel>
                        <Select
                            labelId="PermissionTypeLabel"
                            id="PermissionTypeDropDown"
                            value={dialogValue.type}
                            error={permissionTypeError}
                            onChange={(event) =>{
                                console.log("onChange: ")
                                console.log(dialogValue)
                                console.log(event)
                                setDialogValue({
                                    ...dialogValue,
                                    type: event.target.value,
                                })}
                            }
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"DeviceType"}>DeviceType</MenuItem>
                            <MenuItem value={"DeviceBrand"}>DeviceBrand</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    variant="filled"
                    margin="dense"
                    id="value"
                    error={permissionValueError}
                    value={dialogValue.value}
                    onChange={(event) =>
                        setDialogValue({
                            ...dialogValue,
                            value: event.target.value,
                        })
                    }
                    label="Permission Specifier"
                    type="text"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAddPermissionDialogClose}>Cancel</Button>
                <Button onClick={handleAddPermissionDialogSubmit}>Add</Button>
            </DialogActions>
        </Dialog>
    </Dialog>
    )
}

export {UpdateUserPermissionsDialog};