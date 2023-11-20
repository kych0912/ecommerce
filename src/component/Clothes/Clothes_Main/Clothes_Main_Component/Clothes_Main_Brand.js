import {Box,Typography,IconButton,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { fetchBrandClothes } from '../../../../API/api/Clothes/clothes_api';
import Skeleton from '@mui/material/Skeleton';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { API_URL } from '../../../../API/URL';
import {useRecoilState} from 'recoil';
import {
    ShoesMain_BrandLoading,
    ShoesMain_Error,
    ShoesMain_AllLoading,
    ShoesMain_ShoesBookMark
} from '../../../../state/Shoes/ShoesMain_State';
import { shoesList } from '../../../../style/plate/ShoesList';

import './style.css';

import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";

export default function Shoes_Brand(props){

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const session = localStorage.getItem("sessionid");

    const [brand, setBrand] = useState(0);
    const [brandtags,setBrandTags] = useState(["NIKE","ADIDAS","ARCTERYX","LEE","MIZUNO"]);
    const [loading,setLoading] = useRecoilState(ShoesMain_BrandLoading);
    const [loadingall,setLoadingall] = useRecoilState(ShoesMain_AllLoading);

    const loadinglist = [1,2,3,4,5,6]

    const handleToggleBrand = (value) => {
        if(loading){
            return;
        }
        else{
            setBrand((prev)=>prev=value)   
        }
    };
    

    const navigate = useNavigate();

    const navigateToShoesSearch =(value) =>{
        navigate(`/shoes/search?keyword=${value}`);
    }

    const navigateToShoesDetail =(id) =>{
        navigate(`/clothes/detail/${id}`)
    }


    const [shoes,setShoes] = useState([]);


    const FetchShoesList = async (value) =>{
        const _BrandShoes = await fetchBrandClothes(value);

        if(_BrandShoes.error){
            props.setError(_BrandShoes.error);
            props.setOpen(true);
        }
        else{
            setShoes(_BrandShoes);
        }

        setLoading(false);   
    }

    async function FirstFetchList(){
        const _BrandShoes = await fetchBrandClothes(brandtags[0]);

        if(_BrandShoes.response){
            props.setError(_BrandShoes.response.status);
            props.setOpen(true);
        }
        else{
            setShoes(_BrandShoes);
        }

        setLoading(false);
    }

    useEffect(() =>{
        setLoading(true);
        FirstFetchList();
    },[])

    useEffect(() =>{
        setLoading(true)
        if(brandtags.length === 0){
            return;
        }
        else{
            FetchShoesList(brandtags[brand])
        }
    },[brand])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>

            {/*상단제목*/}
            <Box sx={{width:'100%'}}>
                <Box sx={{width:'100%',display:'flex',flexDirection:"column",justifyContent:"center",alignItems:"start"}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px'}}>
                        Brand
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',color:'#8E8D8D'}}>
                        브랜드 상품
                    </Typography>
                </Box>
            </Box>
            
            {
                loadingall?
                <Box sx={{width:'100%',mt:2,mb:2}}>
                    {/*필터*/}
                    <Swiper
                        spaceBetween={1}
                        modules={[FreeMode]}
                        slidesPerView={'auto'}
                        freeMode={{enabled: true}}	// 추가
                    >
                        {
                            loadinglist.map((item,index)=>{
                                return(
                                    <SwiperSlide key = {item} className="tag-loading">
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
                <Box sx={{width:"100%",mt:2,mb:2}}>
                    {
                        brandtags?
                        <Box sx={{width:'100%'}}>
                            <Swiper
                                spaceBetween={8}
                                modules={[FreeMode]}
                                slidesPerView={'auto'}
                                freeMode={{enabled: true}}	// 추가
                            >
                            
                                {
                                brandtags.map((item,index)=>{
                                    return(
                                        <SwiperSlide key ={index} className='swiper-width-auto'>
                                            <Box onClick = {() =>handleToggleBrand(index)} backgroundColor = {brand === index?'rgba(161, 187, 255, 0.26)':"#E8E8E8"} sx={{height:'22px',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'3px'}}>
                                                <Typography color = {brand === index?"#A1BBFF":"#000000"} sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'16px',mx:1,lineHeight:"19.09px"}}>
                                                    {item}
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
                        spaceBetween={8}
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
                                        spaceBetween={8}
                                        modules={[FreeMode]}
                                        slidesPerView={'auto'}
                                        freeMode={{enabled: true}}	// 추가
                                    >
                                        {
                                            shoes.map((item,index)=>{
                                                return(
                                                    <SwiperSlide className='shoes'>
                                                        <Box onClick={()=>navigateToShoesDetail(item.id)} sx={{width:'100%',height:'250px'}}>
                                                            <Box sx={{position:'relative',backgroundColor:'#f4f4f4',borderRadius:'8px'}}>
                                                                <img src={`${API_URL}/api/file/${item.mainImg}`} onerror="this.style.display='none'" style={{width:'170px',height:'170px',objectFit:'cover',objectPosition:'center',px:1}}/>
                                                            </Box>
                                                            <Box sx={shoesList.shoesDetailBox}>
                                                                <Typography sx={shoesList.shoesDetailBrand}>
                                                                    {item.brand}
                                                                </Typography>
                                                                <Typography sx={shoesList.shoesDetailName}>
                                                                    {item.name}
                                                                </Typography>
                                                                <Typography sx={shoesList.shoesDetailPrice}>
                                                                    {formatNumberWithCommas(item.price)}
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

            {/*더보기 버튼*/}
            {
                loading||loadingall?
                <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column',mt:1}}>
                    <Skeleton variant="rectangular" sx={{borderRadius:'10px',height:'40px',mt:1,width:'100%'}}/>
                </Box>
                :
                <Box sx={{width:"100%"}}>
                    {
                        brandtags.length?
                        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column',mt:1}}>
                            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'10px',height:'40px',mt:1,width:'100%',border:1,color:'#E8E8E8'}}>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'18px',color:'#606060'}}>
                                    더 많은&nbsp;
                                </Typography>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'18px',color:'#000000'}}>
                                    {brandtags[brand]}
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