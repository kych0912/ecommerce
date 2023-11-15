import {Box,Typography,Button} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../style/fonts/pretendardvariable.css"
import { useNavigate } from "react-router-dom";
import Banner from "./Banner/Banner"
import Competition from "./Main_Competition/Competition"
import Shoes from "./Main_Shoes/Shoes"
import Community from "./Main_Community/Community"
import Crew from './Main_Crew/Crew'
import Auth from "../../hoc/auth"
import {Modal,Divider} from '@mui/material';
import TopBar from "./TopBar/TopBar"

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


function Main(){
    const [loading1,setLoading1] = useState(true);
    const [loading2,setLoading2] = useState(true);
    const [loading3,setLoading3] = useState(true);
    const [loading4,setLoading4] = useState(true);
    const [loadingall,setLoadingall] = useState(true);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack()
    };
    const [error,setError] = useState();

    const navigate = useNavigate();

    const navigateToBack  = () =>{
        navigate("/login/main");
    }


    const LoadingCompilation = () => {
        if(!loading1&&!loading2&&!loading3&&!loading4){
            setLoadingall(false);
        }
    }

    useEffect(() =>{
        setLoading1(true);
        setLoading2(true);
        setLoading3(true);
        setLoading4(true);
        setLoadingall(true);
        window.scrollTo({top:0})
    },[])

    useEffect(()=>{
        LoadingCompilation();
    },[loading1,loading2,loading3,loading4])


    return(
        <Box sx={{width:'100%',display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column'}}>
            <Box sx={{display:'flex',flexDirection:'column',width:"100%",background: 'linear-gradient(to bottom, #4F1D76, rgba(255, 255, 255, 0.26))'}}>
                <TopBar/>
                <Banner/>
            </Box>
            <Box sx={{width:'100%',mb:8,display:'flex',flexDirection:'column',alignItems:"center",jusstifyContent:"center"}}>
                <Divider sx={{width:'90%',border:2,borderColor:"#F6F6F6"}}/>
                <Competition setLoading1={setLoading1} loadingall={loadingall} setError={setError} setOpen={setOpen}/>
                <Divider sx={{width:'90%',border:2,borderColor:"#F6F6F6"}}/>
                <Shoes setLoading2={setLoading2} loadingall={loadingall} setError={setError} setOpen={setOpen}/>
                <Divider sx={{width:'90%',border:2,borderColor:"#F6F6F6"}}/>
                <Community setLoading4={setLoading4} loadingall={loadingall} setError={setError} setOpen={setOpen}/>
                <Divider sx={{width:'90%',border:2,borderColor:"#F6F6F6"}}/>
                <Crew setLoading3={setLoading3} loadingall={loadingall} setError={setError} setOpen={setOpen}/>

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

export default Auth(Main,null)