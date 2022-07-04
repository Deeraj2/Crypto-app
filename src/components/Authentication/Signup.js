import React, { useState } from 'react';
import './Signup.css';
import { auth } from '../firebase/firebase'

function Signup({setAlert, handleClose}) {

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleSubmit = async() =>{
        if(userData.password !== userData.confirmPassword){
            setAlert({
                open: true,
                message: 'Password Do Not Match',
                type: 'error'
            });
            return
        }
        try {
            const result = await auth.createUserWithEmailAndPassword(userData.email, userData.password)
            
            console.log(result)

            setAlert({
                open: true,
                message: `Sign Up Successful. Welcome ${result.user.email}`
            });

            handleClose();

        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
            return
        };
    }

  return (
    <div className='signup'>
        <input type="email" placeholder='Email' value={userData.email} onChange={(e)=>setUserData({...userData, email: e.target.value})} />
        <input type="password" placeholder='Password' value={userData.password} onChange={(e)=>setUserData({...userData, password: e.target.value})} />
        <input type="password" placeholder='Confirm Password' value={userData.confirmPassword} onChange={(e)=>setUserData({...userData, confirmPassword: e.target.value})} />
        <button className='signup-btn' onClick={handleSubmit}>Sign Up</button>
    </div>
  )
}

export default Signup