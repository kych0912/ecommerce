import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';

export default function Crew_Detail_Title(props){

    useEffect(() =>{
        
        
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%',height:'80px',backgroundColor:'#ffffff',borderTopLeftRadius:'20px',borderTopRightRadius:'20px'}}>
            
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'start',flexDirection:'column',width:'90%',pt:2,pb:1}}>
                <Typography color = {"#4F1D76"} sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'12px'}}>
                    {props.crew.runningPlace}
                </Typography>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'20px',mt:0.5}}>
                    {props.crew.name}
                </Typography>
            </Box>
        </Box>    
    )
}