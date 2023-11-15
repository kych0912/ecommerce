import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Button,Typography } from '@mui/material';

export default function Navbar() {
  const [value, setValue] = React.useState('recents');

  const navigate = useNavigate();


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{display:'flex',alignItems:"center", position: 'fixed', bottom: 0, left: '50%', right: 0,width:'100%',minWidth:'360px',maxWidth:'420px',transform:'translate(-50%,0)',zIndex:2,height:'65px' }} elevation={0}>
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',mx:2,marginY:'auto',width:"100%"}}>
            <Button variant="contained" color="primary" sx={{width:'98%',height:'40px',borderRadius:'10px',boxShadow:0}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'16px'}}>
                    크루 신청하기
                </Typography>
            </Button>
        </Box>
    </Box>
  );
}