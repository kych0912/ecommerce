import {Box,Typography,IconButton} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import WestIcon from '@mui/icons-material/West';
import {runningCrewBookMark} from "../../../../API/api/RunningCrew/crew_api"

const TopbarTheme = {
    position:'fixed',
    top:0,
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'transparent',
    height:'60px',
    width:'100%',
    minWidth:'360px',
    maxWidth:'420px',
    zIndex:1000
}


export default function Crew_Detail_TopBar(props){

    const session = localStorage.getItem('sessionid');

    const navigate = useNavigate();
    const [bookmark,setBookmark] = useState(false);

    const navigateToBack = () =>{
        navigate(-1);
    }

    const bookMark = async (id) =>{
        const response = await runningCrewBookMark(id,session);
        if(response.response){
            return false;
        }
        else{
            return true;
        }
    }

    const onClickBookMart = (id) =>{
        if(bookMark(id)){
            setBookmark(prev=>prev=!bookmark);
        }
    }

    useEffect(() =>{
        setBookmark(prev=>prev=props.crew.bookmarked)
    },[])

    return(
        <Box sx={TopbarTheme}>
            <Box onClick = {navigateToBack} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <IconButton type="button" sx={{color:'white' }} aria-label="search">
                    <WestIcon sx={{ml:2}}/>
                </IconButton>
            </Box>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                {
                    bookmark?
                    <IconButton onClick={(e)=>onClickBookMart(props.crew.id,e)} sx={{color:'white'}}>
                        <BookmarkIcon sx={{mr:2}}/>
                    </IconButton>
                    :
                    <IconButton onClick={(e)=>onClickBookMart(props.crew.id,e)} sx={{color:'white'}}>
                        <BookmarkBorderIcon sx={{mr:2}}/>
                    </IconButton>
                }
            </Box>
        </Box>    
    )
}