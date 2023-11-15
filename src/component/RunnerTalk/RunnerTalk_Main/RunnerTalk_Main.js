import {Box,Typography,Divider,Skeleton} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from "../../../hoc/auth"
import { useNavigate } from "react-router-dom";
import TopBar from "./RunnerTalk_Main_Component/RunnerTalk_Main_TopBar";
import Filter from "./RunnerTalk_Main_Component/RunnerTalk_Main_Filter"
import Dial from "./RunnerTalk_Main_Component/RunnerTalk_Main_Dial"
import Hot from "./RunnerTalk_Main_Component/RunnerTalk_Main_Hot"
import List from "./RunnerTalk_Main_Component/RunnerTalk_Main_List"
import {Modal} from '@mui/material';
import {useRecoilState} from 'recoil'
import { RunnerTalkMain_FilterLoading,
    RunnerTalkMain_HotLoading,
    RunnerTalkMain_ListLoading,
    RunnerTalkMain_LoadingAll,
    RunnerTalkMain_Error,
    RunnerTalkMain_List
} from '../../../state/RunnerTalk/RunnerTalkMain_State';
import {fetchRunnerTalkAll} from "../../../API/api/RunningTalk/runningTalk_api"
import {fetchPopularTalk} from "../../../API/api/RunningTalk/runningTalk_api"

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

function RunnerTalk(){

    const navigate = useNavigate();
    const loadinglist = [1,2,3,4,5,6,7,8,9];

    const navigateToBack  = () =>{
        navigate(-1);
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack();
    };
    const [loading1,setLoading1] = useRecoilState(RunnerTalkMain_FilterLoading);
    const [loading2,setLoading2] = useRecoilState(RunnerTalkMain_HotLoading);
    const [loading3,setLoading3] = useRecoilState(RunnerTalkMain_ListLoading);
    const [error,setError] = useRecoilState(RunnerTalkMain_Error);
    const [loadingall,setLoadingall] = useRecoilState(RunnerTalkMain_LoadingAll);
    const [list,setList] = useRecoilState(RunnerTalkMain_List);

    const FetchRunnerTalkAll = async () => {
        const RunnerTalk = await fetchRunnerTalkAll("?page="+1);

        if(RunnerTalk.response){
            setError(RunnerTalk.response.status)
            setOpen(true)
        }
        else{
            setList(prev=>prev=RunnerTalk)
        }

        setLoading3(false);
    }

    const LoadingCompilation = () => {
        if(!loading1&&!loading2&&!loading3){
            setLoadingall(false);
        }
    }

    useEffect(() =>{
        window.scrollTo({top:0})
        setLoading1(true);
        setLoading2(true);
        setLoading3(true)
        setLoadingall(true);
        FetchRunnerTalkAll();
    },[])

    useEffect(()=>{
        LoadingCompilation();
    },[loading1,loading2,loading3])

    useEffect(() => {
        return () => {
            setList([])
            setLoading1(true);
            setLoading2(true);
            setLoading3(true)
            setLoadingall(true);
        };
      }, []);
    return(
        <Box sx={{position:'relative',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>
            <TopBar/>
            <Box sx={{position:'relative',width:'90%',mt:'60px'}}>
                <Filter setOpen={setOpen}/>
                
                <Hot setOpen={setOpen}/>
                <Divider/>
                {
                    loadingall?
                    <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column'}}>
                        {loadinglist.map((item,index) =>(
                                <Skeleton key = {index} variant="rectangular" width={'100%'} height={"110px"} sx={{mt:1,borderRadius:2}}/>   
                        ))}
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

export default Auth(RunnerTalk,null);