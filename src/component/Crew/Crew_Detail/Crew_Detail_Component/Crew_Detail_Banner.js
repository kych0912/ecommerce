import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import ShareIcon from '@mui/icons-material/Share';
import {API_URL} from "../../../../API/URL/url"

export default function Crew_Detail_Banner(props){

    useEffect(() =>{
    },[])

    return(
        <Box sx={{position:'relative',zIndex:0,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#4F1D76',flexDirection:'column',width:'100%',height:'300px'}}>
            {
                props.crew?
                    <Box sx={{backgroundImage:`url(${API_URL}${props.crew.mainImg})`,width:'100%',height:'100%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
                        
                    </Box>
                :
                <Box sx={{backgroundColor:"#4F1D76",width:'100%',height:'100%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
            }
            
        
        </Box>    
    )
}
