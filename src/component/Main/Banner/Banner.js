import {Box,Typography,Button} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../../style/fonts/pretendardvariable.css"
import { useNavigate } from "react-router-dom";

//https://swiperjs.com/react#installation
//MIT License
import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { Autoplay } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/autoplay';
import './style.css';

import { EffectCoverflow, Pagination } from 'swiper/modules';

export default function Main(){

    useEffect(() =>{

    },[]);

    return(
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'480px',flexDirection:'column',width:'100%',mt:'60px'}}>
           <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                spaceBetween={-15}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="swiper-banner"
            >
                <SwiperSlide className="swiper-slide-banner">
                <img className = "swiper-slide-image" src="https://swiperjs.com/demos/images/nature-1.jpg" />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide-banner">
                <img className = "swiper-slide-image" src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide-banner">
                <img className = "swiper-slide-image" src="https://swiperjs.com/demos/images/nature-3.jpg" />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide-banner">
                <img className = "swiper-slide-image" src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide-banner">
                <img className = "swiper-slide-image" src="https://swiperjs.com/demos/images/nature-5.jpg" />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide-banner">
                <img className = "swiper-slide-image" src="https://swiperjs.com/demos/images/nature-6.jpg" />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide-banner">
                <img className = "swiper-slide-image" src="https://swiperjs.com/demos/images/nature-7.jpg" />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide-banner">
                <img className = "swiper-slide-image" src="https://swiperjs.com/demos/images/nature-8.jpg" />
                </SwiperSlide>
            </Swiper>
        </Box>    
    )
}