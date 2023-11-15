import {Box,Typography,Modal,CircularProgress} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from "../../../hoc/auth"
import Banner from "./RunnerTalk_Detail_Component/RunnerTalk_Detail_Banner"
import Title from "./RunnerTalk_Detail_Component/RunnerTalk_Detail_Title"
import TopBar from "./RunnerTalk_Detail_Component/RunnerTalk_Detail_TopBar"
import {Divider} from '@mui/material';
import { useNavigate } from "react-router-dom";
import User from "./RunnerTalk_Detail_Component/RunnerTalk_Detail_User"
import Navbar from './RunnerTalk_Detail_Component/RunnerTalk_Detail_Navbar';
import DetailContent from "./RunnerTalk_Detail_Component/RunnerTalk_Detail_Content"
import Image from "./RunnerTalk_Detail_Component/RunnerTalk_Detail_Image"
import DetailTitle from "./RunnerTalk_Detail_Component/RunnerTalk_Detail_Detail_Title"
import Comment from "./RunnerTalk_Detail_Component/RunnerTalk_Detail_Comment"
import { useParams } from "react-router-dom";
import {fetchRunnerTalkCPostDetail,UpdateRunningTalkView} from "../../../API/api/RunningTalk/runningTalk_api"
import axios from 'axios';
import { useRecoilState } from 'recoil';
import {RunnerTalkDetail_Comment, RunnerTalkDetail_Comment_Order} from "../../../state/RunnerTalk/RunnerTalk_Comment_State"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



function RunnerTalk_Detail(){

    const { id } = useParams();
    const session = localStorage.getItem('sessionid');

    const navigate = useNavigate();

    const devComment =  [
        {
            "id": 1,
            "user": 4,
            "parent": null,
            "post": 1,
            "comment": "124124412",
            "user_profile": "/media/detailDetailImages/KakaoTalk_20230807_222625438_07.jpg",
            "created": "2023-10-10T13:31:17.236"
        },
        {
            "id": 2,
            "user": 4,
            "parent": 1,
            "post": 1,
            "comment": "7o79",
            "user_profile": "/media/None.png",
            "created": "2023-10-10T13:34:29.348"
        },
        {
            "id": 2,
            "user": 4,
            "parent": 1,
            "post": 1,
            "comment": "7o79",
            "user_profile": "/media/None.png",
            "created": "2023-10-10T13:34:29.348"
        },
        {
            "id": 2,
            "user": 4,
            "parent": 1,
            "post": 1,
            "comment": "7o79",
            "user_profile": "/media/None.png",
            "created": "2023-10-10T13:34:29.348"
        },
        {
            "id": 2,
            "user": 4,
            "parent": 1,
            "post": 1,
            "comment": "7o79",
            "user_profile": "/media/None.png",
            "created": "2023-10-10T13:34:29.348"
        },
        {
            "id": 2,
            "user": 4,
            "parent": 1,
            "post": 1,
            "comment": "7o79",
            "user_profile": "/media/None.png",
            "created": "2023-10-10T13:34:29.348"
        },
        {
            "id": 2,
            "user": 4,
            "parent": 1,
            "post": 1,
            "comment": "7o79",
            "user_profile": "/media/None.png",
            "created": "2023-10-10T13:34:29.348"
        },
        
    ]

    const navigateToBack  = () =>{
        navigate(-1);
    }

    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");
    const [open, setOpen] = React.useState(false);
    const [detail,setDetail] = useState({});
    const [comment,setComment] = useRecoilState(RunnerTalkDetail_Comment);
    const [commentOrder,setCommentOrder] = useRecoilState(RunnerTalkDetail_Comment_Order);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack();
    };

    const FetchDetail = async () => {
        const [_RunnerTalkDetail] = await axios.all([fetchRunnerTalkCPostDetail(id,session)]);
        
        console.log(_RunnerTalkDetail)

        if(_RunnerTalkDetail.response){
            setError(_RunnerTalkDetail.response?_RunnerTalkDetail.response.status:"")
            setOpen(true);
        }
        else{
            setDetail(_RunnerTalkDetail);
            setComment(prev=>prev=_RunnerTalkDetail.comments);
        }

        setLoading(false);
    }
    
    useEffect(()=>{
        window.scrollTo({top:0})
        setLoading(true);
        FetchDetail();

        UpdateRunningTalkView(session,id);
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%'}}>
            <TopBar detail={detail}/>
            <Box sx={{width:'100%',mb:10,mt:'60px'}}>
                {
                    loading?
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',flexDirection:'column',height:"500px"}}>
                        <CircularProgress color="primary" />
                    </Box>
                    :
                    <Box sx={{width:"100%"}}>
                    {
                        detail!=0?
                        <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                            {
                                detail!=0?
                                <Box sx={{width:"100%"}}>
                                    <Title detail = {detail}/>
                                    <User detail = {detail}/>
                                    <Box sx={{width:"100%"}}>
                                        <DetailTitle detail = {detail}/>
                                        <DetailContent detail = {detail}/>
                                        {
                                            detail.images.length!==0?
                                            <Image detail={detail}/>
                                            :
                                            ""
                                        }
                                    </Box>
                                        
                                    <Comment detail={detail} setError = {setError} setOpen={setOpen}/>
                                </Box>
                                :
                                <Box sx={{width:'100%',height:"500px",display:'flex',justifyContent:"center",alignItems:"center"}}>
                                    error
                                </Box>
                            }
                        </Box>   
                        :
                        <Box sx={{width:'100%',height:'300px',backgroundColor:'#4F1D76'}}>
                        </Box>
                    }
                    </Box>
                }
            </Box>

            <Box>
                <Modal
                    open={open}
                    onClose={handleClose}
                    disableScrollLock
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {error}
                    </Typography>
                    
                    </Box>
                </Modal>
            </Box>

            <Navbar detail ={detail} setError = {setError} setOpen={setOpen}/>
        </Box>    
    )
}

export default Auth(RunnerTalk_Detail,null);