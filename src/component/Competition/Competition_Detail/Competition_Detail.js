import {Box,Typography,Modal,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from "../../../hoc/auth"
import Banner from "./Competition_Detail_Component/Competition_Detail_Banner"
import Title from "./Competition_Detail_Component/Competition_Detail_Title"
import TopBar from "./Competition_Detail_Component/Competition_Detail_TopBar"
import {Divider} from '@mui/material';
import { useNavigate } from "react-router-dom";
import Detail from "./Competition_Detail_Component/Competition_Detail_Detail"
import Course from "./Competition_Detail_Component/Competition_Detail_Course"
import Image from "./Competition_Detail_Component/Competition_Detail_Image"
import Navbar from './Competition_Detail_Component/Competition_Detail_Navbar';
import {
    CompetitionSchedule_Comment,
    CompetitionSchedule_Comment_Order
} from "../../../state/Competition/CompetitionSchedule_State"
import Skeleton from '@mui/material/Skeleton';
import Comment from "./Competition_Detail_Component/Competition_Detail_Comment"
import { useParams } from "react-router-dom";
import { UpdateContestView,fetchContestDetail } from '../../../API/api/Contest/contest_api';
import { FetchContestCommentPopular } from '../../../API/api/Contest/contest_comment_api';
import axios from 'axios';
import { useRecoilState } from 'recoil';

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



function Competition_Detail(){

    const { id } = useParams();
    const session = localStorage.getItem('sessionid');

    const navigate = useNavigate();

    const navigateToBack  = () =>{
        navigate(-1);
    }

    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");
    const [comment,setComment] = useRecoilState(CompetitionSchedule_Comment);
    const [commentOrder,setCommentOrder] = useRecoilState(CompetitionSchedule_Comment_Order);
    const [contest,setContest] = useState({});

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack();
    };

    const FetchContest = async () => {
        let [_ContestDetail,_Comment] = await axios.all([fetchContestDetail(id,session),FetchContestCommentPopular(id,session)]);

        if(_ContestDetail.response||_Comment.response){
            setError(_ContestDetail.response?_ContestDetail.response.status:_Comment.response.status)
            setOpen(true);
        }
        else{
            setContest(_ContestDetail);
            setComment(prev=>prev=_Comment);
        }

        setLoading(false);
    }
    
    useEffect(()=>{
        window.scrollTo({top:0})
        setLoading(true);
        FetchContest();

        const session = window.localStorage.getItem("sessionid");
        UpdateContestView(session,id);
    },[])


    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%'}}>
            
            <Box sx={{width:'100%'}}>
                {
                    loading?
                    <Box sx={{position:'fixed',width:'100%',width:"100%",backgroundColor:'#4F1D76',maxWidth:"450px",minWidth:"360px"}}>
                        <Skeleton variant="rectangular" width={'100%'} height={"300px"} sx={{position:'relative',zIndex:-1}}/>
                    </Box>
                    :
                    <Box sx={{width:"100%"}}>
                    {
                        contest&&comment?
                        <Box sx={{width:"100%",height:"300px",position:"fixed",maxWidth:"450px",minWidth:"360px"}}>
                            <TopBar competition={contest}/>
                            <Banner competition={contest}/>
                        </Box>
                        :
                        <Box sx={{position:'fixed',width:'100%',height:'300px',backgroundColor:'#4F1D76'}}>
                        </Box>
                    }
                    </Box>
                }
                <Box sx={{position:'relative',display:"flex",flexDirection:"column",justifyContent:"start",alignItems:"center",mt:'-30px',zIndex:1,backgroundColor:"#ffffff",borderTopLeftRadius:'20px',borderTopRightRadius:'20px',mb:10,mt:"270px"}}>
                    {
                        loading? 
                        <Box sx={{width:"100%",height:"600px",mb:1}}>
                            <Skeleton variant="rectangular" width={'100%'} height={"100%"} sx={{borderTopLeftRadius:'20px',borderTopRightRadius:'20px',pb:11}}/>
                        </Box>
                        :
                        <Box sx={{width:"90%",display:"flex",justifyContent:"center"}}>
                            {
                                contest&&comment?
                                <Box sx={{width:"100%"}}>
                                    <Title competition = {contest}/>
                                    <Divider sx={{color:"#F6F6F6",border:2}}/>

                                    <Detail competition = {contest}/>
                                    <Divider sx={{color:"#F6F6F6",border:2}}/> 
                                
                                    <Course competition = {contest}/>
                                    <Divider sx={{color:"#F6F6F6",border:2}}/>

                                    <Image competition = {contest}/>
                                    <Divider sx={{color:"#F6F6F6",border:2,mt:'24px',mb:'19px'}}/>
                                    
                                    <Comment setError = {setError} setOpen={setOpen}/>
                                    
                                    
                                    <Navbar competition = {contest}/>
                                </Box>
                                :
                                <Box sx={{width:'100%',height:"500px",display:'flex',justifyContent:"center",alignItems:"center"}}>
                                    error
                                </Box>
                            }

                        </Box>   
                    }
                </Box>
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
        </Box>    
    )
}

export default Auth(Competition_Detail,null);