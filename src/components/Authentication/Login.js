import React, {useState} from 'react';
import { auth } from '../firebase/firebase';
import './Login.css';

function Login({setAlert, handleClose}) {
  const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async() =>{
        if(!userData.email || !userData.password){
          setAlert({
            open: true,
            message: 'Please fill all the fields',
            type: "error"
          })
          return;
        }
        
        try {
          
          const result = await auth.signInWithEmailAndPassword(userData.email, userData.password)

          setAlert({
                open: true,
                message: `Login In Successful. Welcome ${result.user.email}`
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
    <div className='login'>
        <input type="email" placeholder='Email' value={userData.email} onChange={(e)=>setUserData({...userData, email: e.target.value})} />
        <input type="password" placeholder='Password' value={userData.password} onChange={(e)=>setUserData({...userData, password: e.target.value})} />
        <button className='login-btn' onClick={handleSubmit}>Login</button>
    </div>
  )
}

export default Login