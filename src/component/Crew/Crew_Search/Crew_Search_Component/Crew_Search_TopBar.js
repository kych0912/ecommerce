import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import WestIcon from '@mui/icons-material/West';
import TopbarTheme from '../../../../style/plate/topbar';
import {useRecoilState} from 'recoil'
import {
    ShoesFilter_Brand,
    ShoesFilter_Feature,
    ShoesFilter_Useage,
    ShoesFilter_Keyword,
    ShoesFilter_Price,
} from '../../../../state/Shoes/ShoesSearch_State';


export default function Crew_TopBar(props){

    const [value,setValuse] = useState("");
    const navigate = useNavigate();

    
    const navigateToBack  = () =>{
        navigate(-1);
    }

    const navigateToCrewMain = () =>{
        navigate('/crew')
    }
    
    const navigateToShoesSearch = () =>{
        let payload = {
            "name":value
        }


        var payloadString = Object.entries(payload).map(e => e.join('=')).join('&');
        navigate("/crew/search?"+payloadString)
    }

    const FetchValueTextfield = () =>{ 
        setValuse((prev)=>prev = value);
    }

    const handleOnKeyPress = e=>{
        if(e.key === 'Enter'){
            e.preventDefault();
            navigateToShoesSearch();
        }
    }

    useEffect(() =>{
        FetchValueTextfield();
    },[])

    return(
        <Box sx={TopbarTheme}>
            <Box onClick = {navigateToCrewMain} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <IconButton type="button" sx={{ }} aria-label="search">
                    <WestIcon sx={{}}/>
                </IconButton>
            </Box>

            <Box
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width:'80%',mr:2,backgroundColor:'#f4f4f4',borderRadius:3 }}
                >
                <InputBase
                    onKeyDown={handleOnKeyPress}
                    onChange = {(e) => setValuse((prev)=>prev=e.target.value)}
                    value={value}
                    sx={{ ml: 1, flex: 1,fontFamily: 'Pretendard Variable',fontWeight:500 }}
                    placeholder=""
                />
                <IconButton onClick ={navigateToShoesSearch} type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon/>
                </IconButton>
            </Box>
        </Box>    
    )
}