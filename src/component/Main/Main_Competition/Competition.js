import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import {API_URL} from "../../../API/URL/url"
import { fetchPopularContest } from '../../../API/api/Contest/contest_api';
import { Swiper, SwiperSlide } from "swiper/react";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
//모듈 필요
import { FreeMode,Grid } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";

import './style.css';

const convertToCustomDate = (date) => {
    const customDate = new Date(date); // 월은 0부터 시작하므로 2는 3월을 의미합니다.
    const year = customDate.getFullYear();
    const month = (customDate.getMonth() + 1).toString().padStart(2, '0'); // 1을 더하고 두 자리로 맞춥니다.
    const day = customDate.getDate().toString().padStart(2, '0'); // 두 자리로 맞춥니다.
    return `${year}.${month}.${day}`;
};



export default function Competition(props){
    const [competition,setCompetition] = useState([]);

    const FetchList = async () => {
        const _Popularcompetitions = await fetchPopularContest(3);
    
        if(_Popularcompetitions.response){
            props.setError(_Popularcompetitions.response.status)
            props.setOpen(true)
        }
        else{
            setCompetition(_Popularcompetitions);
        }
        
        props.setLoading1(false);
    }

    const navigate = useNavigate();

    const navigateToCompetitionDetail =(id) =>{
        navigate(`/competition/detail/${id}`)
    }

    useEffect(()=>{
        FetchList();
    },[])



    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%',py:'22px'}}>

            {/*상단제목*/}
            <Box sx={{width:'90%'}}>
                <Box sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px'}}>
                        지금 인기있는 러닝대회
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',color:'#8E8D8D'}}>
                        <Link to ="/schedule" style={{ textDecoration: 'none', color:'#9D9D9D' }}>
                            더보기 {'>'}
                        </Link>
                    </Typography>
                </Box>
            </Box>

            {/*대회정보*/}
            {
                props.loadingall?
                <Box sx={{width:"100%",height:'120px'}}>
                    <Skeleton variant="rectangular" width={'100%'} height={"100px"} sx={{mt:1,borderRadius:2}}/>
                </Box>
                :
                <Box sx={{width:"100%",display:"flex",justifyContent:"end"}}>
                    {
                        competition?
                        <Box sx={{width:'95%',pt:1}}>
                            <Swiper
                                spaceBetween={8}
                                modules={[FreeMode]}
                                slidesPerView={'auto'}
                                freeMode={{enabled: true}}	// 추가
                            >
                                {
                                    competition.map((item,index)=>{
                                        return(
                                            <SwiperSlide key ={index} className='competition'>
                                                <Box key ={index} onClick ={()=>navigateToCompetitionDetail(item.id)} sx={{display:'flex',alignItems:'center',backgroundColor:'#F6F6F6',borderRadius:2,height:'110px',mt:1,width:'100%'}}>
                                                    <Box sx={{width:'90px',height:'90px',backgroundColor:'#F6F6F6',borderRadius:'8px',mx:'11px',backgroundImage:`url(${API_URL}${item.mainBanner.mainBanner})`,backgroundRepeat:'no-repeat',backgroundSize:'contain',backgroundPosition:'center'}}/>
                                                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:`calc(100% - 112px)`,flexDirection:'column'  }}>
                                                        <Box sx={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center'}}>
                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',lineHeight:'21.46px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                                {item.name}
                                                            </Typography>
                                                            <NotificationsActiveIcon fontSize={'small'} sx={{pr:2}}/>
                                                        </Box>
                                                        <Box sx={{width:'100%',mt:'7px'}}>
                                                            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060',lineHeight:'15.51px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                                    {item.place}
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060',lineHeight:'15.51px'}}>
                                                                    &nbsp;{'|'}&nbsp;
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060',lineHeight:'15.51px',mr:2}}>
                                                                    {convertToCustomDate(item.competitionTime)}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{width:'100%',mt:'3px'}}>
                                                            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060',lineHeight:'15.51px'}}>
                                                                    접수기간 |&nbsp;
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060',lineHeight:'15.51px'}}>
                                                                    {convertToCustomDate(item.receptionStartTime)}
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060',lineHeight:'15.51px'}}>
                                                                    ~
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060',lineHeight:'15.51px'}}>
                                                                    {convertToCustomDate(item.receptionEndTime)}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{width:"100%",mt:'8px'}}>
                                                            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                                {
                                                                    item.courseTags.map((item,index)=>{
                                                                        return(
                                                                            <Box key ={index} sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'15px',backgroundColor:'#4F1D76',borderRadius:'6px',mr:'3px'}}>
                                                                                <Typography sx={{fontFamily:'Pretendard',fontStyle:'normal',fontWeight:'700',fontSize:'9px',color:'#ffffff',lineHeight:"11px",mx:'6px',width:"auto"}}>
                                                                                    {item.name}
                                                                                </Typography>
                                                                            </Box>
                                                                        )
                                                                })
                                                                }      
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
                        :
                        <Box>
                            error
                        </Box>
                    }
                </Box>
            }
        </Box>    
    )
}
