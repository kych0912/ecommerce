import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TopbarTheme from '../../../../style/plate/topbar';
import WestIcon from '@mui/icons-material/West';


export default function RunnerTalk_Main_TopBar(){

    const navigate = useNavigate();

    const navigateToRunnerTalkSearch = () =>{
        navigate('/runnertalk/search')
    }

    const navigateToHome = () =>{
        navigate('/');
    }


    useEffect(() =>{
    },[])

    return(
        <Box sx={TopbarTheme}>
            <Box onClick = {navigateToHome} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <IconButton type="button" sx={{ }} aria-label="search">
                    <WestIcon sx={{}}/>
                </IconButton>
            </Box>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:"column"}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'23px'}}>
                    러너톡
                </Typography>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'10px',color:'#A6A6A6',mt:-0.5}}>
                    전체글
                </Typography>
            </Box>

            <Box
                onClick={navigateToRunnerTalkSearch}
                >
                <IconButton type="button" sx={{ }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Box>
        </Box>    
    )
}