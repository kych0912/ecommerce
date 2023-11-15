import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import ShareIcon from '@mui/icons-material/Share';
import {API_URL} from "../../../../API/URL/url"

export default function RunnerTalk_Detail_Banner(props){

    useEffect(() =>{
    },[])

    return(
        <Box sx={{position:'relative',zIndex:0,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#4F1D76',flexDirection:'column',width:'100%',height:'300px'}}>
            {
                props.crew?
                    <Box sx={{backgroundImage:`url(${API_URL}${props.crew.mainBanner.mainImg})`,width:'100%',height:'100%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%',backgroundColor:'rgba(0, 0, 0, 0.6)',flexDirection:'column'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'20px',color:"#ffffff"}}>
                                DAY-23
                            </Typography>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'20px',color:"#ffffff",mt:-0.5,mb:'20px'}}>
                                2023 서울 마라톤 대회
                            </Typography>
                            
                        </Box>
                    </Box>
                :
                <Box sx={{backgroundColor:"#4F1D76",width:'100%',height:'100%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
            }
            
        </Box>    
    )
}
