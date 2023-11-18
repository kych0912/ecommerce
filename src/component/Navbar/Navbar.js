import * as React from 'react';
import useEffect from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SortIcon from '@mui/icons-material/Sort';

export default function Navbar() {

  const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
  const [value, setValue] = React.useState(pathname);
  console.log(pathname)

  const navigate = useNavigate();

  const navigateToMain = () =>{
    navigate('/');
  }
  const navigateToClothes = () =>{
    navigate('/clothes');
  }
  const navigateToTalk= () =>{
    navigate('/runnertalk');
  }
  const navigateToCrew= () =>{
    navigate('/crew');
  }
  const navigateToShoes= () =>{
    navigate('/shoes');
  }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: '50%', right: 0,width:'100%',minWidth:'360px',maxWidth:'450px',transform:'translate(-50%,0)',zIndex:2 }} elevation={0}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="홈"
          value="/"
          onClick = {navigateToMain}
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="옷 찾기"
          value="/schedule"
          onClick = {navigateToClothes}
          icon={<SortIcon />}
        />
        <BottomNavigationAction
          label="유저"
          value="/user"
          icon={<PersonOutlineIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}