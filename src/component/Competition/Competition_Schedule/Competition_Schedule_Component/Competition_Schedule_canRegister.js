import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Skeleton from '@mui/material/Skeleton';
import {API_URL} from '../../../../API/URL/url';
import {fetchAcceptableContest} from '../../../../API/api/Contest/contest_api';
import {useRecoilState} from 'recoil'
import { CompetitionSchedule_AccceptableLoading,
        CompetitionSchedule_AllLoading
} from '../../../../state/Competition/CompetitionSchedule_State';

export default function Competition_Schedule_canRegister(props){

    const navigate = useNavigate();
    const [loading2,setLoading2] = useRecoilState(CompetitionSchedule_AccceptableLoading);
    const [loadingall,setLoadingall] = useRecoilState(CompetitionSchedule_AllLoading);
    const [acceptable,setacceptable] = useState([]);

    const FetchList = async () => {
        const _AcceptableCompetitions = await fetchAcceptableContest(6);
    
        if(_AcceptableCompetitions.response){
            props.setError(_AcceptableCompetitions.response.status)
            props.setOpen(true)
        }
        else{
           setacceptable(_AcceptableCompetitions);
        }
        
        setLoading2(false);
    }


    const convertToCustomDate = (date) => {
        const customDate = new Date(date); // 월은 0부터 시작하므로 2는 3월을 의미합니다.
        const year = customDate.getFullYear();
        const month = (customDate.getMonth() + 1).toString().padStart(2, '0'); // 1을 더하고 두 자리로 맞춥니다.
        const day = customDate.getDate().toString().padStart(2, '0'); // 두 자리로 맞춥니다.
        return `${year}.${month}.${day}`;
    };


    const navigateToCompetitionDetail =(id) =>{
        navigate(`/competition/detail/${id}`);
    }

    const navigateToMoreContest = () =>{
        navigate(`/schedule/search?month=13`)
    }

    useEffect(() =>{
        FetchList();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%'}}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'start',alignItems:'start',width:'100%'}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px'}}>
                    접수 가능한 대회
                </Typography>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:"#9D9D9D"}}>
                    지금 당장 접수 가능한 대회에요
                </Typography>
            </Box>

            {loadingall
                    ?
                    <Box sx={{width:"100%"}}>
                        <Skeleton variant="rectangular" width={'100%'} height={"110px"} sx={{mt:1,borderRadius:2}}/>
                        <Skeleton variant="rectangular" width={'100%'} height={"110px"} sx={{mt:1,borderRadius:2}}/>
                        <Skeleton variant="rectangular" width={'100%'} height={"110px"} sx={{mt:1,borderRadius:2}}/>
                    </Box>
                    :
                    <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column',mt:1}}>
                        {acceptable?
                        <Box sx={{width:"100%"}}>
                            {acceptable.map((item,index) =>(
                                <Box key ={index} onClick ={()=>navigateToCompetitionDetail(item.id)} sx={{display:'flex',alignItems:'center',backgroundColor:'#F6F6F6',borderRadius:2,height:'110px',mt:1,width:'97%'}}>
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
                                        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',pt:'8px'}}>
                                            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                                            {
                                                item.courseTags.map((item,index)=>{
                                                    return(
                                                        <Box key ={index} sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'15px',backgroundColor:'#4F1D76',borderRadius:'6px',mr:'3px'}}>
                                                            <Typography sx={{fontFamily:'Pretendard',fontStyle:'normal',fontWeight:'700',fontSize:'9px',color:'#ffffff',lineHeight:"10.74px",mx:'6px',width:"auto"}}>
                                                                {item.name}
                                                            </Typography>
                                                        </Box>
                                                    )
                                            })
                                            }   
                                            </Box>
                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'8px',color:'#606060',width:'35px',mr:'15px'}}>
                                                상세정보 {'>'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                            :
                        <Box>
                            error
                        </Box>
                        }
                    </Box>
                }
            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column',mt:1}}>
                <Box onClick ={navigateToMoreContest} sx={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'10px',height:'40px',mt:1,width:'calc(100% - 2px)',border:1,color:'#E8E8E8'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:'#606060'}}>
                        더보기
                    </Typography>
                </Box>
            </Box>

        </Box>    
    )
}