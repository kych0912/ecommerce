import {Box,Typography,Avatar,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { API_URL } from '../../../../API/URL';

export default function RunnerTalk_Detail_Detail(props){
    function timeForToday(value) {
        const today = new Date();
        const timeValue = new Date(value);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${betweenTimeDay}일전`;
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%',backgroundColor:'#ffffff',borderTopLeftRadius:'20px',borderTopRightRadius:'20px'}}>
            
            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'90%'}}>
                <Box sx={{height:'100%'}}>
                    <Avatar src={`${API_URL}${props.detail.user_profile}`} sx={{width:'37px',height:'37px',mr:1.5}}/>
                </Box>
                <Box sx={{display:'flex',flexDirection:'column'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',mt:0.5}}>
                        {props.detail.user}
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px',color:'#A6A6A6'}}>
                        {timeForToday(props.detail.created)}
                    </Typography>
                </Box>
            </Box>
        </Box>    
    )
}