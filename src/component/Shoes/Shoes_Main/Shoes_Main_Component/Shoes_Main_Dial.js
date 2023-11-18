import * as React from 'react';
import {Box,Typography,Backdrop} from '@mui/material';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export default function BasicSpeedDial() {

    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();

    const navigateToShoesAdd = () =>{
        navigate('/shoes')
    }

    const handleOpen = () => {
        {
            open ? setOpen((prev) => prev = false) : setOpen((prev) => prev = true)
        }
    };

    return (
    <Box sx={{position:"absolute",right:80}}>
        <Backdrop
        sx={{ color: '#fff', zIndex:1001 }}
        open={open}
        onClick={handleOpen}
        >
        </Backdrop>
            <Fab
                color="primary"
                sx={{position:'fixed',bottom:80}}
                onClick={handleOpen}
            >
                <SpeedDialIcon 
                    sx={{transform: open ? 'rotate(45deg)' : 'rotate(0deg)',transition: 'transform 0.15s ease-in-out',color:"white"}}
                />
            </Fab>
        
            <Box sx={{ position:"absolute",right:130}}>
                <Fade in={open}>
                        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:"center",position:"fixed",bottom:150,width:'180px',height:'60px',backgroundColor:'#DEDAE0',borderRadius:'15px',border:1,borderColor:'#A1BBFF',zIndex:1002}}>
                            <Box onClick={navigateToShoesAdd} sx={{display:'flex'}}>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',color:"#000000",lineHeight:'25px',color:"#6983C9"}}>
                                    GPT에게 옷 추천받기
                                </Typography>
                            </Box>
                            
                        </Box>
                </Fade>
            </Box>
    </Box>
    );
}