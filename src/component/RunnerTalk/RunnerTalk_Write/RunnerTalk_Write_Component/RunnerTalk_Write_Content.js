import { useState,useRef,useEffect } from "react";
import { Box } from "@mui/material";
import styled from "styled-components"
import { useRecoilState } from "recoil";
import { RunnerTalk_Write_Content } from "../../../../state/RunnerTalk/RunnerTalk_Write_State";


export default function RunnerTalk_Write_Content_Component(){

    const [content,setContent] = useRecoilState(RunnerTalk_Write_Content);
    
    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    function adjustHeight(textarea) {
        textarea.style.height = 'auto'; // 높이를 초기화하여 내용에 맞게 자동 조절되도록 함
        textarea.style.height = textarea.scrollHeight + 'px'; // 콘텐츠의 높이에 따라 텍스트 영역의 높이 조절
      }

    return(
        <Box sx={{width:"100%",my:1}}>
            <ContentInput
                onChange={onChangeContent} 
                rows="1" 
                color="#A6A6A6" 
                onInput={(e) => { adjustHeight(e.target)}}
                placeholder={"러너님의 러닝라이프를 공유해주세요"}/>   
        </Box>
    )
}

const ContentInput = styled.textarea`
    width:100%;
    min-height:100px;
    resize:none;
    overflow-y:hidden;
    font-family:Pretendard Variable;
    font-weight:500;
    font-size:15px;
    border:none;
    outline:none;
`   