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
