import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from "../../../hoc/auth"
import { useNavigate } from "react-router-dom";
import {useLocation} from "react-router-dom"
import TopBar from "./Crew_Location_Component/Crew_Location_TopBar";
import List from "./Crew_Location_Component/Crew_Location_List"
import Title from "./Crew_Location_Component/Crew_Location_Title"
import Dial from "./Crew_Location_Component/Crew_Location_Dial"
import Image from "./Crew_Location_Component/Crew_Location_Image"
import {useRecoilState} from 'recoil'
import {Skeleton} from '@mui/material';
import {
    CrewLocation_List,
    CrewLocation_Loading,
    CrewLocation_Error,
    CrewLocation_Location
} from '../../../state/Crew/CrewLocation_State';
import { fetchCrewLocation } from '../../../API/api/RunningCrew/crew_api';
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


function Crew_Location(){
    const session = localStorage.getItem("sessionid");
    const loadinglist = [1,2,3,4,5,6,7,8];
    const locationMap = {
        1:"captial",
        2:'chungcheong',
        3:'gangwon',
        4:'jeolla',
        5:'gyeongsang',
    }

    const navigate = useNavigate();
    const querylocation = useLocation();

    const navigateToBack  = () =>{
        navigate('/crew');
    }

    const [loading,setLoading] = useRecoilState(CrewLocation_Loading);
    const [error,setError] = useRecoilState(CrewLocation_Error);
    const [open, setOpen] = React.useState(false);
    const [list,setList] = useRecoilState(CrewLocation_List);
    const [location,setLocation] = useRecoilState(CrewLocation_Location);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack();
    };

    const getQuery =() =>{
        const query = querylocation.search;
        const decodeUri = decodeURI(query);

        const searchParams = new URLSearchParams(decodeUri);
        setLocation((prev)=> prev = [Number(searchParams.get('location'))]); 
    }

    const getItems = async (value) =>{
        //const _CrewList = await fetchCrewAll("?page="+page);
        const _CrewList = await fetchCrewLocation(locationMap[value],session);

        if(_CrewList.response){
            setError(_CrewList.response.status)
            setOpen(true);
        }
        else{
            setList(prev=>prev=_CrewList)
        }
        setLoading(prev=>prev=false);
    }

    useEffect(()=>{
        window.scrollTo({top:0})
        setLoading(true);
        getQuery();
        
        const query = querylocation.search;
        const decodeUri = decodeURI(query);
        const searchParams = new URLSearchParams(decodeUri);

        getItems(Number(searchParams.get('location')));
    },[])

    useEffect(()=>{
        setLoading(true);

        const query = querylocation.search;
        const decodeUri = decodeURI(query);
        const searchParams = new URLSearchParams(decodeUri);

        getItems(Number(searchParams.get('location')));
    },[decodeURI(querylocation.search)]) 

    useEffect(()=>{
        console.log(loading)
    },[loading])

    return(
        <Box sx={{position:'relative',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>
            <TopBar/>
            
            <Box sx={{width:'90%',mb:8,mt:'70px'}}>
                <Image/>
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
                            list.length!==0?
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


export default Auth(Crew_Location,null);