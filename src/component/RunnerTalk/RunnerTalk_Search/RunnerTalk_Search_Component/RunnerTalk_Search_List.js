import {Box,Typography,Avatar,Divider,Skeleton} from '@mui/material';
import React, { useState,useCallback } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useLocation} from "react-router-dom"
import { useInView } from "react-intersection-observer"
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import {API_URL} from "../../../../API/URL/index"
import { fetchRunnerTalkSearch } from '../../../../API/api/RunningTalk/runningTalk_api';


export default function RunnerTalk_Search_list(props){

    const navigate = useNavigate();
    const querylocation = useLocation();
    const session = localStorage.getItem("sessionid");
    
    const [ref, inView] = useInView();
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);  
    
    const getItems = useCallback(async () => {
        const query = querylocation.search
        const decodeUri = decodeURI(query);
        setLoading(true);

        let _RunnerTalkList = "";
    
        if(decodeUri === ""){
            _RunnerTalkList = await fetchRunnerTalkSearch("?page="+page,session);
        }
        else{
            _RunnerTalkList = await fetchRunnerTalkSearch(decodeUri+"&page="+page,session);
        }

        if(_RunnerTalkList.response){
            props.setError(_RunnerTalkList.response.status)
            props.setOpen(true);
        }
        else{
            props.setList((prev)=>prev=[...prev,..._RunnerTalkList])
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

    const navigateToRunnerTalkDetail =(id) =>{
        navigate(`/runnertalk/detail/${id}`);
    }


    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%',height:'100%',mb:8}}>

            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column'}}>
                {props.list.map((item,index) =>{
                    return(
                    <React.Fragment key={index}>
                        {
                            props.list.length-1==index?
                            <Box ref = {ref} onClick ={()=>navigateToRunnerTalkDetail(item.id)} key = {item.id} sx={{display:'flex',alignItems:'center',height:'100px',width:'100%',borderBottom:1,borderColor:'rgba(237, 237, 237, 1)'}}>
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
                                            <Typography sx={{fontFamily:'Pretendard Variable',lineHeight:'15.51px',fontWeight:'500',fontSize:'13px',color:'#606060'  ,height:'100%',lineHeight:'normal'}}>
                                                {item.user}
                                            </Typography>
                                        </Box>
                                        <Divider orientation="vertical" flexItem variant="middle"  sx={{height:"10px"}}/>
                                        <Box sx={{ml:0.5, display:'flex'}}>
                                            <Box sx={{display:'flex',alignItems:'center',height:'14px'}}> 
                                                <ThumbUpOffAltOutlinedIcon sx={{width:'11px',height:'11px',mr:0.3}}/>
                                                <Typography sx={{fontFamily:'Pretendard Variable',lineHeight:'15.51px',fontWeight:'500',fontSize:'13px',color:'#606060',mr:1,height:'100%'}}>
                                                    {item.likePoint}
                                                </Typography>
                                            </Box>
                                            <Box sx={{display:'flex',alignItems:'center',height:'14px'}}>
                                                <ModeCommentOutlinedIcon sx={{width:'11px',height:'11px',mr:0.3}}/>
                                                <Typography sx={{fontFamily:'Pretendard Variable',lineHeight:'15.51px',fontWeight:'500',fontSize:'13px',color:'#606060',height:'100%'}}>
                                                    {item.commentPoint}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                 </Box>
                                <Box sx={{width:'75px',height:'75px',backgroundColor:'rgba(79, 29, 118, 0.1)',borderRadius:'7px',mx:1,backgroundImage:`url(${API_URL}${item.images.length?item.images[0].img:""})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'top center'}}/>
                            </Box>
                            :
                            <Box onClick ={()=>navigateToRunnerTalkDetail(item.id)} key = {item.id} sx={{display:'flex',alignItems:'center',height:'100px',width:'100%',borderBottom:1,borderColor:'rgba(237, 237, 237, 1)'}}>
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
                                            <Typography sx={{fontFamily:'Pretendard Variable',lineHeight:'15.51px',fontWeight:'500',fontSize:'13px',color:'#606060'  ,height:'100%',lineHeight:'normal'}}>
                                                {item.user}
                                            </Typography>
                                        </Box>
                                        <Divider orientation="vertical" flexItem variant="middle"  sx={{height:"10px"}}/>
                                        <Box sx={{ml:0.5, display:'flex'}}>
                                            <Box sx={{display:'flex',alignItems:'center',height:'14px'}}> 
                                                <ThumbUpOffAltOutlinedIcon sx={{width:'11px',height:'11px',mr:0.3}}/>
                                                <Typography sx={{fontFamily:'Pretendard Variable',lineHeight:'15.51px',fontWeight:'500',fontSize:'13px',color:'#606060',mr:1,height:'100%'}}>
                                                    {item.likePoint}
                                                </Typography>
                                            </Box>
                                            <Box sx={{display:'flex',alignItems:'center',height:'14px'}}>
                                                <ModeCommentOutlinedIcon sx={{width:'11px',height:'11px',mr:0.3}}/>
                                                <Typography sx={{fontFamily:'Pretendard Variable',lineHeight:'15.51px',fontWeight:'500',fontSize:'13px',color:'#606060',height:'100%'}}>
                                                    {item.commentPoint}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                 </Box>
                                <Box sx={{width:'75px',height:'75px',backgroundColor:'rgba(79, 29, 118, 0.1)',borderRadius:'7px',mx:1,backgroundImage:`url(${API_URL}${item.images.length?item.images[0].img:""})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'top center'}}/>
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