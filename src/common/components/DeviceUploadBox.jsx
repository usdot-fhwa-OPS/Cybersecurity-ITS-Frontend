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

import React, { useState, useCallback }  from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import "react-dropzone/examples/theme.css";
import { TextField, Button } from "@mui/material";

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const deviceList = [{ "DeviceType": "Phone", "DeviceBrand": "Apple", "DeviceModel": "iPhone 6" }, { "DeviceType": "Phone", "DeviceBrand": "Apple", "DeviceModel": "iPhone 7" }, { "DeviceType": "Phone", "DeviceBrand": "Apple", "DeviceModel": "iPhone 8" }]

function UploadDeviceDialog({openDeviceUploadDialog, setDeviceUploadDialog, showAlertMessage, sendUploadCommand }) {
    const [files, setFiles] = useState("");
   
    const reader = new FileReader();

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            reader.readAsText(file);
            reader.onload = e => {
                setFiles(e.target.result);
              };
    })
    }, [])

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
      } = useDropzone({    
        maxFiles:1,
        accept: {'application/json': ['.json']},
        onDrop
      });

    const handleDeviceUploadButton = () => {
        if (!files) {
            return;
        }
        else {
            const jsonData = JSON.parse(files)
            const devices = jsonData.devicelist;

            var errorCount = 0;
            var userValueArray = Object.entries(devices);
            var userValueError = Array(devices.length).fill(false);
            {userValueArray.forEach((val, index) => {
                if(val[1] === "") {
                    userValueError[index] = true;
                    errorCount += 1;
                }
            })}

            if (errorCount) {
                showAlertMessage("error", "Please fill in missing values above in the JSON file.")
            }
            else {
                let formattedList = createDeviceList(devices);
                sendUploadCommand(formattedList);
                setFiles("");
                setDeviceUploadDialog(false);
            }
        }

    };
      
    const handleCancelButton = () => {
        setDeviceUploadDialog(false);
        setFiles(""); 
    }

    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));

    const fileRejectionItems = fileRejections.map(({ file, errors  }) => { 
        return (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map(e => <li key={e.code}>{e.message}</li>)}
            </ul>
        </li>
        ) 
    });

    const createDeviceList = (devicelist) => {
        return {
            "devicelist": devicelist
        }
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth = {'md'}
            open={openDeviceUploadDialog}
            onclose={handleCancelButton}
        >
            <DialogTitle>Upload Device Configuration File</DialogTitle>
                <DialogContent>
                <DialogContentText>
                Please ensure that your device security configuration file is of JSON format.
                </DialogContentText>   
                <Dropzone>
                    {() => (
                        <section>
                        <div style = {{backgroundColor: '#fafafa', padding: 20, textAlign: 'center', border: '2px dashed #eeeeee', marginBottom: 20}} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <aside>
                            <h4>Accepted files</h4>
                            <ul>{acceptedFileItems}</ul>
                            <h4>Rejected files</h4>
                            <ul>{fileRejectionItems}</ul>
                        </aside>
                        </section>
                    )}
                </Dropzone>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeviceUploadButton}>Upload File</Button>
                <Button onClick={handleCancelButton}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export {UploadDeviceDialog};