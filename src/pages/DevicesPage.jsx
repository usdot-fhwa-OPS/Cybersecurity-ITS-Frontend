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
import { CreateDeviceDialog } from '../common/components/DeviceCreationBox';
import { AppTheme } from '../theme/AppTheme'
import { UserApi } from '../api/UserApi';
import { DeviceApi } from '../api/DeviceApi';
import CustomNoRowsOverlay from '../common/components/EmptyTableEmblem';
import { UploadDeviceDialog } from '../common/components/DeviceUploadBox';

function DevicesPage() {

    const [isShowAlert, setShowAlert] = useState(false);
    const [severity, setSeverity] = useState("success");
    const [alertMessage, setAlertMessage] = useState("Testing");

    const [deviceList, setDeviceList] = useState([]);

    const [userSelectionList, setUserDeletionList] = useState([]);
    const [userCheckList, setUserCheckList] = useState([]);

    const [openDeviceCreateDialog, setDeviceCreateDialog] = useState(false);
    const [openDeviceUploadDialog, setDeviceUploadDialog] = useState(false);

    const [responseStatusCheck, setHandleStatusCheck] = useState(null);

    const userButtons = ["DEVICES PAGE", "Get Device List", "Create Device", "Delete Device", "Upload Device Config File"]

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

            refreshDeviceList(false);

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
            case "DEVICES PAGE":
                console.log(userCheckList)
                console.log(userSelectionList)

                return
            case "Get Device List":
                refreshDeviceList();
                return
            case "Create Device":
                handleCreateDeviceButton();
                return
            case "Delete Device":
                handleDeleteDeviceButton();
                return
            case "Upload Device Config File": 
                handleUploadDeviceButton();
            default:
                return;
        }
    }

    const refreshDeviceList =  async (selfCall = true) => {

        setTimeout(() => {
            DeviceApi.getAllDevices().then((response) => {
                if (selfCall) {
                    
                    let res = checkStatusCode(response, showAlertMessage) 
                    if (!res) {
                        return;
                    }
                }
                
                console.log("Response: ")
                console.log(response)

                var deviceList = response.Items.map((data, index) => {
                    return { ...data, id: index};
                })

                console.log("DeviceList: ")
                console.log(deviceList)

                resetChecklist();
                setDeviceList(deviceList);
            })
        }, 500)
        return;
    }

    const handleCreateDeviceButton = async () => {
        setDeviceCreateDialog(true);
    }

    const handleUploadDeviceButton = async () => {
        setDeviceUploadDialog(true);
    }

    const handleDeleteDeviceButton = async () => {

        if (!userSelectionList.length) {
            showAlertMessage("info", "No Users Have Been Marked For Deletion.")
            return;
        }

        let deletionList = userSelectionList.map((device) => {
            return {
                "DeviceBrand": device.DeviceBrand,
                "DeviceModel": device.DeviceModel
            }
        })
        console.log("deletionList: " + deletionList)

        try {
            await Promise.all(
                DeviceApi.deleteDevice(deletionList)
                .then ((response) => {
                    setHandleStatusCheck(response);
                })
            )
        }
        catch {
            console.log(console.error)
        }
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
            
            refreshDeviceList(false);
        }
        catch {
            console.log(console.error)
        }
    }

    const sendCreateCommand = async (deviceToCreate) => {
        if (!deviceToCreate) {
            return;
        }

        try {
            let response = await DeviceApi.putDevice(deviceToCreate)
            
            console.log("response: ")
            console.log(response)

            if (checkStatusCode(response, showAlertMessage)){
                await refreshDeviceList(false)
            }
        }
        catch {
            console.log(console.error)
        }

    };

    const sendUploadCommand = async (deviceListToUpload) => {
        if (!deviceListToUpload) {
            return;
        }
        console.log(deviceListToUpload)
        try {
            let response = await DeviceApi.putDevice(deviceListToUpload)

            console.log("response: ")
            console.log(response)

            if (checkStatusCode(response, showAlertMessage)) {
                await refreshDeviceList(false)
            }
        }
        catch {
            console.log("falling in catch")
        }
    }

    const columnAttributes = [
        { field: 'DeviceBrand', headerName: 'Device Brand', flex: 0.5  },
        { field: 'DeviceModel', headerName: 'Device Model', flex: 0.7  },
        { field: 'DeviceType', headerName: 'Device Type', flex: 0.7  },
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
                            rows={deviceList}
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
                                setUserDeletionList(ids.map((id) => deviceList.find((row) => row.id === id)));
                                setUserCheckList(ids)
                            }}
                            rowSelectionModel={userCheckList}
                        />
                    </Box>
                </Grid>
                <CreateDeviceDialog sx={{ width: "100%", maxWidth: 1000, height: "20px" }}
                    openDeviceCreateDialog={openDeviceCreateDialog}
                    setDeviceCreateDialog={setDeviceCreateDialog}
                    showAlertMessage={showAlertMessage}
                    sendCreateCommand={sendCreateCommand}
                >
                </CreateDeviceDialog>
                <UploadDeviceDialog sx={{ width: "100%", maxWidth: 1000, height: "20px" }}
                    openDeviceUploadDialog={openDeviceUploadDialog}
                    setDeviceUploadDialog={setDeviceUploadDialog}
                    showAlertMessage={showAlertMessage}
                    sendUploadCommand={sendUploadCommand}
                >
                </UploadDeviceDialog>
            </Grid>
        </Box>
    );
}


export default DevicesPage;