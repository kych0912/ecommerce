import * as React from 'react';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import { useEffect,useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { API_URL } from '../../../../API/URL/url';

//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';

export default function RunnerTalk_Detail_Image(props) {

    const [current,setCurrent] = useState(0);
    const [OfficialImg,setOfficialImg] = useState([]);


    const handleToggle = (index) =>{
        setCurrent((prev)=>prev=index);
    }

    useEffect(()=>{
        console.log(props.detail)
        setOfficialImg(props.detail.courseImgs);
    },[])

    return (
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%'}}>
            <Box sx={{width:'100%',pt:2}}>
                <Swiper
                    spaceBetween={0}
                    modules={[FreeMode]}
                    slidesPerView={'auto'}
                    freeMode={{enabled: true}}	// 추가
                >
                    {
                        props.detail.images.map((item,index)=>{
                            return(
                                <SwiperSlide key={index} className="swiper-left-margin-16">
                                    <Box sx={{width:'100%'}}>
                                        <Box sx={{width:'280px',height:'280px',backgroundColor:'#4F1D76',borderRadius:3,mx:'auto',backgroundImage:`url(${API_URL}${item.img})`,backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
                                    </Box>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </Box>
        </Box>
    );
}