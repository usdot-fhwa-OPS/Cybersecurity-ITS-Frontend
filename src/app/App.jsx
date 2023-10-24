import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import MainPage from '../pages/MainPage';
import DevicesPage from '../pages/DevicesPage';
import Login from '../pages/Login';
import { AppTheme } from '../theme/AppTheme';
import './App.css';

function App() {

  return (
    <>
    <ThemeProvider theme={AppTheme}>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/MainPage/" element={<MainPage/>} />
        <Route path="/DevicesPage/" element={<DevicesPage/>} />
      </Routes>
    </ThemeProvider>
    </>
  );
}

export default App;
