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

    const navigateToScheduleSearch = () =>{
        navigate('/schedule/search')
    }

    const navigateToHome = () =>{
        navigate(-1);
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
        </Box>    
    )
}