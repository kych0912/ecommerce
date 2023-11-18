import {Box,Typography,Paper,Avatar} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { API_URL } from '../../../API/URL';

export default function Main_TopBar(){

    const navigate = useNavigate();

    const [scrollOpacity, setScrollOpacity] = useState(1);
    const updateScroll = () => {
        setScrollOpacity(1-(window.scrollY || document.documentElement.scrollTop)/500);
    }

    useEffect(()=>{
        window.addEventListener('scroll', updateScroll);
    });

    const navigateToScheduleMain = () =>{
        navigate('/schedule')
    }

    const profile = window.localStorage.getItem('profile');

    return(
        <Box 
        visibility={scrollOpacity>=0.2?'visible':'hidden'}
        style ={{
            opacity:scrollOpacity,
        }}
        sx={{
            position:'fixed',
            top:10,
            display:'flex',
            justifyContent:'end',
            alignItems:'center',
            height:'60px',
            width:'100%',
            borderBottom:1,
            minWidth:'360px',
            maxWidth:'450px',
            zIndex:1000,
            backgroundColor:'transparent',
            borderBottom:0,
        }}>


            <Box sx={{mr:2}}>
                <Avatar alt="User" src={`${API_URL}${profile}`} />
            </Box>
        </Box>    
    )
}