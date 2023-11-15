import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import { useEffect,useState } from 'react';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import {Button,Slider} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {useRecoilState} from 'recoil'
import {
    CrewMain_Location
} from '../../../../../state/Crew/CrewMain_State';

export default function TemporaryDrawer(props) {

    const navigate = useNavigate();
    const [location,setLocation] = useRecoilState(CrewMain_Location);

    const DrawerTheme = {
        width:'100%',
        height:'100%',
        minWidth:'360px',
        maxWidth:'420px',
        borderTopLeftRadius:20,
        borderTopRightRadius:20, 
        backgroundColor:'#ffffff'
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }
        props.setOpen((prev)=>prev=open);
    };
    {/*
        속성마다 Drawer의 버튼 선택 여부 변경
    */}

    const handleToggleLocation = (value) => {
        location.includes(value)?
        setLocation((prev)=>prev=[])
        :
        setLocation((prev)=>prev=[value])
    };

    const navigateToCrewLocatioin = () => {
        navigate(`/crew/location?location=${location[0]}`);
    }

    const list = (anchor) => (
        <Box
        sx={{display:'flex',justifyContent:'center'}}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
        >
            <Box sx={DrawerTheme}>
                <Box sx={{}}>
                    <Box sx={{height:'50px',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'15px'}}>
                            선택해주세요
                        </Typography>
                        <ClearIcon onClick={toggleDrawer(false)} sx={{position:'absolute', right:30}}/>
                    </Box>
                    <Divider/>

                    {/*지역*/}
                    <Box sx={{width:"92%",my:3,mx:'auto'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'13px'}}>
                            지역
                        </Typography>
                        <Box sx={{mt:1.5}}>
                            <Box sx={{display:'flex',width:"100%"}}>
                                {['수도권','경상권','충청권','전라권','제주권'].map((text,index)=>(
                                    <Box key = {index} onClick ={()=>handleToggleLocation(index+1)} backgroundColor={location.includes(index+1)?'#4F1D76':''} sx={{width:"50px",height:'23px',border:1,borderRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center',mr:1,borderColor:'#D9D9D9'}}>
                                        <Typography color = {location.includes(index+1)?'white':'black'} sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px'}}>
                                            {text}
                                        </Typography>
                                    </Box>   
                                ))
                                }
                            </Box>
                        </Box>
                    </Box>
                    <Divider/>

                    {/*하단 버튼*/}
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'92%',mx:'auto',my:1}}>
                        <Button onClick ={()=>{
                                navigateToCrewLocatioin();
                            }} disabled= {!location.length} variant="contained" color='primary' sx={{width:'100%',height:'45px',borderRadius:'7px'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontSize:'15px',fontWeight:700}}>
                                러닝크루 찾기
                            </Typography>
                        </Button>
                    </Box>

                </Box>

            </Box>
        </Box>
    );

    return (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:"center"}}>
            <React.Fragment>
            <Drawer
                PaperProps={{
                    sx: {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    }
                }}
                anchor={'bottom'}
                open={props.open}
                onClose={toggleDrawer(false)}
            >   
                {list()}
            </Drawer>
            </React.Fragment>
        </Box>
    );
}
