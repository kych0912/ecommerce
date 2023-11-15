import {Box,Typography,Divider,Backdrop, CircularProgress} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from "../../../hoc/auth"
import { useNavigate } from "react-router-dom";
import TopBar from "./RunnerTalk_Write_Component/RunnerTalk_Write_TopBar";
import { fetchRunnerTalkCategory } from '../../../API/api/RunningTalk/runningTalk_api';
import {Modal} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Drawer from "./RunnerTalk_Write_Component/RunnerTalk_Write_Drawer"
import Header from "./RunnerTalk_Write_Component/RunnerTalk_Write_Header"
import Content from "./RunnerTalk_Write_Component/RunnerTalk_Write_Content"
import SetImage from "./RunnerTalk_Write_Component/RunnerTalk_Write_Image"
import {useRecoilState} from 'recoil';
import {
    RunnerTalk_Write_Category,
    RunnerTalk_Write_Content,
    RunnerTalk_Write_Header,
    RunnerTalk_Write_Image,
} from '../../../state/RunnerTalk/RunnerTalk_Write_State';


import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';

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

    const navigateToBack  = () =>{
        navigate(-1);
    }

    const [loading,setLoading] = useState(true);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack();
    };

    const FetchRunnerTalkCategoryFunction = async () => {
        const _Category = await fetchRunnerTalkCategory();



        if(_Category.response){
            setError(_Category.response.status)
            setErrorOpen(true)
        }
        else{
            setCategory(prev=>prev=_Category)
        }

        setLoading(false);
    }

    const [errorOpen, setErrorOpen] = React.useState(false);
    const [error,setError] = useState("");
    const [category,setCategory] = useState([]);
    //카테고리 이름
    const [checkCategory,setCheckCategory] = useRecoilState(RunnerTalk_Write_Category);

    const [Base64s, setBase64s] = useRecoilState(RunnerTalk_Write_Image);

    const deleteImage = (index) =>{
        setBase64s(Base64s.filter((_,i)=>i!==index));
    }

    useEffect(() =>{
        window.scrollTo({top:0})
        FetchRunnerTalkCategoryFunction();
    },[])

    const onSubmit = (data) => {
        data["images"] = Base64s;
        console.log(data);
    }

    useEffect(() => {
        return () => {
            setCheckCategory("");
            setBase64s([]);
        };
      }, [])


    return(
        <Box sx={{position:'relative',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>
            <TopBar setError = {setError} setErrorOpen={setErrorOpen} setLoading = {setLoading}/>
           
            <Box sx={{width:"95%",mb:'70px'}}>

                {
                    loading?
                    <Backdrop
                        sx={{ color: '#fff', zIndex:1000 }}
                        open={true}
                        >
                        <CircularProgress color="primary" />
                    </Backdrop>
                    :
                    <Drawer category ={category} setCheckCategory={setCheckCategory} open={open} setOpen={setOpen}/>
                }

                <Box onClick={handleOpen} sx={{width:"100%"}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',my:2}}>
                        {checkCategory?checkCategory:"주제를 선택해주세요"}
                    </Typography>

                    <Divider sx={{color:"#EDEDED",wdith:"100%"}}/>
                </Box>

                <Header/>                   

                <Content/>

                <Box sx={{width:"100%",my:1}}>
                    {
                        Base64s.length !==0?
                        <Swiper
                            spaceBetween={5}
                            modules={[FreeMode]}
                            slidesPerView={'auto'}
                            freeMode={{enabled: true}}	// 추가
                        >
                            {
                                Base64s.map((item,index)=>{
                                    return(
                                        <SwiperSlide key={index} className='shoes left-margin-0'>
                                            <CancelIcon onClick={()=>deleteImage(index,setBase64s,Base64s)} color = "primary" sx={{position:'absolute',top:0,right:0,zIndex:10}}/>
                                            <Box sx={{position:"relative",width:'100%',display:'flex',alignItems:"center",flexDirection:"column",alignItems:"start"}}>
                                                <Box sx={{position:'relative'}}>
                                                    <Box sx={{width:'170px',height:'170px',backgroundColor:'#4F1D76',borderRadius:3,mx:'auto',backgroundImage:`url(${item})`,backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
                                                </Box>
                                            </Box>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                        :
                        ""
                    }
                </Box>

            </Box>
            
            <Box>   
                <Modal
                    open={errorOpen}
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
            
            <SetImage setBase64s={setBase64s} Base64s={Base64s} />
        </Box>    
    )
}

export default Auth(RunnerTalk,null);
