import {Box,Typography,CircularProgress,Skeleton} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from "../../../hoc/auth"
import { useNavigate } from "react-router-dom";
import TopBar from "./RunnerTalk_Filtering_Component/RunnerTalk_Filtering_TopBar";
import Dial from "./RunnerTalk_Filtering_Component/RunnerTalk_Filtering_Dial"
import Title from "./RunnerTalk_Filtering_Component/RunnerTalk_Filtering_Title"
import List from "./RunnerTalk_Filtering_Component/RunnerTalk_Filtering_List"
import { useParams } from 'react-router-dom';
import {Modal} from '@mui/material';
import {useRecoilState} from 'recoil'
import { RunnerTalkFiltering_FilterLoading,
    RunnerTalkFiltering_ListLoading,
    RunnerTalkFiltering_LoadingAll,
    RunnerTalkFiltering_Error,
    RunnerTalkFiltering_List
} from '../../../state/RunnerTalk/RunnerTalkFiltering_State';
import {fetchRunnerTalkCategoryPost} from "../../../API/api/RunningTalk/runningTalk_api"

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

function RunnerTalk_Filtering(){

    const { id } = useParams();

    const navigate = useNavigate();

    const navigateToBack  = () =>{
        navigate(-1);
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack();
    };
    const [loading1,setLoading1] = useRecoilState(RunnerTalkFiltering_FilterLoading);
    const [loading2,setLoading2] = useRecoilState(RunnerTalkFiltering_ListLoading);
    const [error,setError] = useRecoilState(RunnerTalkFiltering_Error);
    const [loadingall,setLoadingall] = useRecoilState(RunnerTalkFiltering_LoadingAll);
    const [list,setList] = useRecoilState(RunnerTalkFiltering_List);

    const FetchRunnerTalkAll = async (value) => {
        const RunnerTalk = await fetchRunnerTalkCategoryPost(value);

        if(RunnerTalk.response){
            setError(RunnerTalk.response.status)
            setOpen(true)
        }
        else{
            setList(prev=>prev=RunnerTalk)
        }
        setLoading2(false);

    }

    const LoadingCompilation = () => {
        if(!loading1&&!loading2){
            setLoadingall(false);
        }
    }

    useEffect(() =>{
        window.scrollTo({top:0})
        setLoading1(true);
        setLoading2(true);
        setLoadingall(true);
        FetchRunnerTalkAll(id);
    },[])

    useEffect(()=>{
        LoadingCompilation();
    },[loading1,loading2])

    useEffect(()=>{
        console.log(list);
    },[list])

    useEffect(()=>{
        window.scrollTo({top:0})
        setLoading1(true);
        setLoading2(true);
        setLoadingall(true);
        FetchRunnerTalkAll(id);
    },[id])

    useEffect(()=>{
        return(
            () =>{
                setList([]);
            }
        )
    },[])

    return(
        <Box sx={{position:'relative',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>
            <TopBar/>
            <Box sx={{position:'relative',width:'90%',mt:'60px'}}>
                <Title/>
                {
                    loadingall?
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',flexDirection:'column',height:"500px"}}>
                        <CircularProgress color="primary" />
                    </Box>
                    :
                    <Box sx={{width:"100%"}}>

                        {
                            list.length!=0?
                            <List setOpen = {setOpen} />
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
            <Dial/>

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

export default Auth(RunnerTalk_Filtering,null);