import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NearbyLogo from '../NearbyLogo';
import "./HomePageHeader.css";
import { useNavigate } from 'react-router-dom';

function HomePageHeader() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', color: 'black' }}>
        <Toolbar>
          <NearbyLogo wth="8em" mb="0em"/>
          <Box sx={{flexGrow: 1}}/>
          <Box sx={{ display: "flex", gap: 5 }}>
          <Button id="about-button" className="button" sx={{fontSize: "1.25rem"}} size="large" onClick={() => {
            navigate("/about")
          }}>About</Button>
          <Button id="about-button" className="button" sx={{fontSize: "1.25rem", marginRight: "5rem"}} size="large" onClick={() => {
            navigate("/help")
          }}>Contact</Button>
        </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HomePageHeader;