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


export default function Shoes_TopBar(props){

    const [value,setValuse] = useState("");

    const [brand, setBrand] = useRecoilState(ShoesFilter_Brand);
    const [feature, setFeature] = useRecoilState(ShoesFilter_Feature);
    const [useage, setUseage] = useRecoilState(ShoesFilter_Useage);
    const [keyword, setKeyword] = useRecoilState(ShoesFilter_Keyword);
    const [price, setPrice] = useRecoilState(ShoesFilter_Price);

    const navigate = useNavigate();

    
    const navigateToBack  = () =>{
        navigate(-1);
    }

    const navigateToShoesMain = () =>{
        navigate('/shoes')
    }
    
    const navigateToShoesSearch = () =>{
        let querybrand = brand.join("%20");
        let queryfeature = feature.join("%20");
        let queryuseage = useage.join("%20");
        let querykeyword = value;

        let minMoney = price[0]*2000;
        let maxMoney = price[1]*2000;

        const queryArray = [querybrand,queryfeature,queryuseage,querykeyword,minMoney,maxMoney];
        const queryKey = ['brand','feature','useage','keyword','min','max'];

        let payload ={}

        for(let i = 0 ; i<6;i++){
            if(queryArray[i] != ""){
                payload[queryKey[i]] = queryArray[i];
            }
        }
        
        props.setSearchState("keyword",(prev)=>prev=value);


        var payloadString = Object.entries(payload).map(e => e.join('=')).join('&');
        navigate("/shoes/search?"+payloadString)
    }

    const FetchValueTextfield = () =>{ 
        setValuse((prev)=>prev = keyword);
    }

    const handleOnKeyPress = e=>{
        if(e.key === 'Enter'){
            e.preventDefault();
            navigateToShoesSearch();
        }
    }

    useEffect(() =>{
        FetchValueTextfield();
    },[props.filterContent])

    return(
        <Box sx={TopbarTheme}>
            <Box onClick = {navigateToShoesMain} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
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