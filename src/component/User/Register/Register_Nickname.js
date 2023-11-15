import {Box,Typography,Button,Input} from '@mui/material';
import React, { useState } from "react";
import Auth from '../../../hoc/auth'
import { styled } from '@mui/system';
import { useNavigate } from "react-router-dom";
import {useRecoilState} from 'recoil';
import {
    User_NickName
} from '../../../state/User/UserLogin_State';
import WestIcon from '@mui/icons-material/West';

function Login(){

    const navigate = useNavigate();
    const [nickName,setNickName] = useRecoilState(User_NickName);

    const navigateToRegisterCrew =() =>{
        navigate("/register/crew");
    }

    const handleNickName = (e) =>{
        setNickName(e.target.value);
    }

    const navigateToBack = () =>{
        navigate(-1);
    }

    return(
      <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'100vh',flexDirection:'column',pl:2}}>
        
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'start',width:'100%',maxWidth:'420px',minWidth:'360px',height:'80px'}}>
            <Box onClick = {navigateToBack} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <WestIcon sx={{}}/>
            </Box>
        </Box>

        <Box sx={{width:'100%',pt:3}}>
            <Typography color = "#4F1D76" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'28px'}}>
                환영합니다!
            </Typography>
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'28px',mt:3}}>
                러너님을
            </Typography>
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'28px'}}>
                어떻게 불러드리면 될까요?
            </Typography>
        </Box>
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',flexDirection:'column',pt:2,width:'100%'}}>
            <Box sx={{display:'flex',width:'100%',mt:5,position:'relative',alignItems:'center'}}>
                <Input value = {nickName} placeholder="10자 내로 입력해주세요." onChange={handleNickName} sx={{width:'100%',mr:2,fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'23px'}}/>
                <Box sx={{position:'absolute',right:'20px',display:'flex',alignItems:'center',height:'100%',mr:2}}>
                    <Typography color = "#C4C9CF" sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'23px'}}>
                        {nickName.length}{"/10"}
                    </Typography>
                </Box>  
            </Box>
        </Box>
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column', position:"absolute",bottom:30,minWidth:'360px',maxWidth:'420px',mr:2,width:"100%"}}>
            <Button onClick={navigateToRegisterCrew} variant="contained" color='primary' disabled={!nickName} sx={{width:'90%',height:'50px',borderRadius:3}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontSize:'19px',fontWeight:'500'}}>
                    다음
                </Typography>
            </Button>
        </Box>
      </Box>    
    )
}

export default Auth(Login,false);