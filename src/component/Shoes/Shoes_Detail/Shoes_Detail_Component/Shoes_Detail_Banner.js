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
                props.shoes.shoesImg?
                    <Swiper
                        scrollbar={{
                            hide: true,
                        
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper"
                    >
                        {
                            props.shoes.shoesImg.map((item,index)=>{
                                return(
                                    <SwiperSlide key={index}>
                                        <Box sx={{backgroundImage:`url(${API_URL}${item.url})`,width:'100%',height:'100%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                :
                    <Box sx={{backgroundColor:"#4F1D76",width:'100%',height:'100%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
            }
        </Box>    
    )
}