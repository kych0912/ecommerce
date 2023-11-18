import {Box,Typography,Skeleton,IconButton} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Drawer from './Shoes_Main_Drawer';
import { Swiper, SwiperSlide } from "swiper/react";
import { API_URL } from '../../../../API/URL';
import { fetchSearchShoes } from '../../../../API/api/RunningShoes/clothes_api';
import { shoesList } from '../../../../style/plate/ShoesList';

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

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const FetchList = async () => {
        const response = await fetchSearchShoes(query);
    
        if(response.error){
            props.setError(response.error)
            props.setOpen(true)
        }
        else{
            setList(response);
        }
        
        setLoading(false);
    }

    const navigateToShoesDetail =(id) =>{
        navigate(`/clothes/detail/${id}`)
    }

    const openDrawer = () => {
        setOpen(true);
    }

    useEffect(()=>{
        setLoading(true)
        FetchList();
    },[query])

    return(
        <Box sx={{backgroundColor:'#ffffff',display:'flex',justifyContent:'center',alignItems:'center',borderColor:'#E8E8E8',width:'100%',my:3}}>
            {
                query?
                <Box sx={{width:"100%"}}>
                    {/*상단제목*/}
                    <Box sx={{width:'100%'}}>
                        <Box sx={{width:'100%',display:'flex',alignItems:'start',justifyContent:'center',flexDirection:'column'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px'}}>
                                 회원님이 찾으시는 의류
                            </Typography>
                        </Box>
                    </Box>

                    {
                        loading?
                        <Swiper
                            spaceBetween={8}
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
                                        spaceBetween={8}
                                        modules={[FreeMode]}
                                        slidesPerView={'auto'}
                                        freeMode={{enabled: true}}	// 추가
                                    >
                                        {
                                            list.map((item,index)=>{
                                                return(
                                                    <SwiperSlide key={item.id} className='shoes'>
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
                        나를 위한 의류 찾기
                    </Typography>
                </Box>
            }
            <Drawer open = {open} setOpen ={setOpen} setQuery={setQuery}/>
        </Box>    
    )
}