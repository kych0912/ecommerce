import {Box,Typography,Skeleton,Divider} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {useRecoilState} from 'recoil'
import {
    RunnerTalkMain_Error,
    RunnerTalkMain_LoadingAll,
    RunnerTalkMain_FilterLoading,
    RunnerTalkMain_Category
} from '../../../../state/RunnerTalk/RunnerTalkMain_State'
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from "./RunnerTalk_Main_Drawer"
import {fetchRunnerTalkCategory} from "../../../../API/api/RunningTalk/runningTalk_api"


import "./style.css"
import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";


export default function RunnerTalk_Main_Filter(props){

    const navigate = useNavigate();

    const loadinglist = [1,2,3,4,5,6];

    const [open,setOpen] = useState(false);
    const [category,setCategory] = useRecoilState(RunnerTalkMain_Category);
    const [error,setError] = useRecoilState(RunnerTalkMain_Error);
    const [loading1,setLoading1] = useRecoilState(RunnerTalkMain_FilterLoading);
    const [loadingall,setLoadingall] = useRecoilState(RunnerTalkMain_LoadingAll);

    const buttonTheme = {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:"auto",
        height:'30px',
        border:1,
        borderRadius:'13px',
        borderColor:'#D9D9D9',
        mr:0.5
    }

    const buttonTyphography ={
        fontFamily:'Pretendard Variable',
        fontWeight:'300',
        fontSize:'13px',
        mx:1
    }

    const FetchRunnerTalkCategory = async () => {
        const _Category = await fetchRunnerTalkCategory();

        if(_Category.response){
            setError(_Category.response.status)
            props.setOpen(true)
        }
        else{
            setCategory(prev=>prev=_Category)
        }

        setLoading1(false);
    }


    const navigateToFilterList =(id)=>{
        navigate(`/runnertalk/category/${id}`);
    }


    const openDrawer = () => {
        setOpen(true);
    }

    useEffect(()=>{
        setLoading1(true);
        FetchRunnerTalkCategory();
    },[])

    return(
        <Box sx={{backgroundColor:'#ffffff',display:'flex',justifyContent:'start',alignItems:'center',height:'35px',borderColor:'#E8E8E8',width:'100%',minWidth:'360px',maxWidth:'420px',mt:1.5}}>
            <Box sx={{width:'100%',display:'flex',justifyContent:'start',alignItems:'center'}}>
                {
                    loadingall?
                    <Box sx={{width:'100%'}}>
                        {/*필터*/}
                        <Swiper
                            spaceBetween={0}
                            modules={[FreeMode]}
                            slidesPerView={'auto'}
                            freeMode={{enabled: true}}	// 추가
                        >
                            {
                                loadinglist.map((item,index)=>{
                                    return(
                                        <SwiperSlide key = {item} className="swiper-width-auto">
                                            <Box sx={{width:'100%',height:'22px',display:"flex",alignItems:"center",mr:1}}>
                                                <Skeleton variant="rectangular" width={'50px'} height={"22px"} sx={{borderRadius:3}}/>
                                            </Box>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </Box>
                    :
                    <Box sx={{width:"100%"}}>
                    {
                        category.length !==0?
                        <Box sx={{width:"100%"}}>
                            <Swiper
                                spaceBetween={0}
                                modules={[FreeMode]}
                                slidesPerView={'auto'}
                                freeMode={{enabled: true}}	// 추가
                            >
                                <SwiperSlide key ={194484} className='swiper-width-auto'>
                                    <Box onClick={openDrawer} sx={buttonTheme}>
                                        <MenuIcon sx={{width:"17px",height:'100%',color:'#606060',ml:0.5,mb:'0.3px'}}/>    
                                        <Typography color = 'black' sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',mr:1,ml:0.3}}>
                                            {"주제"}
                                        </Typography>
                                    </Box>
                                    
                                </SwiperSlide>

                                <SwiperSlide key ={123} className='swiper-width-auto'>
                                    <Divider orientation="vertical" sx={{height:"32px",mr:0.5}}/>
                                </SwiperSlide>


                                {
                                category.map((item,index)=>{
                                    return(
                                        <SwiperSlide key ={index} className='swiper-width-auto'>
                                            <Box onClick = {()=>navigateToFilterList(item.id)} sx={buttonTheme}>
                                                <Typography color = 'black' sx={buttonTyphography}>
                                                    {item.name}
                                                </Typography>
                                            </Box>
                                        </SwiperSlide>
                                    )
                                })
                                }

                            </Swiper>
                        </Box>
                        :
                        ""

                    }
                    </Box>
                }
            </Box>
            <Drawer open = {open} setOpen ={setOpen}/>
        </Box>    
    )
}