import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchPopularTalk } from '../../../API/api/RunningTalk/runningTalk_api';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/free-mode';
import './style.css';

// import required modules
import { Grid } from 'swiper/modules';
import { FreeMode } from 'swiper/modules';



export default function  Community(props){

    const navigate = useNavigate();

    const navigateToCompetitionDetail =(id) =>{
        navigate(`/runnertalk/detail/${id}`)
    }

    const [runningtalk,setRunningTalk] = useState([]);

    const FetchList = async () => {
        const _PopularRunningTalk = await fetchPopularTalk(6);
    
        if(_PopularRunningTalk.response){
            props.setError(_PopularRunningTalk.response.status)
            props.setOpen(true)
        }
        else{
            setRunningTalk(_PopularRunningTalk);
        }
        
        props.setLoading4(false);
    }
    
    useEffect(() =>{
        FetchList();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%',py:'22px'}}>

            {/*상단제목*/}
            <Box sx={{width:'100%'}}>
                <Box sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px',ml:2}}>
                        이런 러닝 꿀팁은 어때요?
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',color:'#8E8D8D',mr:2}}>
                        <Link to ="/runnertalk" style={{ textDecoration: 'none', color:'#9D9D9D' }}>
                            더보기 {'>'}
                        </Link>
                    </Typography>
                </Box>
            </Box>

            {/*대회정보*/}
            <Box sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                <Swiper
                    slidesPerView={1}
                    grid={{
                        rows: 2,
                        fill: "row"
                    }}
                    spaceBetween={'-6px'}
                    modules={[Grid,FreeMode]}
                    
                    freeMode={{enabled: true}}	// 추가
                >
                {
                        runningtalk.map((item,index)=>{
                            return(
                                    <SwiperSlide key = {index} className='swiper-slide-community'>
                                        <Box onClick ={() => navigateToCompetitionDetail(item.id)} sx={{width:'100%',height:'110px',backgroundColor:'#F6F6F6',borderRadius:3,display:'flex',alignItems:'center'}}>
                                            <Box sx={{width:'90px',height:'90px',backgroundColor:'#4F1D76',borderRadius:3,mx:1}}/>
                                            <Box sx={{display:'flex',justifyContent:'center',alignItems:'start',width:`calc(100% - 106px)`,flexDirection:'column',height:"100%"}}>
                                                <Box sx={{width:'100%'}}>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px'}}>
                                                        {item.title}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{width:'95%',height:"45px"}}>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'8px',height:'100%',color:'#606060',whiteSpace:'pre-line',overflow:'hidden',textOverflow:'ellipsis',WebkitLineClamp:3,display:'-webkit-box',WebkitBoxOrient:'vertical'}}>
                                                        {item.content}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:"center",mt:0.5}}>
                                                    <Box sx={{display:'flex',height:'14px',alignItems:"center"}}>
                                                        <Avatar sx={{width:'11px',height:'11px',mr:0.5}}/>
                                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060'  ,height:'100%',lineHeight:'normal'}}>
                                                            {item.user}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{mr:3, display:'flex'}}>
                                                        <Box sx={{display:'flex',alignItems:'center',height:'14px'}}>
                                                            <TurnedInNotIcon sx={{width:'11px',height:'11px',mr:0.3}}/>
                                                            <Typography align ="center" sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',mr:1,height:'100%'}}>
                                                                {item.bookmarkPoint}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{display:'flex',alignItems:'center',height:'14px'}}> 
                                                            <ThumbUpOffAltOutlinedIcon sx={{width:'11px',height:'11px',mr:0.3}}/>
                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',mr:1,height:'100%'}}>
                                                                {item.likePoint}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{display:'flex',alignItems:'center',height:'14px'}}>
                                                            <ModeCommentOutlinedIcon sx={{width:'11px',height:'11px',mr:0.3}}/>
                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',height:'100%'}}>
                                                                {item.commentPoint}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </Box>

            
        </Box>    
    )
}