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
                modules={[EffectCoverflow, Pagination,Autoplay]}
                autoplay={{delay: 5000, disableOnInteraction: false}}
                className="swiper-banner"
            >
                <SwiperSlide className="swiper-slide-banner">
                    <img className = "swiper-slide-image" src="https://image.msscdn.net/display/images/2023/11/14/1cbba9bed8304579b058e1bd5bd2b9cd.jpg" />
                    <Box sx={{position:"absolute",right:"40px",left:'40px',bottom:'40px'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'22px',color:"white"}}>
                            지금 주목해야 할 우먼 패딩
                        </Typography>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px',color:"white"}}>
                            인기상품 최대 72% 할인
                        </Typography>
                    </Box>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide-banner">
                    <img className = "swiper-slide-image" src="https://image.msscdn.net/display/images/2023/11/06/bf86205aab2d4952a939d59ea760e811.jpg" />
                    <Box sx={{position:"absolute",right:"40px",left:'40px',bottom:'40px'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'22px',color:"white"}}>
                            니트 & 카디건 랭킹 100
                        </Typography>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px',color:"white"}}>
                            BESTㅣ지금 필요한 도톰한 이너
                        </Typography>
                    </Box>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide-banner">
                    <img className = "swiper-slide-image" src="https://image.msscdn.net/display/images/2023/11/16/59baf9e0f4d0402a88bbaebdbc172a7d.jpg" />
                    <Box sx={{position:"absolute",right:"40px",left:'40px',bottom:'40px'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'22px',color:"white"}}>
                            에잇세컨즈 아우터 블프 세일
                        </Typography>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px',color:"white"}}>
                            세일 | 최대 43% 할인
                        </Typography>
                    </Box>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide-banner">
                    <img className = "swiper-slide-image" src="https://image.msscdn.net/display/images/2023/11/14/76c84786adb3431c85f11b31b47bc491.jpg" />
                    <Box sx={{position:"absolute",right:"40px",left:'40px',bottom:'40px'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'22px',color:"white"}}>
                            아울렛 컨버스 특가
                        </Typography>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px',color:"white"}}>
                            세일 | 최대 60% 할인
                        </Typography>
                    </Box>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide-banner">
                    <img className = "swiper-slide-image" src="https://image.msscdn.net/display/images/2023/11/15/bd2f730b22f9460786511ace4c5f2632.jpg" />
                    <Box sx={{position:"absolute",right:"40px",left:'40px',bottom:'40px'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'22px',color:"white"}}>
                            겨울 야외활동 방한용품
                        </Typography>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px',color:"white"}}>
                            뽀글이 모자부터 워머까지 최대 47% 할인
                        </Typography>
                    </Box>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide-banner">
                    <img className = "swiper-slide-image" src="https://image.msscdn.net/display/images/2023/11/09/c646f8d71ad249c2a5d25be6739302b0.jpg" />
                    <Box sx={{position:"absolute",right:"40px",left:'40px',bottom:'40px'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'22px',color:"white"}}>
                        맨즈 헤비 아우터 모음전
                        </Typography>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px',color:"white"}}>
                        단독 | 최대 70% 할인
                        </Typography>
                    </Box>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide-banner">
                    <img className = "swiper-slide-image" src="https://image.msscdn.net/display/images/2023/11/13/7534d898b1bc4b628fd58efc7803c023.jpg" />
                    <Box sx={{position:"absolute",right:"40px",left:'40px',bottom:'40px'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'22px',color:"white"}}>
                        23 WINTER 스마트 쇼핑
                        </Typography>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px',color:"white"}}>
                        단독 | 최대 70% 할인
                        </Typography>
                    </Box>
                </SwiperSlide>
            </Swiper>
        </Box>    
    )
}