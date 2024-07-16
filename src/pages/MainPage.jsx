/* Copyright (C) 2024 LEIDOS.
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

import { useEffect, useState } from 'react';
import {Box, Alert, Snackbar, Button, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Unstable_Grid2';

import NavigationBar from '../common/components/NavigationBar';
import { CreateUserDialog, UpdateUserAtributesDialog } from '../common/components/UserModificationBoxes';
import { UpdateUserPermissionsDialog } from '../common/components/UserPermissionBoxes';
import { AppTheme } from '../theme/AppTheme'
import { UserApi } from '../api/UserApi';
import CustomNoRowsOverlay from '../common/components/EmptyTableEmblem';

function MainPage() {

    const [isShowAlert, setShowAlert] = useState(false);
    const [severity, setSeverity] = useState("success");
    const [alertMessage, setAlertMessage] = useState("Testing");

    const [userList, setUserList] = useState([]);

    const [openUserCreateDialog, setUserCreateDialog] = useState(false);
    const [openUserUpdateDialog, setUserAttributeUpdateDialog] = useState(false);
    const [openUserPermissionsDialog, setUserPermissionsUpdateDialog] = useState(false);

    const [userSelectionList, setUserDeletionList] = useState([]);
    const [userCheckList, setUserCheckList] = useState([]);

    const [responseStatusCheck, setHandleStatusCheck] = useState(null);
    const [userPermissionsTarget, setUserPermissionsTarget] = useState("");

    const userButtons = ["Test", "Get User List", "Create User", 
    "Modify User Attributes", "Set Usergroup", "Enable User", "Delete User"]

    useEffect(() => {
        if (responseStatusCheck != null){

            console.log("useEffect: ")
            console.log(responseStatusCheck)

            let updatedResponse = responseStatusCheck.body ? responseStatusCheck.body : responseStatusCheck;

            checkStatusCode(updatedResponse, showAlertMessage);
            setHandleStatusCheck(null);
        }
    }, [responseStatusCheck])

    const showAlertMessage = (m_severity, message) =>{

        console.log("Alert: ", message)
        setShowAlert(true);
        setSeverity(m_severity);
        setAlertMessage(message);
        
    }

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setShowAlert(false);
    };

    const checkStatusCode = (responseRaw, showAlertMessage) => {
        console.log("checkStatusCode: response")

        let response = ""

        if (typeof responseRaw === 'string'){
            console.log("Converting String to Dict.")
            try {
                response = JSON.parse(responseRaw);
            }
            catch {
                response = responseRaw
            }

        }
        else {
            response = responseRaw
        }

        var code = response["ResponseMetadata"]
                ? response["ResponseMetadata"]["HTTPStatusCode"] : 0;

        if (code === 0){
            console.log("Error Message: ", response )
            showAlertMessage("warning", `Error: ${response}`)
        }
        else {
            console.log("Sucess: ", code )
            showAlertMessage("success", `Success ${code}`)

            refreshUserList(false);

            return true;
        }

        return false;
    }

    const resetChecklist = () => {

        setUserDeletionList([])
        setUserCheckList([])
    }

    const handleButtonClick = (buttonName) => {
        switch(buttonName) {
            case "Test":
                console.log(userCheckList)
                console.log(userSelectionList)

                return
            case "Get User List":
                refreshUserList();
                return
            case "Create User":
                handleCreateUserButton();
                return
            case "Modify User Attributes":
                handleUpdateUserButton();
                return
            case "Set Usergroup":
                handleUserAdminButton();
                return
            case "Enable User":
                handleEnableUserButton();
                return
            case "Delete User":
                handleDeleteUserButton();
                return
            default:
                return;
        }
    }

    const refreshUserList =  async (selfCall = true) => {

        setTimeout(() => {
            UserApi.getUserList().then((response) => {
                if (selfCall) {
                    
                    let res = checkStatusCode(response, showAlertMessage) 
                    if (!res) {
                        return;
                    }
                }
        
                var userList = response.Users.map((data, index) => {
                    return { ...data, id: index};
                })

                resetChecklist();
                setUserList(userList);
            })
        }, 500)
        return;
    }

    const updateAdmin = async () => {
        try {
            return await userSelectionList.map( async (user) => {
                let attribute = [...user.Attributes].filter((attribute) => {
                    if( attribute.Name === "custom:usergroup") {
                        return attribute
                    }
                })
                attribute = attribute[0]

                let setVal = (attribute.Value === "Users") ? true : false;

                return UserApi.setAdmin(user.Username, setVal)
                .then ((response) => {
                    setHandleStatusCheck(response);
                });
            })
        }
        catch {
            console.log(console.error)
        }
    }

    const handleUserAdminButton = async () => {

        if (!userSelectionList.length) {
            showAlertMessage("info", "No Users Have Been Marked To Update.")
            return;
        }

        updateAdmin().then(() => {refreshUserList(false);})
    }

    const handleEnableUserButton = async () => {

        console.log("Enable List: ", userSelectionList);

        if (!userSelectionList.length) {
            showAlertMessage("info", "No Users Have Been Marked For (En/Dis)able.")
            return;
        }

        try {
            await Promise.all( 
                userSelectionList.map( async (user) => {
                    user.Enabled = !user.Enabled;
                    UserApi.enableUser(user.Username, user.Enabled)
                    .then ((response) => {
                        setHandleStatusCheck(response);
                    })
                })
            )
        }
        catch {
            console.log(console.error)
        }
    }

    const handleDeleteUserButton = async () => {

        if (!userSelectionList.length) {
            showAlertMessage("info", "No Users Have Been Marked For Deletion.")
            return;
        }

        try {
            await Promise.all( 
                userSelectionList.map( async (user) => {
                    UserApi.deleteUser(user.Username)
                    .then ((response) => {
                        setHandleStatusCheck(response);
                    })
                })
            )
        }
        catch {
            console.log(console.error)
        }
    }

    const handleUpdateUserButton = async () => {
        setUserAttributeUpdateDialog(true);
    }

    const sendUpdateCommand = async (attributes) => {

        if (!userSelectionList.length) {
            showAlertMessage("info", "No Users Have Been Marked For Modification.")
            return;
        }

        try {
            await Promise.all( 
                userSelectionList.map( async (user) => {
                    UserApi.modifyAttributes(user.Username, attributes)
                    .then ((response) => {
                        setHandleStatusCheck(response);
                    })
                })
            )
            
            refreshUserList(false);
        }
        catch {
            console.log(console.error)
        }
    }

    const handleCreateUserButton = async () => {
        setUserCreateDialog(true);
    }

    const handleUserNameButton = (buttonName) => {
        setUserPermissionsTarget(buttonName)
        setUserPermissionsUpdateDialog(true);
    }

    const sendCreateCommand = async (userToCreate) => {
        if (!userToCreate) {
            return;
        }

        try {
            let response = await UserApi.createUser(
                    userToCreate[0].Value,
                    userToCreate[1].Value,
                    userToCreate.slice(2)
                )
            
            console.log("response: ")
            console.log(response)

            if (checkStatusCode(response, showAlertMessage)){
                await refreshUserList(false)
            }
        }
        catch {
            console.log(console.error)
        }

    };

    const columnAttributes = [
        { field: 'Username', headerName: 'Username', flex: 0.6,
            renderCell: (params) => {
                return <Button 
                    onClick={(event) => {
                        event.stopPropagation();
                        handleUserNameButton(params["row"]["Username"]); 
                    }}
                    variant="contained" sx={{width: "100%"}}>
                    {params["row"]["Username"]}
                </Button>
            }
        },
        { field: 'email', headerName: 'Email', flex: 1, 
            valueGetter: (params) => {
                let val = "";
                params["row"]["Attributes"].forEach((value) => {
                    if(value.Name === "email") {
                        val = value.Value;
                    }
                })
                return val ? val : "Null"
            }
        },
        { field: 'User Group', headerName: 'User Group', flex: 1, 
            valueGetter: (params) => {
                let val = "";
                params["row"]["Attributes"].forEach((value) => {
                    if(value.Name === "custom:usergroup") {
                        val = value.Value;
                    }
                })
                return val ? val : "Null"
            }
        },
        { field: 'UserLastModifiedDate', headerName: 'Last Modification Date', flex: 1, 
            valueGetter: (params) => 
                `${new Date(params.row.UserLastModifiedDate).toLocaleTimeString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}`
        },
        { field: 'Enabled', headerName: 'Enabled', flex: 0.5  },
        { field: 'UserStatus', headerName: 'UserStatus', flex: 0.7  },
    ];

    return (
        <Box sx={{background:'lightGray'}} minHeight={"100vh"} height={"fill"}>
            <NavigationBar
                showAlertMessage={showAlertMessage}/>
            
            <Snackbar anchorOrigin={{vertical: "bottom", horizontal:"center"}} 
                open={isShowAlert}
                autoHideDuration={5000} onClose={handleAlertClose}>
                <Alert severity={severity}>{alertMessage}</Alert>
            </Snackbar>

            <Grid
                container
                id="1"
                spacing={1.5}
                direction="row"
                alignItems="center"
                justifyContent="center"
                display={"flex"}
                maxWidth={"100%"}
                paddingTop={6}
                padding={2}>
                <Grid item justifyContent={"center"} alignItems="center" sm={2.5} >
                    <Stack height={"100%"}>
                        {userButtons.map((buttonName) => (
                            <Button
                                onClick={() => {
                                    handleButtonClick(buttonName);
                                }}
                                variant="contained"
                                sx={{mt: 1}}>
                                {buttonName}
                            </Button>
                        ))}
                    </Stack>
                </Grid>
                <Grid item justifyContent={"center"} alignItems="center" sm={9}>
                    <Box sx={{ p: 2, border: "1px solid purple", maxWidth: "100%", backgroundColor: AppTheme.secondary}}>
                        <DataGrid
                            width="1000"
                            autoHeight
                            rows={userList}
                            columns={columnAttributes}
                            getRowHeight={() => 'auto'}
                            rowSpacingType="border"
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            slots={{ noRowsOverlay: CustomNoRowsOverlay }}
                            sx={{ '--DataGrid-overlayHeight': '300px', '& .MuiDataGrid-row': { borderTopColor: 'darkgrey', borderTopStyle: 'solid' } }}
                            checkboxSelection
                            onRowSelectionModelChange={(ids) => {
                                setUserDeletionList(ids.map((id) => userList.find((row) => row.id === id)));
                                setUserCheckList(ids)
                            }}
                            rowSelectionModel={userCheckList}
                        />
                    </Box>
                </Grid>
                <CreateUserDialog sx={{ width: "100%", maxWidth: 1000, height: "20px" }}
                    openUserCreateDialog={openUserCreateDialog}
                    setUserCreateDialog={setUserCreateDialog}
                    showAlertMessage={showAlertMessage}
                    sendCreateCommand={sendCreateCommand}
                >
                </CreateUserDialog>
                <UpdateUserAtributesDialog sx={{ width: "100%", maxWidth: 1000, height: "20px" }}
                    openUserAttributeUpdateDialog={openUserUpdateDialog}
                    setUserAttributeUpdateDialog={setUserAttributeUpdateDialog}
                    showAlertMessage={showAlertMessage}
                    sendUpdateCommand={sendUpdateCommand}
                >
                </UpdateUserAtributesDialog>
                <UpdateUserPermissionsDialog sx={{ width: "100%", maxWidth: 1000, height: "20px" }}
                    openUserPermissionsDialog={openUserPermissionsDialog}
                    setUserPermissionsUpdateDialog={setUserPermissionsUpdateDialog}
                    showAlertMessage={showAlertMessage}
                    setHandleStatusCheck={setHandleStatusCheck}
                    userName={userPermissionsTarget}
                >
                </UpdateUserPermissionsDialog>
            </Grid>
        </Box>
    );
}


export default MainPage;