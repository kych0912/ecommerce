import * as React from 'react';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import { useEffect,useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { API_URL } from '../../../../API/URL/url';

import { Navigation } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";

export default function Competition_Detail_Course(props) {


    const [current,setCurrent] = useState(0);


    const handleToggle = (index) =>{
        setCurrent((prev)=>prev=index);
    }

    useEffect(()=>{
        
    },[])

    return (
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%',mt:'18px',mb:3}}>
            <Box sx={{width:'100%'}}>
                <Typography color = "#4F1D76" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',lineHeight:'21.48px'}}>
                    코스
                </Typography>
            </Box>

            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',mt:'11px',ml:'-2px'}}>
                {
                    props.competition.courseTags.map((item,index)=>{
                        return(
                            <Box key = {index} onClick ={()=>handleToggle(index)} backgroundColor={current===index?'#4F1D76':''}  sx={{border:1,borderRadius:'8px',p:'4px 8px 4px 8px',display:'flex',justifyContent:'center',alignItems:'center',mr:'6px',borderColor:'#E8E8E8'}}>
                                <Typography color = {current===index?'white':"#606060"} sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px',lineHeight:"14.32px"}}>
                                    {item.name}
                                </Typography>
                            </Box>   
                        )
                    })
                }
            </Box>

            {
                props.competition.courseTags[current]?
                <Box sx={{backgroundImage:`url(${API_URL}${props.competition.courseTags[current].map})`,width:'100%',pb:'100%',borderRadius:'8px',mx:'auto',mt:'19px',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'contain',objectFit:"contain"}}/>
                :
                <Box sx={{width:'90%',pb:'90%',borderRadius:3,mx:'auto',mt:1}}/>
            }
            
        </Box>
    );
}