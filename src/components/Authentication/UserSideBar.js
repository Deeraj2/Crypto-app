import  React from 'react';
import Drawer from '@mui/material/Drawer';
import { Avatar } from '@mui/material';
import './UserSideBar.css';
import firebase from 'firebase/compat/app';


export default function UserSideBar({user, setAlert}) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    firebase.auth().signOut().then(() => {
        setAlert({
            open: true,
            type: "success",
            message: "Logout Successfull"
        })
    }).catch((error)=>{
        setAlert({
            open: true,
            type: "error",
            message: error.message
        })
    })
    
    toggleDrawer();
  }

  return (
    <div className='side-bar'>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar 
            onClick={toggleDrawer(anchor, true)}
            className="sidebar-avatar"
            sx={styles.avatar}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className='sidebar-container'>
                <div className='sidebar-profile'>
                    <Avatar 
                        onClick={toggleDrawer(anchor, true)}
                        className="container-avatar"
                        sx={styles.profile}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <span className='sidebar-name'>{user.displayName || user.email}</span>
                    <div className='sidebar-watchlist'></div>
                </div>
                <button className='sidebar-btn' onClick={logOut}>Log Out</button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>

  );
}

const styles = {
    avatar: {
        height: 38,
        width: 38,
        cursor: "pointer",
        backgroundColor: '#2190FF'
    },
    profile: {
        height: 200,
        width: 200,
        backgroundColor: '#2190FF'
    }
}

