import {Box,Typography,IconButton,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { useParams } from "react-router-dom";
import {runningShoesBookMark} from "../../../../API/api/RunningShoes/shoes_api"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function Shoes_Detail_Title(props){
    const { id } = useParams();
    const session = localStorage.getItem('sessionid');

    const [bookmark,setBookmark] = useState(false);

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const bookMark = async (id) =>{
        const response = await runningShoesBookMark(id,session);
        if(response.response){
            props.setError(response.response.status)
            props.setOpen(true);
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

    useEffect(()=>{
        setBookmark(prev=>prev=props.shoes.bookmarked);
    },[])


    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%',backgroundColor:'#ffffff',borderTopLeftRadius:'20px',borderTopRightRadius:'20px'}}>

            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'90%',pt:2,pb:1}}>
                <Box sx={{display:"flex",flexDirection:'column'}}>
                    <Typography color = "#000000" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px'}}>
                        {props.shoes.brand}
                    </Typography>
                    <Typography color = "#000000" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'18px'}}>
                        {props.shoes.name}
                    </Typography>
                </Box>
                {
                    bookmark?
                    <IconButton color="primary" onClick={()=>onClickBookMart(props.shoes.id)} sx={{}}>
                        <BookmarkIcon sx={{fontSize:35}}/>
                    </IconButton>
                    :
                    <IconButton onClick={()=>onClickBookMart(props.shoes.id)} sx={{}}>
                        <BookmarkBorderIcon sx={{fontSize:35}}/>
                    </IconButton>
                }
            </Box>

            <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',flexDirection:'column',width:'90%',pb:2}}>
                <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                    <Typography color = "#9D9D9D" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px'}}>
                        출시색상
                    </Typography>
                    <Box sx={{display:'flex'}}>
                        {
                            props.shoes.launchColor.map((item,index)=>{
                                return(
                                    <Box key ={index} backgroundColor={item.content} sx={{borderRadius:'50%',width:'15px',height:'15px',mr:1,border:1}}/>
                                )
                            })
                        }
                    </Box>
                </Box>

                <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',mt:0}}>
                    <Typography color = "#9D9D9D" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px'}}>
                        발매가
                    </Typography>
                    <Box sx={{display:'flex'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'18px'}}>
                            {formatNumberWithCommas(props.shoes.price)}원
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>    
    )
}