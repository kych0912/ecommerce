import {Box,Typography,IconButton,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {API_URL} from "../../../API/URL/url"
import Skeleton from '@mui/material/Skeleton';
import { fetchPopularClothes} from '../../../API/api/Clothes/clothes_api';
import { shoesList } from '../../../style/plate/ShoesList';

import './style.css';

import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';


export default function Clothes(props){
    const loadingcomponent =[1,2,3,4,5,6];

    const [clothes,setClothes] = useState([]);

    const FetchList = async () => {
        const _PopularCLothes = await fetchPopularClothes();
    
        if(_PopularCLothes.error){
            props.setError(_PopularCLothes.error)
            props.setOpen(true)
        }
        else{
            setClothes(_PopularCLothes);
        }
        
        props.setLoading2(false);
    }

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }

    const navigate = useNavigate();

    const navigateToShoesDetail =(index) =>{
        navigate(`/clothes/detail/${index}`)
    }

    const navigateToClothes = () =>{
        navigate(`/clothes`)
    }
    
    useEffect(() =>{
        FetchList();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%',my:'22px'}}>

            {/*상단제목*/}
            <Box sx={{width:'90%'}}>
                <Box sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <Box>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px'}}>
                            Most Popular
                        </Typography>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',color:'#8E8D8D'}}>
                            인기 상품
                        </Typography>
                    </Box>
                    <Typography onClick={navigateToClothes} sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',color:'#8E8D8D'}}>
                        <Link style={{ textDecoration: 'none', color:'#9D9D9D' }}>
                            더보기 {'>'}
                        </Link>
                    </Typography>
                </Box>
            </Box>

            {
                props.loadingall?
                <Box sx={{width:'95%',pt:2,height:'250px'}}>
                    <Swiper
                        spaceBetween={8}
                        modules={[FreeMode]}
                        slidesPerView={'auto'}
                        freeMode={{enabled: true}}	// 추가
                    >
                        {loadingcomponent.map((item,index)=>{
                            return(
                            <SwiperSlide key ={index} className="shoes">
                                <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',width:'100%',height:'100%',flexDirection:'column'}}>
                                    <Skeleton variant="rectangular" width={'100%'} height={"100%"} sx={{mt:1,borderRadius:2}}/>
                                </Box>
                            </SwiperSlide>   
                            )
                        })}
                    </Swiper>
                </Box>
                :
                <Box sx={{width:"100%",display:"flex",justifyContent:"end",pt:2}}>
                    {
                        clothes?
                        <Box sx={{width:'95%'}}>
                            <Swiper
                                spaceBetween={8}
                                modules={[FreeMode]}
                                slidesPerView={'auto'}
                                freeMode={{enabled: true}}	// 추가
                            >
                                {
                                    clothes.map((item,index)=>{
                                        return(
                                            <SwiperSlide key={index} className='shoes'>
                                                <Box onClick={()=>navigateToShoesDetail(item.id)} sx={{width:'100%',height:'250px'}}>
                                                    <Box sx={{position:'relative',backgroundColor:'#f4f4f4',borderRadius:'8px'}}>
                                                        <img src={`${API_URL}/api/file/${item.mainImg}`} onerror="this.style.display='none'" style={{width:'170px',height:'170px',objectFit:'cover',objectPosition:'center',px:1,borderRadius:'8px'}}/>
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