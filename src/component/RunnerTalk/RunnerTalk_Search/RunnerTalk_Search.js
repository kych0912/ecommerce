import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from "../../../hoc/auth"
import { useNavigate } from "react-router-dom";
import TopBar from "./RunnerTalk_Search_Component/RunnerTalk_Search_TopBar";
import List from "./RunnerTalk_Search_Component/RunnerTalk_Search_List"
import {useLocation} from "react-router-dom"
import {useRecoilState} from 'recoil'
import {Skeleton} from '@mui/material';
import { fetchRunnerTalkSearch } from '../../../API/api/RunningTalk/runningTalk_api';
import {Modal} from '@mui/material';

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


function RunnerTalk_Search(){
    const loadinglist = [1,2,3,4,5,6,7,8];
    const querylocation = useLocation();
    const session = localStorage.getItem("sessionid");

    const navigate = useNavigate();

    const navigateToBack  = () =>{
        navigate(-1);
    }

    const [list,setList] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack();
    };

    const FetchRunningTalkListFunction = async (value) => {
        const _SearchRunningTalk = await fetchRunnerTalkSearch(value,session);
        
        if(_SearchRunningTalk.response){
            setError(_SearchRunningTalk.response.status)
            setOpen(true)
        }
        else{
            setList(prev=>prev=_SearchRunningTalk)
        }

        setLoading(false);
    }

    useEffect(()=>{
        setLoading(true);
    },[])


    useEffect(()=>{
        setLoading(true);
        FetchRunningTalkListFunction(decodeURI(querylocation.search));
    },[decodeURI(querylocation.search)]) 



    return(
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>
            <TopBar />
            <Box sx={{width:'90%',my:'75px'}}>
                {
                    loading?
                    <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column'}}>
                        {loadinglist.map((item,index) =>(
                            <Skeleton key = {index} variant="rectangular" width={'100%'} height={"110px"} sx={{mt:1,borderRadius:2}}/>   
                        ))}
                    </Box>
                    :
                    <Box sx={{width:"100%"}}>
                        {
                            list.length!=0?
                            <List list={list} setList={setList} setError={setError} setOpen = {setOpen}/>
                            :
                            <Box sx={{height:'calc(100vh - 60px)',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px'}}>
                                    존재하지 않습니다 :(
                                </Typography>
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
        </Box>    
    )
}


export default Auth(RunnerTalk_Search,null);