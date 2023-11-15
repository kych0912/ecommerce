import * as React from 'react';
import { useCallback } from 'react';
import Box from '@mui/material/Box';
import {useRecoilState} from 'recoil';
import { InputBase, IconButton,CircularProgress } from '@mui/material';
import { useEffect,useState } from 'react';
import {Avatar} from '@mui/material';
import {API_URL} from "../../../../../API/URL/index"
import SendIcon from '@mui/icons-material/Send';
import { useParams } from "react-router-dom";
import { AddContestChildComment } from '../../../../../API/api/Contest/contest_comment_api';
import styled from "styled-components"

export default function CommentAdder(props) {
    const { id } = useParams();
    const session = localStorage.getItem('sessionid');
    const userProifile = localStorage.getItem("user_profile");

    const [value,setValuse] = useState("");
    const [loading,setLoading] = useState(false);

    const handleOnKeyPress = e=>{
        if(e.key === 'Enter'){
            e.preventDefault();
        }
    }

    const AddComment = async ()=>{
        const data = {
            "postId": id,
            "comment":value,
            "parentId": props.id
        }

        setLoading(true);
        const response = await AddContestChildComment(session,data);

        if(response.response){
            props.setError(response.response.status);
            props.setErrorOpen(true);
        }
        else{
            props.setComment(prev=>prev=[response.comment,...prev]);
            setValuse("");
        }
        
        setLoading(false);
    }

    return (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:"center",minWidth:'360px',maxWidth:'450px',pl:'28px',borderBottom:2,borderColor:'#F6F6F6',py:'12px'}}>
            <Box>
                <Avatar src={`${API_URL}${userProifile}`} sx={{width:'20px',height:'20px',mx:1.5}}/>
            </Box>
            <Box
                sx={{ display: 'flex', alignItems: 'center', width:'100%'}}
                >
                <HeaderInput onChange={(e) => setValuse((prev)=>prev=e.target.value)} value={value} color="#A6A6A6" placeholder={"답글 추가..."}/> 
                {
                    loading?
                    <CircularProgress color="primary" size={'15px'} sx={{p:'5px',mr:2}} />
                    :
                    <IconButton onClick={AddComment} type="button" sx={{ p: '0.5px',mr:2}} aria-label="search">
                        <SendIcon color="primary"/>
                    </IconButton>
                }
            </Box>
        </Box>
    );
}

const HeaderInput = styled.input`
    width:100%;
    font-family:Pretendard Variable;
    font-weight:500;
    font-size:14px;
    border:none;
    outline:none;
`