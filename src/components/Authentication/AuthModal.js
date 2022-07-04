import  React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import './AuthModal.css';
import { AppBar, Tab, Tabs } from '@mui/material';
import Login from './Login';
import Signup from './Signup';



export default function AuthModal({ setAlert}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) =>{
    setValue(newValue)
  }

  return (
    <div className='auth-modal'>
      <Button sx={style} variant='contained' onClick={handleOpen}>Login</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className='auth-box'>
            <AppBar position='static' sx={{backgroundColor: "transparent", color: "#fff"}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    style={{borderRadius: 10}}
                >
                    <Tab label="Login" sx={{color: "#fff"}}/>
                    <Tab label="Sign Up" sx={{color: "#fff"}} />
                </Tabs>
            </AppBar>
            {value === 0 ? <Login handleClose={handleClose} setAlert={setAlert}/> : <Signup handleClose={handleClose} setAlert={setAlert} /> }
          </div>
        </Fade>
      </Modal>
    </div>
  );
}


const style={
    width: 85,
    height: 40,
    fontWeight: 600,
    backgroundColor: "#2190FF",
    color: "#fff",
    "&:hover": {
        backgroundColor: "#fff",
        color: "#2190FF",
    }
}