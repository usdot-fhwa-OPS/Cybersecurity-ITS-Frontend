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

import logo from '../assets/splash.png';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';


import {useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from "react-router-dom";
import {logout} from '../../features/authentication/userSlice';

import Menu from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Popover } from '@mui/material';

const pages = ['Users', 'Devices', 'Admin'];
const pageList = [
    {
        "name": "Users",
        "link": "/MainPage"
    },
    {
        "name": "Devices",
        "link": "/DevicesPage"
    },
    {
        "name": "Admin",
        "link": "/MainPage"
    },
]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavigationBar() {

    const user = useSelector((state)=>state.user.user.user_Info);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuItem = (setting) => {
        if (setting === "Logout"){
          logoutUser();
        }

        handleCloseSettingsMenu();
    }
  
    const handleClickSettingsMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleCloseSettingsMenu = (event) => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const logoutUser = () => {
        dispatch(logout());
        navigate ("/");
    };

    const navigateMainPage = () => {
        navigate("/MainPage/")
    }

    const handlePageButtonClick = (page) => {
        if (page === "Users") {
            console.log("Users")

            navigate("/MainPage/")
        }
        else if (page === "Devices") {
            console.log("Devices")

            navigate("/DevicesPage/")
        }
        else if (page === "Admin"){
            console.log("Admin")

        }
        else {
            console.log("No Page Found Error")
        }
    }

    return (
    <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Avatar  sx={{ height: '60px', width: '60px', display: { xs: 'none', md: 'flex' } }} src={logo} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    ITS Admin Panel
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <Menu
                        id="menu-appbar"
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                    {pageList.map((page,index) => (
                        <MenuItem key={page.name} >
                            <Typography 
                                textAlign="center"
                            >
                                {page.name}
                            </Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pageList.map((page,index) => (
                        <>
                        <Button
                            key={page.name}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Link id={page.name} to={page.link}>{page.name}</Link>
                        </Button>
                        </>
                    ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleClickSettingsMenu} sx={{ p: 0 }}>
                            <Avatar sx={{ height: '60px', width: '60px' }}alt="Remy Sharp" src={logo} />
                        </IconButton>
                    </Tooltip>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleCloseSettingsMenu}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}>
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={() => {handleMenuItem(setting)}}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Popover>
                </Box>

            </Toolbar>
        </Container>
    </AppBar>
    );
}

export default NavigationBar;