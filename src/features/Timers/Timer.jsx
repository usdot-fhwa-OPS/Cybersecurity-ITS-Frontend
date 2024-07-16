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

import React from 'react';
import { Box } from '@mui/system';

import i18n from "../../common/localization/i18n";

export default function Timer(props) {
    const timerStyle = {
      color:'white',
      textAlign: 'center',
      fontSize: '18px'
    }
    
    const timerStyleDetail = {
      fontSize: '28px'
    }

    return (
        

      <Box style={timerStyle}>
        {props.isCountUpTimer && props.countUpTime >= 0 ? (
            <Box>
              <span>
                  {i18n.t('MainPage.ElapsedTime', { ns: "mainPage" })}
                </span>
                <Box style={timerStyleDetail}>
                  {("0" + Math.floor((props.countUpTime / 60000) % 60)).slice(-2)}:
                  {("0" + Math.floor((props.countUpTime / 1000) % 60)).slice(-2)}
                </Box>
            </Box>
        ):(
          <Box>
            <span>
              {i18n.t('MainPage.RemainingTime', { ns: "mainPage" })}
            </span>
            <Box style={timerStyleDetail}>
              {("0" + Math.floor((props.countDownTime / 60000) % 60)).slice(-2)}:
              {("0" + Math.floor((props.countDownTime / 1000) % 60)).slice(-2)}
            </Box>
          </Box>

        ) }
        
      </Box>
    );
  }
