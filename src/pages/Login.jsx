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

import { useState, useEffect } from "react";
import { Trans } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  InputLabel,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  Alert,
  Grid,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { fetchUser } from "../features/authentication/userSlice";
import { updateLanguage } from "../features/configuration/configurationSlice";
import i18n from "../common/localization/i18n";
import { languages } from "../common/refDataStatic/languages";
import NotificationModel from "../common/components/NotificationModel";
import logo from '../common/assets/logo.png';


function Login() {
  const user = useSelector((state) => state.user);
  const savedLanguage = useSelector((state) => state.configuration.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reload, setReload] = useState(true);
  const [isUserNameError, setUserNameError] = useState(false);
  const [userName, setUserName] = useState("user3");
  const [isPasswordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState("passWORD1!");
  const [isShowAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [languageValue, setLanguageValue] = useState(
    savedLanguage != null ? savedLanguage : "en-US"
  );

  const showAlertMessage = (severityLevel, message) => {
    setShowAlert(true);
    setSeverity(severityLevel);
    setAlertMessage(message);
  };
  const validateEmpty = (value, validationFunction) => {
    let retVal = value.trim() === "";
    validationFunction(retVal);
    return retVal;
  };

  const handleLanguageChange = (event) => {
    setLanguageValue(event.target.value);
    dispatch(updateLanguage(event.target.value));
    i18n.changeLanguage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let error = false;
    error = validateEmpty(userName, setUserNameError);
    error |= validateEmpty(password, setPasswordError);

    if (error) {
      showAlertMessage("error", "Please check validation errors");
      return;
    } else {
      setShowAlert(false);
      dispatch(fetchUser({ userName, password }));
    }
  };
  useEffect(() => {
    i18n.changeLanguage(languageValue);
    setLanguageValue(languageValue);
    setReload(!reload);
  }, []);

  useEffect(() => {
    {!user.loading && user.error === "" && user.user != null && (
      navigate("/MainPage")
    )}
  }, [user.loading])

  return (
    <div>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}>
        <Box
          sx={{ p: 2, border: "1px solid purple", width: "100%", maxWidth: 500}}
          component="form"
          noValidate
          className="card-shadow"
          onSubmit={handleSubmit}
        >
          {isShowAlert && (
            <NotificationModel
              notificationType={severity}
              message={alertMessage}
              setShowAlert={setShowAlert}
            />
          )}
          {!user.loading && user.error !== "" && (
            <Alert severity={"error"}>{user.error}</Alert>
          )}

          <Grid container spacing = {2}>
            <Grid item xs={4}>
              <Box height={35}>
                <img src={logo} height={42} alt="Logo"/>
              </Box>
            </Grid>
            <Grid item xs = {8}>
              <Typography variant="h5" paddingTop={1}>
                <Trans i18nKey="login.title" ns="loginPage"></Trans>
              </Typography>
            </Grid>
          </Grid>
          <InputLabel
            id="language-select-label"
            variant="outlined"
            htmlFor="uncontrolled-native"
            sx={{ fontSize: "12px", padding: "0.5rem 0" }}
          >
            Language / Langue / 语言
          </InputLabel>

          <Select
            fullWidth
            sx={{ mt: 1.5 }}
            id="language-select"
            defaultValue="en-US"
            labelId="language-select-label"
            value={languageValue != null ? languageValue : "en-US"}
            onChange={handleLanguageChange}
          >
            {languages.map((language) => (
              <MenuItem key={language.key} value={language.key}>
                {language.value}
              </MenuItem>
            ))}
          </Select>

          <TextField
            error={isUserNameError}
            id="userName"
            name="userName"
            fullWidth
            sx={{ mt: 1.5 }}
            label={i18n.t("login.username", { ns: "loginPage" })}
            value={userName}
            required={true}
            onChange={(event) => setUserName(event.target.value)}
          />
          <TextField
            error={isPasswordError}
            id="password"
            name="password"
            fullWidth
            sx={{ mt: 1.5 }}
            label={i18n.t("login.password", { ns: "loginPage" })}
            type="password"
            value={password}
            required={true}
            onChange={(event) => setPassword(event.target.value)}
          />
          <LoadingButton
            type="submit"
            loading={user.loading}
            sx={{ mt: 1.5 }}
            variant="contained"
          >
            <Trans i18nKey="login.signIn" ns="loginPage"></Trans>
          </LoadingButton>
        </Box>
      </Grid>
    </div>
  );
}

export default Login;
