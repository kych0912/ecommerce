import {Box,Typography,Grid,IconButton} from '@mui/material';
import React, { useState,useCallback } from "react";
import { useRef,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer"
import {CircularProgress} from '@mui/material';
import {API_URL} from "../../../../API/URL/index"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {useRecoilState} from 'recoil'
import {
    CrewMain_List,
    CrewMain_Loading,
    CrewMain_Error,
    CrewMain_CrewBookMark
} from '../../../../state/Crew/CrewMain_State';
import { fetchCrewAll,runningCrewBookMark } from '../../../../API/api/RunningCrew/crew_api';

export default function Crew_Main_List(props){
    const session = localStorage.getItem("sessionid");
    const navigate = useNavigate();

    const extractSentenceAfterWord = (text) => {
        const sentences = text.split('.');
        for (const sentence of sentences) {
          if (sentence.includes('일')) {
            const index = sentence.indexOf('일') + 2; // '일' 다음 문자부터 추출
            return sentence.slice(index).trim();
          }
        }
        return null; // '일'이 포함된 문장을 찾지 못한 경우
    }
    
    const [error,setError] = useRecoilState(CrewMain_Error);
    const [list,setList] = useRecoilState(CrewMain_List);
    const [ref, inView] = useInView();
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);  
    const [crewBookMark,setCrewBookMark] = useRecoilState(CrewMain_CrewBookMark);
    
    const getItems = useCallback(async () => {
        
        setLoading(true);
        const _CrewList = await fetchCrewAll("?page="+page,session);

        if(_CrewList.response){
            setError(_CrewList.response.status)
            props.setOpen(true);
        }
        else{
            setList((prev)=>[...prev,..._CrewList])
        }

        setLoading(false);
    }, [page])

    useEffect(() => {
        getItems();
    }, [getItems])

    const navigateToCrewDetail =(id) =>{
        navigate(`/crew/detail/${id}`);
    }

    const bookMark = async (id) =>{
        const response = await runningCrewBookMark(id,session);
        if(response.response){
            setError(response.response.status)
            props.setOpen(true);
            return false;
        }
        else{
            return true;
        }
    }

    const onClickBookMark = (id,event) =>{
        event.stopPropagation();
        if(bookMark(id)){
            setCrewBookMark((prev)=>({...prev,[id]:!crewBookMark[id]}))
        }
    }


    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !loading) {
            setPage(prevState => prevState + 1)
            console.log(page)
        }
    }, [inView])

    useEffect(()=>{
        for(const item of list){
            setCrewBookMark((prev)=>({...prev,[item.id]:item.bookmarked}))
        }
    },[list])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%',mb:8}}>
            <Box sx={{width:"100%"}}>
                
                <Grid container spacing={1} columns={16} >
                        {
                            list.map((item,index)=>{
                                return(
                                    <React.Fragment key = {index}>
                                    {
                                        list.length-1===index?
                                        <Grid item xs={8} key={item.id} sx={{display:'flex',justifyContent:'center'}}>
                                            <Box ref={ref} onClick={()=>navigateToCrewDetail(item.id)} sx={{width:'100%',mb:1,display:'flex',flexDirection:'column',alignItems:"start",justifyContent:'center'}}>
                                                <Box sx={{position:'relative',backgroundColor:'#f4f4f4',width:'100%',pb:'100%',overflow:"hidden",borderRadius:'8px'}}>
                                                    <img src={`${API_URL}${item.mainImg}`} style={{position:"absolute",width:"100%",height:"100%",objectFit:'contain',objectPosition:'contain'}}/>
                                                    {
                                                        crewBookMark[item.id]?
                                                        <IconButton onClick={(e)=>onClickBookMark(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                                                            <BookmarkIcon/>
                                                        </IconButton>
                                                        :
                                                        <IconButton onClick={(e)=>onClickBookMark(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                                                            <BookmarkBorderIcon/>
                                                        </IconButton>
                                                    }
                                                </Box>
                                                <Box sx={{mt:1,mb:0,ml:0.5}}>
                                                        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                            {
                                                                item.activityAreaTag.map((item,index)=>{
                                                                    return(
                                                                        <Box key={index} sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'40px',height:'15px',backgroundColor:'#4F1D76',borderRadius:3,mr:1}}>
                                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'10px',color:'#ffffff'}}>
                                                                                {item.name}
                                                                            </Typography>
                                                                        </Box>
                                                                    )
                                                            })
                                                            }      
                                                        </Box>

                                                        <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',width:'100%'}}>
                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px'}}>
                                                                {item.name}
                                                            </Typography>
                                                            <Box sx={{display:'flex'}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    정기런
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    &nbsp;{'|'}&nbsp;
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                                    {item.regularRun}
                                                                </Typography>
                                                            </Box>

                                                            <Box sx={{display:'flex',mt:-0.5}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    시간
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    &nbsp;{'|'}&nbsp;
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px'}}>
                                                                    {extractSentenceAfterWord(item.regularRun)}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        :
                                        <Grid item xs={8} key={item.id} sx={{display:'flex',justifyContent:'center'}}>
                                            <Box onClick={()=>navigateToCrewDetail(item.id)} sx={{width:'100%',mb:1,display:'flex',flexDirection:'column',alignItems:"start",justifyContent:'center'}}>
                                                <Box sx={{position:'relative',backgroundColor:'#f4f4f4',width:'100%',pb:'100%',overflow:"hidden",borderRadius:'8px'}}>
                                                    <img src={`${API_URL}${item.mainImg}`} style={{position:"absolute",width:"100%",height:"100%",objectFit:'contain',objectPosition:'contain'}}/>
                                                    {
                                                        crewBookMark[item.id]?
                                                        <IconButton onClick={(e)=>onClickBookMark(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                                                            <BookmarkIcon/>
                                                        </IconButton>
                                                        :
                                                        <IconButton onClick={(e)=>onClickBookMark(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                                                            <BookmarkBorderIcon/>
                                                        </IconButton>
                                                    }
                                                </Box>
                                                <Box sx={{mt:1,mb:0,ml:0.5}}>
                                                        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                            {
                                                                item.activityAreaTag.map((item,index)=>{
                                                                    return(
                                                                        <Box key={index} sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'40px',height:'15px',backgroundColor:'#4F1D76',borderRadius:3,mr:1}}>
                                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'10px',color:'#ffffff'}}>
                                                                                {item.name}
                                                                            </Typography>
                                                                        </Box>
                                                                    )
                                                            })
                                                            }      
                                                        </Box>

                                                        <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',width:'100%'}}>
                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px'}}>
                                                                {item.name}
                                                            </Typography>
                                                            <Box sx={{display:'flex'}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    정기런
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    &nbsp;{'|'}&nbsp;
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                                    {item.regularRun}
                                                                </Typography>
                                                            </Box>

                                                            <Box sx={{display:'flex',mt:-0.5}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    시간
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    &nbsp;{'|'}&nbsp;
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px'}}>
                                                                    {extractSentenceAfterWord(item.regularRun)}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    }
                                    </React.Fragment>
                                )
                            })
                        }
                </Grid>
                
            </Box>
            {
                loading?
                    <CircularProgress color="primary" />
                :
                ""
            }
        </Box>    
    )
}