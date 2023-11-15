import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import ShareIcon from '@mui/icons-material/Share';
import {API_URL} from "../../../../API/URL/url"

import { Swiper, SwiperSlide } from "swiper/react";


import 'swiper/css';
import 'swiper/css/scrollbar';

import './style.css';

// import required modules
import { Scrollbar } from 'swiper/modules';

export default function Competition_Detail_Banner(props){
    useEffect(() =>{
    },[])

    return(
        <Box sx={{position:'relative',zIndex:0,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#4F1D76',flexDirection:'column',width:'100%',height:'350px'}}>
            {
                props.shoes.mainImg?
                <Box sx={{backgroundImage:`url(${API_URL}/api/file/${props.shoes.mainImg})`,width:'100%',height:'100%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
                :
                <Box sx={{position:'relative',borderRadius:'8px'}}>
                    <img src={`${API_URL}/api/file/${props.shoes.mainImg}`} onerror="this.style.display='none'" style={{width:'170px',height:'170px',objectFit:'cover',objectPosition:'center',px:1}}/>
                </Box>
            }
        </Box>    
    )
}