import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from "../../../hoc/auth"
import { useNavigate } from "react-router-dom";
import TopBar from "./Crew_Main_Component/Crew_Main_TopBar";
import List from "./Crew_Main_Component/Crew_Main_List"
import Title from "./Crew_Main_Component/Crew_Main_Title"
import Dial from "./Crew_Main_Component/Crew_Main_Dial"
import {useRecoilState} from 'recoil'
import {Skeleton} from '@mui/material';
import {
    CrewMain_List,
    CrewMain_Loading,
    CrewMain_Error,
    CrewMain_Location
} from '../../../state/Crew/CrewMain_State';
import { fetchCrewAll } from '../../../API/api/RunningCrew/crew_api';
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


function Crew_Main(){
    const loadinglist = [1,2,3,4,5,6,7,8];
    const sessionid = localStorage.getItem("sessionid");

    const navigate = useNavigate();

    const navigateToBack  = () =>{
        navigate(-1);
    }

    const [loading,setLoading] = useRecoilState(CrewMain_Loading);
    const [error,setError] = useRecoilState(CrewMain_Error);
    const [location,setLocatioin] = useRecoilState(CrewMain_Location)
    const [open, setOpen] = React.useState(false);
    const [list,setList] = useRecoilState(CrewMain_List);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack();
    };

    const getItems = async () =>{
        const _CrewList = await fetchCrewAll("",sessionid);

        if(_CrewList.response){
            setError(_CrewList.response.status)
            setOpen(true);
        }
        else{
            setList(prev=>prev=_CrewList)
        }
        setLoading(false);
    }

    useEffect(()=>{
        setLoading(true);
        getItems();
        window.scrollTo({top:0});
    },[])

    useEffect(() => {
        // 컴포넌트가 마운트되었을 때 실행될 함수
    
        return () => {
          // 컴포넌트가 언마운트되기 전에 실행될 함수 (클린업 함수)
            setLocatioin([]);
            setList([]);
          // ...
        };
      }, []);

    return(
        <Box sx={{position:'relative',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>
            <TopBar/>
            
            <Box sx={{width:'93%',mb:8,mt:'70px'}}>
                <Title/>
                {
                    loading?
                    <Box sx={{width:'100%',display:'flex',justifyContent:"center"}}>
                        <Box sx={{display:'flex',flexDirection:'column',width:"50%",alignItems:"center"}}>
                            {loadinglist.slice(0, Math.ceil(loadinglist.length / 2)).map((item, index) => (
                            <Box key={index} sx={{width:"100%",display:'flex',justifyContent:'center',alignItems:"center"}}>
                                <Skeleton variant="rectangular" width={'170px'} height={"240px"} sx={{mt:1,borderRadius:2}}/>   
                            </Box>
                            ))}
                        </Box>
                        <Box sx={{display:'flex',flexDirection:'column',width:'50%'}}>
                            {loadinglist.slice(Math.ceil(loadinglist.length / 2)).map((item, index) => (
                            <Box key={index} sx={{width:"100%",display:'flex',justifyContent:'center',alignItems:"center"}}>
                                <Skeleton variant="rectangular" width={'170px'} height={"240px"} sx={{mt:1,borderRadius:2}}/>   
                            </Box>
                            ))}
                        </Box>
                    </Box>
                    :
                    <Box sx={{width:"100%"}}>
                        {
                            list.length!=0?
                            <List setOpen = {setOpen}/>
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


export default Auth(Crew_Main,null);