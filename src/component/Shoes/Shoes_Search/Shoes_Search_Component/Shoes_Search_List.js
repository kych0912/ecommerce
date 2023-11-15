import {Box,Typography,Grid,IconButton} from '@mui/material';
import React, { useState,useCallback } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useLocation} from "react-router-dom"
import { useInView } from "react-intersection-observer"
import {CircularProgress} from '@mui/material';
import {API_URL} from "../../../../API/URL/index"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {useRecoilState} from 'recoil'
import {
    ShoesList,
    ShoesSearch_Error,
} from '../../../../state/Shoes/ShoesSearch_State';
import {ShoesMain_ShoesBookMark} from "../../../../state/Shoes/ShoesMain_State"
import { fetchSearchShoes,runningShoesBookMark } from '../../../../API/api/RunningShoes/shoes_api';


export default function Shoes_Search_List(props){


    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const navigate = useNavigate();
    const querylocation = useLocation();
    const session = localStorage.getItem("sessionid");
    
    const [error,setError] = useRecoilState(ShoesSearch_Error);
    const [list,setList] = useRecoilState(ShoesList);
    const [ref, inView] = useInView();
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [shoesBookmark,setShoesBookmark] = useRecoilState(ShoesMain_ShoesBookMark);  
    
    const getItems = useCallback(async () => {
        const query = querylocation.search

        const decodeUri = decodeURI(query);
        setLoading(true);

        let _ShoesList = "";
    
        if(decodeUri === ""){
            _ShoesList = await fetchSearchShoes("?page="+page,session);
        }
        else{
            _ShoesList = await fetchSearchShoes(decodeUri+"&page="+page,session);
        }
        console.log(_ShoesList)

        if(_ShoesList.response){
            setError(_ShoesList.response.status)
            props.setOpen(true);
        }
        else{
            setList((prev)=>[...prev,..._ShoesList])
        }

        setLoading(false);
    }, [page])

    const bookMark = async (id) =>{
        const response = await runningShoesBookMark(id,session);
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
            setShoesBookmark((prev)=>({...prev,[id]:!shoesBookmark[id]}))
        }
    }


    const navigateToShoesDetail =(id) =>{
        navigate(`/shoes/detail/${id}`);
    }

    useEffect(() => {
        getItems();
    }, [getItems])

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !loading) {
            setPage(prevState => prevState + 1)
        }
    }, [inView])

    useEffect(()=>{
        for(const item of list){
            setShoesBookmark((prev)=>({...prev,[item.id]:item.bookmarked}))
        }
    },[list])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%',mb:8,mt:'50px'}}>
            <Box sx={{width:"100%"}}>
                
                <Grid container spacing={1} columns={16} >
                        {
                            list.map((item,index)=>{
                                return(
                                    <React.Fragment key = {index}>
                                    {
                                        list.length-1===index?
                                        <Grid item xs={8} key={item.id} sx={{display:'flex',justifyContent:'center'}}>
                                           <Box ref={ref} onClick={()=>navigateToShoesDetail(item.id)} sx={{width:'100%',mb:1,display:'flex',flexDirection:'column',alignItems:"start",justifyContent:'center'}}>
                                                <Box sx={{position:'relative',backgroundColor:'#f4f4f4',width:'100%',pb:'100%',overflow:"hidden",borderRadius:'8px'}}>
                                                    <img src={`${API_URL}${!item.shoesImg.length?null:item.shoesImg[0].url}`}  style={{position:"absolute",width:"100%",height:"100%",objectFit:'contain',objectPosition:'contain'}}/>
                                                    {
                                                        shoesBookmark[item.id]?
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
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                        {item.brand}
                                                    </Typography>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                        {item.koreanName}
                                                    </Typography>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                        {formatNumberWithCommas(item.price)}{"원"}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        :
                                        <Grid item xs={8} key={item.id} sx={{display:'flex',justifyContent:'center'}}>
                                            <Box ref={ref} onClick={()=>navigateToShoesDetail(item.id)} sx={{width:'100%',mb:1,display:'flex',flexDirection:'column',alignItems:"start",justifyContent:'center'}}>
                                                <Box sx={{position:'relative',backgroundColor:'#f4f4f4',width:'100%',pb:'100%',overflow:"hidden",borderRadius:'8px'}}>
                                                    <img src={`${API_URL}${!item.shoesImg.length?null:item.shoesImg[0].url}`}  style={{position:"absolute",width:"100%",height:"100%",objectFit:'contain',objectPosition:'contain'}}/>
                                                    {
                                                        shoesBookmark[item.id]?
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
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                        {item.brand}
                                                    </Typography>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                        {item.koreanName}
                                                    </Typography>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                        {formatNumberWithCommas(item.price)}{"원"}
                                                    </Typography>
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