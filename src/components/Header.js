import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { Select, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Header({currency, setCurrency}) {
    const navigate = useNavigate();
    const darkTheme = createTheme({
        palette: {
            primary: {
            main: "#fff",
            },
            type: "dark",
        },
});
  return (
    <ThemeProvider theme={darkTheme}>
        <div className='header'>
            <div  onClick={()=> navigate('/')}>
                <h2 className='header-title'>Crypto</h2>
            </div>
            <div className='header-menu'>
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{ width: 100, height: 40, marginLeft: 15, color: '#fff', border: '1px solid #fff' }}
              
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            </div>
        </div>
  </ThemeProvider>
  )
}


export default Header;

