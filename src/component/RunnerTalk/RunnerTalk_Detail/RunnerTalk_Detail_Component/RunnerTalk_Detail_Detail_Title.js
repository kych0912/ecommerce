import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';



export default function RunnerTalk_Detail_Detail(props){

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%',backgroundColor:'#ffffff',borderTopLeftRadius:'20px',borderTopRightRadius:'20px',mt:1}}>
            
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'90%'}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'17px'}}>
                    {props.detail.title}
                </Typography>
            </Box>
        </Box>    
    )
}