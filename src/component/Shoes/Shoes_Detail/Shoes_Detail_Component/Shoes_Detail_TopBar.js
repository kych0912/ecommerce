import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import WestIcon from '@mui/icons-material/West';

const TopbarTheme = {
    position:'fixed',
    top:0,
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#ffffff',
    height:'60px',
    width:'100%',
    borderBottom:1,
    borderBottomColor:'#E0E0E0',
    minWidth:'360px',
    maxWidth:'420px',
    zIndex:1000
}

export default function Shoes_Detail_TopBar(){

    const navigate = useNavigate();

    const navigateToBack = () =>{
        navigate(-1);
    }

    useEffect(() =>{
    },[])

    return(
        <Box sx={TopbarTheme}>
            <Box onClick = {navigateToBack} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <IconButton type="button" sx={{ml:1}} aria-label="search">
                    <WestIcon sx={{}}/>
                </IconButton>
            </Box>
        </Box>    
    )
}