import * as React from 'react';
import { useCallback } from 'react';
import Box from '@mui/material/Box';
import {useRecoilState} from 'recoil';
import { InputBase, IconButton,CircularProgress } from '@mui/material';
import { useEffect,useState } from 'react';
import {Avatar} from '@mui/material';
import {API_URL} from "../../../../API/URL/index"
import SendIcon from '@mui/icons-material/Send';
import { useParams } from "react-router-dom";
import { AddRunningTalkComment } from '../../../../API/api/RunningTalk/runningTalk_comment_api';
import {
  RunnerTalkDetail_Comment,
} from "../../../../state/RunnerTalk/RunnerTalk_Comment_State"

export default function CommentAdder(props) {
    const { id } = useParams();
    const session = localStorage.getItem('sessionid');
    const userProifile = localStorage.getItem("user_profile");

    const [value,setValuse] = useState("");
    const [loading,setLoading] = useState(false);
    const [comment,setComment] = useRecoilState(RunnerTalkDetail_Comment);

    const handleOnKeyPress = e=>{
        if(e.key === 'Enter'){
            e.preventDefault();
        }
    }

    const AddComment = async ()=>{
        const data = {
            "postId": id,
            "comment":value
        }

        setLoading(true);
        const response = await AddRunningTalkComment(session,data);

        if(response.response){
            props.setError(response.response.status);
            props.setOpen(true);
        }
        else{
            setComment(prev=>prev=[response.comment,...prev]);
            setValuse("");
        }
        
        setLoading(false);
    }

    useEffect(()=>{
      setComment(prev=>prev=props.detail.comments);
      console.log(comment)
    },[])

    return (
        <Box sx={{ position: 'fixed',display:"flex",justifyContent:"start",alignItems:"center", bottom: 0, left: '50%', right: 0,width:'100%',minWidth:'360px',maxWidth:'420px',transform:'translate(-50%,0)',zIndex:2,py:1 }} elevation={0}>
            <Box>
                <Avatar src={`${API_URL}${userProifile}`} sx={{width:'20px',height:'20px',mx:1.5}}/>
            </Box>
            <Box
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width:'100%',mr:2,backgroundColor:'#f4f4f4',borderRadius:3 }}
                >
                <InputBase

                    onKeyDown={handleOnKeyPress}
                    onChange={(e) => setValuse((prev)=>prev=e.target.value)}
                    value = {value}
                    sx={{ ml: 1, flex: 1,fontFamily: 'Pretendard Variable',fontWeight:500 }}
                    placeholder="댓글 추가..."
                    inputProps={{ 'aria-label': 'Add comment' }}
                />
                {
                    loading?
                    <CircularProgress color="primary" size={'25px'} sx={{p:'5px'}} />
                    :
                    <IconButton onClick={AddComment} type="button" sx={{ p: '5px' }} aria-label="search">
                        <SendIcon color="primary"/>
                    </IconButton>
                }
            </Box>
        </Box>
    );
}
