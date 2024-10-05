import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import UserAppDrawer from './UserAppDrawer/UserAppDrawer';
import { useState } from 'react';

function LandingHeader({name, logOut}) {

  const [showDrawer, setShowDrawer] = useState(false);

  function openDrawer(){
    setShowDrawer(true);
  }

  function resetDrawerState(close){
    setShowDrawer(close);
  }
  return (
    <div>
    {showDrawer && <UserAppDrawer openDrawer={showDrawer} resetDrawerState={resetDrawerState}/>}
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={openDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello {name}!
          </Typography>
          <Button onClick={() => {
            logOut();
          }} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  );
}

export default LandingHeader;