import * as React from 'react';
import useEffect from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import DoNotStepIcon from '@mui/icons-material/DoNotStep';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

export default function Navbar() {

  const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
  const [value, setValue] = React.useState(pathname);
  console.log(pathname)

  const navigate = useNavigate();

  const navigateToMain = () =>{
    navigate('/');
  }
  const navigateToContest = () =>{
    navigate('/schedule');
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
          label="대회일정"
          value="/schedule"
          onClick = {navigateToContest}
          icon={<DirectionsRunIcon />}
        />
        <BottomNavigationAction
          label="러너톡"
          value="/runnertalk"
          onClick = {navigateToTalk}
          icon={<CorporateFareIcon />}
        />
        <BottomNavigationAction
          label="러닝크루"
          value="/crew"
          onClick = {navigateToCrew}
          icon={<PeopleIcon />}
        />
        <BottomNavigationAction
          label="러닝화"
          value="/shoes"
          onClick = {navigateToShoes}
          icon={<DoNotStepIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}