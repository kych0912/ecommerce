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
    CompetitionFilter_Course,
    CompetitionFilter_Location,
    CompetitionFilter_Month,
    CompetitionFilter_Keywords,
} from '../../../../state/Competition/CompetitionSearch_State';


export default function Competition_TopBar(props){

    const [value,setValuse] = useState("");


    const [month, setMonth] = useRecoilState(CompetitionFilter_Month);
    const [course, setCourse] = useRecoilState(CompetitionFilter_Course);
    const [location, setLocation] = useRecoilState(CompetitionFilter_Location);
    const [keyword, setKeyword] = useRecoilState(CompetitionFilter_Keywords);


    const navigate = useNavigate();

    const navigateToScheduleMain = () =>{
        navigate('/schedule')
    }

    const navigateToCompetitionSearch = () =>{
        let querymonth = month.join("%20");
        let querycourse = course.join("%20");
        let querylocation = location.join("%20");
        let querykeyword = value;


        console.log(props.filterContent)

        const queryArray = [querymonth,querycourse,querylocation,querykeyword];
        const queryKey = ['month','course','location','keyword'];

        let payload ={}

        for(let i = 0 ; i<4;i++){
            if(queryArray[i] != ""){
                payload[queryKey[i]] = queryArray[i];
            }
        }

        setKeyword((prev)=>prev=value);


        var payloadString = Object.entries(payload).map(e => e.join('=')).join('&');
        navigate("/schedule/search?"+payloadString)
    }
    
    const FetchValueTextfield = () =>{
        setValuse((prev)=>prev = keyword);
    }

    const handleOnKeyPress = e=>{
        if(e.key === 'Enter'){
            e.preventDefault();
            navigateToCompetitionSearch();
        }
    }

    useEffect(() =>{
        FetchValueTextfield();
    },[keyword])

    return(
        <Box sx={TopbarTheme}>
            <Box onClick = {navigateToScheduleMain} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <IconButton type="button" sx={{ }} aria-label="search">
                    <WestIcon sx={{}}/>
                </IconButton>
            </Box>

            <Box
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width:'90%',backgroundColor:'#f4f4f4',borderRadius:'10px' }}
                >
                <InputBase
                    onKeyDown={handleOnKeyPress}
                    onChange={(e) => setValuse((prev)=>prev=e.target.value)}
                    value = {value}
                    sx={{ ml: 1, flex: 1,fontFamily: 'Pretendard Variable',fontWeight:500 }}
                    placeholder="풀코스, 10K, 하프"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton onClick = {navigateToCompetitionSearch} type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Box>
        </Box>    
    )
}