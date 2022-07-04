import { Snackbar, Alert } from '@mui/material'
import React from 'react'

function AlertData({alert, setAlert}) {


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({ open: false })
  };
  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose} >
        <Alert
            onClose={handleClose}
            elevation={10}
            severity={alert.type}
            variant="filled"
        >
            {alert.message}
        </Alert>
    </Snackbar>
  )
}

export default AlertData