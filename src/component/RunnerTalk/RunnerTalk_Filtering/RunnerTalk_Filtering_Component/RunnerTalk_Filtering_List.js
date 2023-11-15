import {Box,Typography,Avatar,Divider} from '@mui/material';
import React, { useState,useCallback } from "react";
import { useRef,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import {useLocation} from "react-router-dom"
import { useInView } from "react-intersection-observer"
import {Skeleton} from '@mui/material';
import {API_URL} from '../../../../API/URL/index';
import { fetchRunnerTalkCategoryPost } from '../../../../API/api/RunningTalk/runningTalk_api';
import {useRecoilState} from 'recoil'
import {
    RunnerTalkFiltering_Error,
    RunnerTalkFiltering_List,
    RunnerTalkFiltering_Category
} from '../../../../state/RunnerTalk/RunnerTalkFiltering_State';

export default function RunnerTalk_Main_List(props){
    const navigate = useNavigate();
    const {id} = useParams();

    const [error,setError] = useRecoilState(RunnerTalkFiltering_Error);
    const [list,setList] = useRecoilState(RunnerTalkFiltering_List);
    const [category,setCategory] = useRecoilState(RunnerTalkFiltering_Category);
    const [ref, inView] = useInView();
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);    

    const getItems = useCallback(async () => {
        setLoading(true);

        const _RunnerTalkList = await fetchRunnerTalkCategoryPost(id,"?page="+page);

        if(_RunnerTalkList.response){
            setError(_RunnerTalkList.response.status)
            props.setOpen(true);
        }
        else{
            setList((prev)=>[...prev,..._RunnerTalkList])
        }

        setLoading(false);
    }, [page])

    useEffect(() => {
        getItems();
    }, [getItems])

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !loading) {
            setPage(prevState => prevState + 1)
        }
    }, [inView])

    const navigateToCompetitionDetail =(id) =>{
        navigate(`/runnertalk/detail/${id}`);
    }


    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%',height:'100%',mb:8}}>

            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column'}}>
                {list.map((item,index) =>{
                    return(
                    <React.Fragment key={index}>
                        {
                            list.length-1==index?
                            <Box ref = {ref} onClick ={()=>navigateToCompetitionDetail(item.id)} key = {item.id} sx={{display:'flex',alignItems:'center',height:'100px',width:'100%',borderBottom:1,borderColor:'rgba(237, 237, 237, 1)'}}>
                                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:`calc(100% - 81px)`,flexDirection:'column'  }}>
                                    <Box sx={{width:'100%'}}>
                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'15px'}}>
                                            {item.title}
                                        </Typography>
                                    </Box>
                                    <Box sx={{width:'100%'}}>
                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',color:'#000000',whiteSpace:'pre-line',overflow:'hidden',textOverflow:'ellipsis',WebkitLineClamp:1,display:'-webkit-box',WebkitBoxOrient:'vertical'}}>
                                            {item.content}
                                        </Typography>
                                    </Box>
                                    <Box sx={{width:'100%',display:'flex',justifyContent:'start',alignItems:"center"}}>
                                        <Box sx={{display:'flex',height:'14px',alignItems:"center",mr:0.5}}>
                                            <Avatar sx={{width:'11px',height:'11px',mr:0.5}}/>
                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060'  ,height:'100%',lineHeight:'normal'}}>
                                                {item.user}
                                            </Typography>
                                        </Box>
                                        <Divider orientation="vertical" flexItem variant="middle"  sx={{height:"10px"}}/>
                                        <Box sx={{ml:0.5, display:'flex'}}>
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
                                <Box sx={{width:'75px',height:'75px',backgroundColor:'rgba(79, 29, 118, 0.1)',borderRadius:'7px',mx:1,backgroundImage:`url(${API_URL}${item.images[0]})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'top center'}}/>
                            </Box>
                            :
                            <Box onClick ={()=>navigateToCompetitionDetail(item.id)} key = {item.id} sx={{display:'flex',alignItems:'center',height:'100px',width:'100%',borderBottom:1,borderColor:'rgba(237, 237, 237, 1)'}}>
                                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:`calc(100% - 81px)`,flexDirection:'column'  }}>
                                    <Box sx={{width:'100%'}}>
                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'15px'}}>
                                            {item.title}
                                        </Typography>
                                    </Box>
                                    <Box sx={{width:'100%'}}>
                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',color:'#000000',whiteSpace:'pre-line',overflow:'hidden',textOverflow:'ellipsis',WebkitLineClamp:1,display:'-webkit-box',WebkitBoxOrient:'vertical'}}>
                                            {item.content}
                                        </Typography>
                                    </Box>
                                    <Box sx={{width:'100%',display:'flex',justifyContent:'start',alignItems:"center"}}>
                                        <Box sx={{display:'flex',height:'14px',alignItems:"center",mr:0.5}}>
                                            <Avatar sx={{width:'11px',height:'11px',mr:0.5}}/>
                                            <Typography sx={{fontFamily:'Pretendard Variable',color:'#606060',height:'100%',lineHeight:'15.51px',fontWeight:'500',fontSize:'13px'}}>
                                                {item.user}
                                            </Typography>
                                        </Box>
                                        <Divider orientation="vertical" flexItem variant="middle"  sx={{height:"10px"}}/>
                                        <Box sx={{ml:0.5, display:'flex'}}>
                                            <Box sx={{display:'flex',alignItems:'center',height:'14px'}}> 
                                                <ThumbUpOffAltOutlinedIcon sx={{width:'11px',height:'11px',mr:0.3}}/>
                                                <Typography sx={{fontFamily:'Pretendard Variable',color:'#606060',mr:1,height:'100%',lineHeight:'15.51px',fontWeight:'500',fontSize:'13px'}}>
                                                    {item.likePoint}
                                                </Typography>
                                            </Box>
                                            <Box sx={{display:'flex',alignItems:'center',height:'14px'}}>
                                                <ModeCommentOutlinedIcon sx={{width:'11px',height:'11px',mr:0.3}}/>
                                                <Typography sx={{fontFamily:'Pretendard Variable',color:'#606060',height:'100%',lineHeight:'15.51px',fontWeight:'500',fontSize:'13px'}}>
                                                    {item.commentPoint}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                 </Box>
                                <Box sx={{width:'75px',height:'75px',backgroundColor:'rgba(79, 29, 118, 0.1)',borderRadius:'7px',mx:1,backgroundImage:`url(${API_URL}${item.images[0]})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'top center'}}/>
                            </Box>

                        }
                    </React.Fragment>
                    )  
                })}
            </Box>
            {
                loading?
                <Skeleton variant="rectangular" width={'100%'} height={"110px"} sx={{mt:1,borderRadius:2}}/>
                :
                ""
            }
        </Box>    
    )
}