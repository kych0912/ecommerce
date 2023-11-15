import {Box,Typography,IconButton,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { fetchFeatureShoes,fetchFeatureTag,runningShoesBookMark } from '../../../../API/api/RunningShoes/shoes_api';
import Skeleton from '@mui/material/Skeleton';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { API_URL } from '../../../../API/URL';
import {useRecoilState} from 'recoil';
import {
    ShoesMain_FeatureLoading,
    ShoesMain_Error,
    ShoesMain_AllLoading,
    ShoesMain_ShoesBookMark
} from '../../../../state/Shoes/ShoesMain_State';

import './style.css';

import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";

export default function Shoes_feature(props){

    const session = localStorage.getItem('sessionid');

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }


    const [feature, setFeature] = useState(0);
    const [featuretags,setFeatureTags] = useState([]);
    const [shoes,setShoes] = useState([]);
    const [shoesBookmark,setShoesBookmark] = useRecoilState(ShoesMain_ShoesBookMark);
    const [loading,setLoading] = useRecoilState(ShoesMain_FeatureLoading);
    const [featureloading,setFeatureLoading] = useState(true);
    const [error,setError] = useRecoilState(ShoesMain_Error);
    const [loadingall,setLoadingall] = useRecoilState(ShoesMain_AllLoading);

    const loadinglist = [1,2,3,4,5,6]

    const handleToggleFeature = (value) => {
        if(loading){
            return;
        }
        else{
            setFeature((prev)=>prev=value)   
        }
    };
    

    const navigate = useNavigate();

    const navigateToShoesSearch =(value) =>{
        navigate(`/shoes/search?keyword=${value}`);
    }

    const navigateToShoesDetail =(id) =>{
        navigate(`/shoes/detail/${id}`)
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

    const FetchShoesFeature = async () =>{
        const _FeatureTags = await fetchFeatureTag();

        if(_FeatureTags.response){
            props.setError(_FeatureTags.response.status);
            props.setOpen(true);
        }
        else{
            return _FeatureTags;
        }

        setFeatureLoading(false);
    }


    const FetchShoesList = async (value) =>{
        const _featureShoes = await fetchFeatureShoes(value,session);

        if(_featureShoes.response){
            props.setError(_featureShoes.response.status);
            props.setOpen(true);
        }
        else{
            setShoes((prev)=>prev=_featureShoes);
        }

        setLoading(false);   
    }

    async function FirstFetchList(){
        const _FeatureTags = await FetchShoesFeature();
        const _featureShoes = await fetchFeatureShoes(_FeatureTags[0].name,session);

        if(_FeatureTags.response){
            props.setError(_FeatureTags.response.status);
            props.setOpen(true);
        }
        else if(_featureShoes.response){
            props.setError(_featureShoes.response.status);
            props.setOpen(true);
        }
        else{
            setFeatureTags(_FeatureTags);
            setShoes(_featureShoes);
        }

        setLoading(false); 
        setFeatureLoading(false);
    }

    useEffect(() =>{
        setLoading(true);
        setFeatureLoading(true)
        FirstFetchList();
    },[])

    useEffect(()=>{
        for(const item of shoes){
            setShoesBookmark((prev)=>({...prev,[item.id]:item.bookmarked}))
        }
    },[shoes])


    useEffect(() =>{
        setLoading(true)
        if(featuretags.length === 0){
            return;
        }
        else{
            FetchShoesList(featuretags[feature].name,session)
        }
    },[feature])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>

            {/*상단제목*/}
            <Box sx={{width:'100%'}}>
                <Box sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px',ml:2}}>
                        특징별 러닝화
                    </Typography>
                </Box>
            </Box>
            
            {
                featureloading?
                <Box sx={{width:'100%',mt:2,mb:2}}>
                    {/*필터*/}
                    <Swiper
                        spaceBetween={-6}
                        modules={[FreeMode]}
                        slidesPerView={'auto'}
                        freeMode={{enabled: true}}	// 추가
                    >
                        {
                            loadinglist.map((item,index)=>{
                                return(
                                    <SwiperSlide key = {item} className="tag-loading swiper-left-margin-16">
                                        <Box sx={{width:'100%',height:'22px',display:"flex",alignItems:"center"}}>
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
                        featuretags?
                        <Box sx={{width:'100%',mt:2,mb:2}}>
                            <Swiper
                                spaceBetween={-16}
                                modules={[FreeMode]}
                                slidesPerView={'auto'}
                                freeMode={{enabled: true}}	// 추가
                            >
                            
                                {
                                featuretags.map((item,index)=>{
                                    return(
                                        <SwiperSlide key ={index} className='swiper-width-auto swiper-left-margin-16'>
                                            <Box onClick = {() =>handleToggleFeature(index)} backgroundColor = {feature === index?'#4F1D7642':"#E8E8E8"} sx={{height:'22px',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'3px',mx:0.5}}>
                                                <Typography color = {feature === index?"#4F1D76":"#000000"} sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'16px',mx:1}}>
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

            {
                loading||loadingall?
                <Box sx={{width:"100%"}}>

                    <Swiper
                        spaceBetween={-6}
                        modules={[FreeMode]}
                        slidesPerView={'auto'}
                        freeMode={{enabled: true}}	// 추가
                    >
                        {
                            loadinglist.map((item,index)=>{
                                return(
                                    <SwiperSlide key = {item} className='shoes'>
                                        <Box sx={{width:'100%'}}>
                                            <Skeleton variant="rectangular" width={'100%'} height={"250px"} sx={{borderRadius:3}}/>
                                        </Box>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </Box>
                :
                <Box sx={{width:'100%'}}>
                    {
                        <Box sx={{width:'100%'}}>
                            {
                                shoes.length!=0?
                                    <Swiper
                                        spaceBetween={-10}
                                        modules={[FreeMode]}
                                        slidesPerView={'auto'}
                                        freeMode={{enabled: true}}	// 추가
                                    >
                                        {
                                            shoes.map((item,index)=>{
                                                return(
                                                    <SwiperSlide className='shoes'>
                                                        <Box onClick = {()=>navigateToShoesDetail(item.id)} sx={{width:'100%',display:'flex',alignItems:"center",flexDirection:"column",alignItems:"start"}}>
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
                                                            <Box sx={{display:'flex',flexDirection:'column',ml:1,mt:1,width:"100%"}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px'}}>
                                                                    {item.brand}
                                                                </Typography>
                                                                <Typography sx={{lineHeight:"20px",fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                                    {item.name}
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px'}}>
                                                                    {formatNumberWithCommas(item.price)}{"원"}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </SwiperSlide>
                                                )
                                            })
                                        }
                                    </Swiper>
                                :
                                <Box sx={{height:'250px',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px'}}>
                                        존재하지 않습니다 :(
                                    </Typography>
                                </Box>
                            }
                        </Box>
                    }
                </Box>
            }

            {
                loading||loadingall?
                <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'95%',flexDirection:'column',mt:1}}>
                    <Skeleton variant="rectangular" sx={{borderRadius:'10px',height:'40px',mt:1,width:'100%'}}/>
                </Box>
                :
                <Box sx={{width:"100%"}}>
                    {
                        featuretags.length?
                        <Box onClick={()=>navigateToShoesSearch(featuretags[feature].name)} sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'95%',flexDirection:'column',mt:1}}>
                            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'10px',height:'40px',mt:1,width:'100%',border:1,color:'#E8E8E8'}}>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'18px',color:'#606060'}}>
                                    더 많은&nbsp;
                                </Typography>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'18px',color:'#000000'}}>
                                    {featuretags[feature].name}
                                </Typography>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'18px',color:'#9D9D9D'}}>
                                    &nbsp;보기
                                </Typography>
                            </Box>
                        </Box>
                        :
                        ""
                    }
                </Box>
            }


        </Box>    
    )
}