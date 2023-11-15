import {Box,Typography,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import styled from "styled-components"

export default function RunnerTalk_Detail_Detail(props){

    const contentRef = useRef(null);
    const [isShowReadMore, setIsShowReadMore] = useState(false);

    const onClick = (e) => {
        contentRef.current.classList.add("show");
        setIsShowReadMore(false);
    };

    useEffect(()=>{
        if(props.detail.content.length > 40){
            setIsShowReadMore(true);
        }
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%',backgroundColor:'#ffffff',borderTopLeftRadius:'20px',borderTopRightRadius:'20px'}}>
            
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'90%',mb:1}}>
                <Ellipsis ref={contentRef}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px'}}>
                        {props.detail.content}
                    </Typography>
                </Ellipsis>
            </Box>
            <Box sx={{width:"90%",display:'flex',justifyContent:"start",alignItems:"center"}}>
                {isShowReadMore && <Typography onClick={onClick} sx={{maxHeight:'17.9px',lineHeight:"17.9px",fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',color:'#A6A6A6'}}>...자세히 보기</Typography>}
            </Box>
        </Box>    
    )
}

const Ellipsis = styled.div`
  position: relative;
  display: -webkit-box;
  max-height: 17.9px;
  line-height: 17.9px;
  overflow: hidden;
  -webkit-line-clamp: 2;
  &.show {
    display: block;
    max-height: none;
    overflow: auto;
    -webkit-line-clamp: unset;
  }
`;

const Button = styled.button`
    max-height: 17.9px;
    line-height: 17.9px;
    font-color: #4F1D76;
  &.hide {
    display: none;
  }
`;