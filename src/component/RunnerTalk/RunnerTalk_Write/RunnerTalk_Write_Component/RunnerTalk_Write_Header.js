import { useState } from "react";
import { Box } from "@mui/material";
import styled from "styled-components"
import { useRecoilState } from "recoil";
import { RunnerTalk_Write_Header } from "../../../../state/RunnerTalk/RunnerTalk_Write_State";


export default function RunnerTalk_Write_Header_Component(){


    const [header,setHeader] = useRecoilState(RunnerTalk_Write_Header);

    const onChangeHeader = (e) => {
        setHeader(e.target.value);
    }

    return(
        <Box sx={{width:"100%",my:1.5}}>
            <HeaderInput onChange={onChangeHeader} color="#A6A6A6" placeholder={"제목을 입력하세요"}/>   
        </Box>
    )
}

const HeaderInput = styled.input`
    width:100%;
    font-family:Pretendard Variable;
    font-weight:700;
    font-size:20px;
    border:none;
    outline:none;
`