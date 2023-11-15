import {Box,Typography,Button,Input,CircularProgress} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from '../../../hoc/auth';
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import Topbar from "./Shoes_Add_Component/Shoes_Add_TopBar"
import CancelIcon from '@mui/icons-material/Cancel';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import {Modal} from '@mui/material';
import { useForm } from "react-hook-form"
import {useRecoilState} from 'recoil';
import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';

import "./style.css"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transForm: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
    display: 'inline-block',
    cursor: 'pointer'
  });

function AddShoes(){

    const {
        register,
        handleSubmit
      } = useForm()

    const inputList = [
        ["name",'러닝화 이름','러닝화 이름을 입력해주세요'],
        ["brand",'러닝화 브랜드','NIKE'],
        ["etc",'기타 원하시는 정보',''],
    ]

    const imageInputRef = useRef(null);

    const [modalOpen, setModalOpen] = React.useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    const [error,setError] = useState();
    const [loading,setLoading] = useState(false);

    const [Base64s, setBase64s] = useState([]);

    const [CompetitionBase64s, setCompetitionBase64s] = useState([]);

    const encodeFileToBase64 = (image) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);    
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
        });
    };
    
    const handleImageUpload = async (e,callback) => {
        
        const fileArr = e.target.files;
        callback([]);
    
        let file;
        let maxFile = 10;
        let filesLength = fileArr.length > maxFile ? maxFile : fileArr.length;
    
        if (fileArr.length > maxFile) {
            alert(`한번에 업로드 가능한 사진은 최대 ${maxFile}장 까지 입니다.`);
        }
    
        for (let i = 0; i < filesLength; i++) {
            file = fileArr[i];

            console.log(file);
    
            if (file.type !== "image/jpeg" && file.type !== "image/jpg") {
                alert(`JPG 사진 파일만 가능합니다.`);
                break;
            } else {
                try {
                    const data = await encodeFileToBase64(file);
                    callback((prev) => [...prev, data ]);
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };
    
    const handleImageUploadWithCallBackCourse = async (e) => {
        handleImageUpload(e,setBase64s);
    }

    const handleImageUploadWithCallBackMain = async (e) => {
        handleImageUpload(e,setCompetitionBase64s);
    }


    const deleteImage = (index,setBase64,Base64) =>{
        setBase64(Base64.filter((_,i)=>i!==index));
    }


    const onSubmit = (data) => {
        data["images"] = Base64s;
        data["mainImage"] = CompetitionBase64s;
    }

    return(
      <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column'}}>
        
        <Topbar/>
        
        <Box sx={{width:'93%',mt:2}}>
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px'}}>
                원하시는 러닝화가 있으신가요 ?
            </Typography>
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:"#9D9D9D",mt:-0.5}}>
                여러 테스트를 거쳐 러닝화 정보가 업로드 됩니다.
            </Typography>
        </Box>
        

        <Form onSubmit={handleSubmit(onSubmit)}>
            {
                inputList.map((item,index)=>{
                    return(
                        <Box sx={{display:'flex',width:'100%',flexDirection:"column",mt:3}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px'}}>
                                {item[1]}
                            </Typography>
                            <Input {...register(item[0],{ required: true })} placeholder={item[2]} sx={{width:'100%',fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px'}}/>   
                        </Box>

                    )
                })
            }  
            {/* 
            <Box sx={{display:'flex',width:'100%',flexDirection:"column",mt:3}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px'}}>
                    {"코스 이미지"}
                </Typography>
                
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

                <Label for="input-file">
                    <InsertPhotoOutlinedIcon sx={{width:'30px',height:'30px'}}/>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px'}}>
                        이미지 첨부하기
                    </Typography> 
                </Label>

                <VisuallyHiddenInput
                id="input-file"
                multiple   
                name="photo_file"
                accept=".jpg"
                onChange={handleImageUploadWithCallBackCourse}
                type="file"
                 />
            </Box>

            <Box sx={{display:'flex',width:'100%',flexDirection:"column",mt:3}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px'}}>
                    {"대회 공식 이미지"}
                </Typography>
                
                <Box sx={{width:"100%",my:1}}>
                    {
                        CompetitionBase64s.length !==0?
                        <Swiper
                            spaceBetween={5}
                            modules={[FreeMode]}
                            slidesPerView={'auto'}
                            freeMode={{enabled: true}}	// 추가
                        >
                            {
                                CompetitionBase64s.map((item,index)=>{
                                    return(
                                        <SwiperSlide key={index} className='shoes left-margin-0'>
                                            <CancelIcon onClick={()=>deleteImage(index,setCompetitionBase64s,CompetitionBase64s)} color = "primary" sx={{position:'absolute',top:0,right:0,zIndex:10}}/>
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

                <Label for="input-file-main">
                    <InsertPhotoOutlinedIcon sx={{width:'30px',height:'30px'}}/>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px'}}>
                        이미지 첨부하기
                    </Typography> 
                </Label>

                <VisuallyHiddenInput
                id="input-file-main"
                multiple   
                name="photo_file"
                accept=".jpg"
                onChange={handleImageUploadWithCallBackMain}
                type="file"
                 />
            </Box> */}

            <Button type = "submit" variant="contained" color="primary" sx={{width:'100%',height:'40px',borderRadius:'10px',boxShadow:0,my:2}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'16px'}}>
                    러닝화 등록 요청
                </Typography>
            </Button>
        </Form> 

        {
            loading?
            <Box sx={{position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',pr:2}}>
                <CircularProgress color="primary"/>
            </Box>
            :
            ""
        }




        <Box>
            <Modal
                open={modalOpen}
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

const Form = styled.form`
  width:93%;
  display:'flex';
  justify-content:'space-between';
  align-items:'start';
  flex-direction:'column';
  padding-top:2;

`

const Label = styled.label`
    width:100%;
    height:100px;
    border-radius:10px;
    background-color:#E8E8E8;
    margin-top:1.5;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`


export default AddShoes;