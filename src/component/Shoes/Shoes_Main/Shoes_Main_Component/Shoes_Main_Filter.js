import {Box,Typography,Skeleton,IconButton} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Drawer from './Shoes_Main_Drawer';
import { Swiper, SwiperSlide } from "swiper/react";
import { API_URL } from '../../../../API/URL';
import { fetchSearchShoes } from '../../../../API/api/RunningShoes/shoes_api';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useRecoilState } from 'recoil';
import {ShoesMain_ShoesBookMark} from "../../../../state/Shoes/ShoesMain_State"
import { runningShoesBookMark, fetchUserName } from '../../../../API/api/RunningShoes/shoes_api';

//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import { set } from 'react-hook-form';



export default function Shoes_Search_Filter(props){

    const loadingList = [1,2,3,4,5,6]

    const session = localStorage.getItem('sessionid');

    const navigate = useNavigate();

    const [open,setOpen] = useState(false);

    const [query,setQuery] = useState("");
    const [loading,setLoading] = useState(true);
    const [list,setList] = useState([]);
    const [shoesBookmark,setShoesBookmark] = useRecoilState(ShoesMain_ShoesBookMark);
    const [userName,setUserName] = useState("");

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const FetchList = async () => {
        const response = await fetchSearchShoes("?"+query,session);
    
        if(response.response){
            props.setError(response.response.status)
            props.setOpen(true)
        }
        else{
            setList(response);
        }
        
        setLoading(false);
    }

    const bookMark = async (id) =>{
        const response = await runningShoesBookMark(id,session);

        if(response.response){
            props.setError(response.response.status)
            props.setOpen(true);
            return false;
        }
        else{
            return true;
        }
    }

    const onClickBookMart = (id,event) =>{
        event.stopPropagation();
        if(bookMark(id)){
            setShoesBookmark((prev)=>({...prev,[id]:!shoesBookmark[id]}))
        }
    }

    const FetchUserName = async () => {
        const _UserName = await fetchUserName(session);

        if(_UserName.response){
            props.setError(_UserName.response.status)
            props.setOpen(true)
        }
        else{
            setUserName(prev=>prev=_UserName)
        }
    }

    const navigateToShoesDetail =(id) =>{
        navigate(`/shoes/detail/${id}`)
    }

    const openDrawer = () => {
        setOpen(true);
    }

    useEffect(()=>{
        setLoading(true)
        FetchList();
    },[query])

    useEffect(()=>{
        FetchUserName();
    },[])


    useEffect(()=>{
        for(const item of list){
            setShoesBookmark((prev)=>({...prev,[item.id]:item.bookmarked}))
        }
    },[list])

    return(
        <Box sx={{backgroundColor:'#ffffff',display:'flex',justifyContent:'center',alignItems:'center',borderColor:'#E8E8E8',width:'100%',my:3}}>
            {
                query?
                <Box sx={{width:"100%"}}>
                    {/*상단제목*/}
                    <Box sx={{width:'100%'}}>
                        <Box sx={{width:'100%',display:'flex',alignItems:'start',justifyContent:'center',flexDirection:'column'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px',ml:2}}>
                                {`${userName} `} 러너님을 위한 러닝화
                            </Typography>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px',color:'#9D9D9D',ml:2,mb:1,mt:0.5}}>
                                러너님을 위한 러닝화에요
                            </Typography>
                        </Box>
                    </Box>

                    {
                        loading?
                        <Swiper
                            spaceBetween={-6}
                            modules={[FreeMode]}
                            slidesPerView={'auto'}
                            freeMode={{enabled: true}}	// 추가
                        >
                            {
                                loadingList.map((item,index)=>{
                                    return(
                                        <SwiperSlide key = {item} className='shoes'>
                                            <Box sx={{width:'100%',height:'200px'}}>
                                                <Skeleton variant="rectangular" width={'100%'} height={"100%"} sx={{borderRadius:3}}/>
                                            </Box>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                        :
                        <Box sx={{width:'100%'}}>
                            {
                                list?
                                <Box sx={{width:'100%',pt:1}}>
                                    <Swiper
                                        spaceBetween={-10}
                                        modules={[FreeMode]}
                                        slidesPerView={'auto'}
                                        freeMode={{enabled: true}}	// 추가
                                    >
                                        {
                                            list.map((item,index)=>{
                                                return(
                                                    <SwiperSlide key={item.id} className='shoes'>
                                                        <Box onClick = {()=>navigateToShoesDetail(item.id)} sx={{width:'100%'}}>
                                                        
                                                        <Box sx={{position:'relative',backgroundColor:'#f4f4f4',borderRadius:'8px'}}>
                                                                <img src={`${API_URL}${!item.shoesImg.length?null:item.shoesImg[0].url}`} style={{width:'170px',height:'170px',objectFit:'contain',objectPosition:'center'}}/>
                                                                {
                                                                    shoesBookmark[item.id]?
                                                                    <IconButton onClick={(e)=>onClickBookMart(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                                                                        <BookmarkIcon/>
                                                                    </IconButton>
                                                                    :
                                                                    <IconButton onClick={(e)=>onClickBookMart(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                                                                        <BookmarkBorderIcon/>
                                                                    </IconButton>
                                                                }
                                                            </Box>
                                                            
                                                            <Box sx={{display:'flex',flexDirection:'column',ml:1,mt:1}}>
                                                                <Typography sx={{lineHeight:"20px",fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                                    {item.brand}
                                                                </Typography>
                                                                <Typography sx={{lineHeight:"20px",fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                                    {item.koreanName}
                                                                </Typography>
                                                                <Typography sx={{lineHeight:"20px",fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px'}}>
                                                                    {formatNumberWithCommas(item.price)}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </SwiperSlide>
                                                )
                                            })
                                        }
                                    </Swiper>
                                </Box>
                                :
                                <Box sx={{width:"100%",height:'250px',pt:1}}>
                                    error
                                </Box>
                            }
                        </Box>    
                    }
                </Box>
                :
                <Box onClick={openDrawer} sx={{width:"100%",height:"100px",borderRadius:'8px',backgroundColor:'#F6F6F6',display:"flex",justifyContent:'center',alignItems:"center"}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'24px'}}>
                        나를 위한 러닝화 찾기
                    </Typography>
                </Box>
            }
            <Drawer open = {open} setOpen ={setOpen} setQuery={setQuery}/>
        </Box>    
    )
}