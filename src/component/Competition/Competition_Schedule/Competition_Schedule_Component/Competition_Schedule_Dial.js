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

    const navigateToAddCompetition = () =>{
        navigate('/competition/add')
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
                    sx={{transform: open ? 'rotate(45deg)' : 'rotate(0deg)',transition: 'transform 0.15s ease-in-out'}}
                />
            </Fab>
        
            <Box sx={{ position:"absolute",right:130}}>
                <Fade in={open}>
                        <Box sx={{display:'flex',flexDirection:'column',alignItems:'start',justifyContent:"center",position:"fixed",bottom:150,width:'180px',height:'85px',backgroundColor:'#DEDAE0',borderRadius:'15px',border:1,borderColor:'#4F1D76',zIndex:1002}}>
                            <Box onClick={()=>navigateToAddCompetition()} sx={{display:'flex',ml:2}}>
                                <AddIcon color="primary" sx={{size:'15px'}}/>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',color:"#4F1D76",ml:1,lineHeight:'25px'}}>
                                    대회 등록하기
                                </Typography>
                            </Box>
                            <Box sx={{display:'flex',ml:2,mt:0.2}}>
                                <BookmarkBorderIcon color="primary" sx={{size:'15px'}}/>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',color:"#4F1D76",ml:1,lineHeight:'23px'}}>
                                    저장한 대회
                                </Typography>
                            </Box>
                        </Box>
                </Fade>
            </Box>
    </Box>
    );
}