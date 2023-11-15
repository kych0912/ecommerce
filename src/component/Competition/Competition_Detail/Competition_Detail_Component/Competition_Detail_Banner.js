import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import ShareIcon from '@mui/icons-material/Share';
import {API_URL} from "../../../../API/URL/url"

export default function Competition_Detail_Banner(props){

    useEffect(() =>{
    },[])

    return(
        <Box sx={{position:'relative',zIndex:0,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#4F1D76',flexDirection:'column',width:'100%',height:'300px'}}>
            {
                props.competition?
                    <Box sx={{backgroundImage:`url(${API_URL}${props.competition.mainBanner.mainBanner})`,width:'100%',height:'100%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'contain'}}>
                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%',flexDirection:'column'}}>
                            
                            
                        </Box>
                    </Box>
                :
                <Box sx={{backgroundColor:"#4F1D76",width:'100%',height:'100%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
            }
            
        </Box>    
    )
}
