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

const MoneySlider = styled(Slider)(({ theme }) => ({
    height: 2,
    padding: '15px 0',
    '& .MuiSlider-valueLabel': {
      fontSize: 12,
      fontWeight: 700,
      top: 45,
      backgroundColor: 'unset',
      color: theme.palette.text.primary,
      '&:before': {
        display: 'none',
      },
      '& *': {
        background: 'transparent',
        color: theme.palette.text.primary,
      },
    },
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-rail': {
      opacity: 1,
      backgroundColor: '#bfbfbf',
    },
    '& .MuiSlider-mark': {
      backgroundColor: '#bfbfbf',
      height: 8,
      width: 1,
      '&.MuiSlider-markActive': {
        opacity: 1,
        backgroundColor: 'currentColor',
      },
    },
  }));

  function valueLabelFormat(value) {
    const units = ['만원', '만원 이상'];
  
    let unitIndex = 0;
    let scaledValue = value;
  
    scaledValue /= 5;

    if (scaledValue >= 20) {
        unitIndex += 1;
    }
  
    return `${scaledValue}${units[unitIndex]}`;
  }

export default function TemporaryDrawer(props) {

    const navigate = useNavigate();

    const [brand, setBrand] = useState([]);
    const [feature, setFeature] = useState([]);
    const [useage, setUseage] = useState([]);
    const [keyword, setKeyword] = useState([]);
    const [price, setPrice] = useState([0,100]);

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
        console.log(props.open)
    };

    const minDistance = 5;
    const maxDistance = 100;

    function valuetext(value) {
        return `${value}원`;
      }

    const handleChange2 = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return;
      }
  
      if (newValue[1] - newValue[0] < minDistance) {
        if (activeThumb === 0) {
          const clamped = Math.min(newValue[0], maxDistance - minDistance);
          setPrice([clamped, clamped + minDistance]);
        } else {
          const clamped = Math.max(newValue[1], minDistance);
          setPrice([clamped - minDistance, clamped]);
        }
      } else {
        setPrice(newValue);
      }
    };

    {/*
        속성마다 Drawer의 버튼 선택 여부 변경
    */}

    const handleToggleBrand = (value) => {
        !brand.includes(value)
        ? setBrand(((brand) => [...brand, value]))
        : setBrand((brand.filter((button) => button !== value)));
    };

    const handleToggleFeature = (value) => {
        !feature.includes(value)
        ? setFeature(((feature) => [...feature, value]))
        : setFeature((feature.filter((button) => button !== value)));
    };

    const handleToggleUseage = (value) => {
        !useage.includes(value)
        ? setUseage(((useage) => [...useage, value]))
        : setUseage((useage.filter((button) => button !== value)));
    };

    {/*
        queryString으로 검색
    */}

    const navigateToShoesSearch = () =>{
        let querybrand = brand.join("%20");
        let queryfeature = feature.join("%20");
        let queryuseage = useage.join("%20");
        let querykeyword = keyword;
        let minMoney = price[0]*2000;
        let maxMoney = price[1]*2000;

        const queryArray = [querybrand,queryfeature,queryuseage,querykeyword,minMoney,maxMoney];
        const queryKey = ['brand','feature','useage','keyword','min','max'];

        let payload ={}

        for(let i = 0 ; i<6;i++){
            if(queryArray[i] != ""){
                payload[queryKey[i]] = queryArray[i];
            }
        }

        console.log(payload)

        var payloadString = Object.entries(payload).map(e => e.join('=')).join('&');
        props.setOpen(false)

        props.setQuery(payloadString)
    }


    const list = (anchor) => (
        <Box
        sx={{display:'flex',justifyContent:'center'}}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
        >
            <Box sx={DrawerTheme}>
                <Box sx={{height:'580px'}}>
                    <Box sx={{height:'50px',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'15px'}}>
                            필터
                        </Typography>
                        <ClearIcon onClick={toggleDrawer(false)} sx={{position:'absolute', right:30}}/>
                    </Box>
                    <Divider/>

                    {/*브랜드*/}
                    <Box sx={{width:"92%",height:'100px',mx:'auto'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'13px',mt:2}}>
                        브랜드
                        </Typography>
                        <Box sx={{mt:1}}>
                            <Box sx={{display:'flex',width:"100%"}}>
                                {['Nike','Adidas','New Balance','Hoka'].map((text,index)=>(
                                    <Box key = {index} onClick ={()=>handleToggleBrand(index+1)} backgroundColor={brand.includes(index+1)?'#4F1D76':''}  sx={{width:"auto",height:'23px',border:1,borderRadius:5,display:'flex',justifyContent:'center',alignItems:'center',mr:1,borderColor:'#D9D9D9'}}>
                                        <Typography color = {brand.includes(index+1)?'white':'black'} sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',mx:1}}>
                                            {text}
                                        </Typography>
                                    </Box>   
                                ))
                                }
                            </Box>
                            <Box sx={{display:'flex',width:"100%",mt:1}}>
                                {['Asics','Mizno'].map((text,index)=>(
                                    <Box key = {index+4} onClick ={()=>handleToggleBrand(index+5)} backgroundColor={brand.includes(index+5)?'#4F1D76':''} sx={{width:"auto",height:'23px',border:1,borderRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center',mr:1,borderColor:'#D9D9D9'}}>
                                        <Typography color = {brand.includes(index+5)?'white':'black'} sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',mx:1}}>
                                            {text}
                                        </Typography>
                                    </Box>   
                                ))
                                }
                            </Box>
                        </Box>
                    </Box>
                    <Divider/>

                    {/*특징*/}
                    <Box sx={{width:"92%",height:'100px',mx:'auto'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'13px',mt:2}}>
                            특징
                        </Typography>
                        <Box sx={{mt:1}}>
                            <Box sx={{display:'flex',width:"100%"}}>
                                {['발볼넓은','아치보호','카본플레이트','얇은 소재'].map((text,index)=>(
                                    <Box key = {index} onClick ={()=>handleToggleFeature(index+1)} backgroundColor={feature.includes(index+1)?'#4F1D76':''}  sx={{width:"auto",height:'23px',border:1,borderRadius:5,display:'flex',justifyContent:'center',alignItems:'center',mr:1,borderColor:'#D9D9D9'}}>
                                        <Typography color = {feature.includes(index+1)?'white':'black'} sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',mx:1}}>
                                            {text}
                                        </Typography>
                                    </Box>   
                                ))
                                }
                            </Box>
                            <Box sx={{display:'flex',width:"100%",mt:1}}>
                                {['두꺼운 소재','단단한 쿠션감','푹신한 쿠션감'].map((text,index)=>(
                                    <Box key = {index} onClick ={()=>handleToggleFeature(index+5)} backgroundColor={feature.includes(index+5)?'#4F1D76':''} sx={{width:"auto",height:'23px',border:1,borderRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center',mr:1,borderColor:'#D9D9D9'}}>
                                        <Typography color = {feature.includes(index+5)?'white':'black'} sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',mx:1}}>
                                            {text}
                                        </Typography>
                                    </Box>   
                                ))
                                }
                            </Box>
                        </Box>
                    </Box>
                    <Divider/>

                    {/*용도*/}
                    <Box sx={{width:"92%",height:'80px',mx:'auto'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'13px',mt:2}}>
                            용도
                        </Typography>
                        <Box sx={{mt:1.5}}>
                            <Box sx={{display:'flex',width:"100%"}}>
                                {['단거리','장거리','데일리','훈련','경기','트레일'].map((text,index)=>(
                                    <Box key = {index} onClick ={()=>handleToggleUseage(index+1)} backgroundColor={useage.includes(index+1)?'#4F1D76':''} sx={{width:"50px",height:'23px',border:1,borderRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center',mr:1,borderColor:'#D9D9D9'}}>
                                        <Typography color = {useage.includes(index+1)?'white':'black'} sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px'}}>
                                            {text}
                                        </Typography>
                                    </Box>   
                                ))
                                }
                            </Box>
                        </Box>
                    </Box>
                    <Divider/>

                    {/*가격대*/}
                    <Box sx={{width:"92%",height:'120px',mx:'auto',display:'flex',justifyContent:'center',alignItems:'start',flexDirection:'column'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'13px',mt:2}}>
                            가격대
                        </Typography>
                        <Box sx={{my:1.5,width:"85%",display:'flex',justifyContent:'center',alignItems:'center',mx:'auto'}}>
                            <MoneySlider
                                size='small'
                                value={price}
                                onChange={handleChange2}
                                valueLabelDisplay="on"
                                getAriaValueText={valuetext}
                                valueLabelFormat={valueLabelFormat}
                                disableSwap
                            />
                        </Box>
                    </Box>

                    {/*하단 버튼*/}
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'92%',mx:'auto',mt:1}}>
                        <Button onClick ={()=>{
                            navigateToShoesSearch();
                            }} variant="contained" color='primary' sx={{width:'100%',height:'45px',borderRadius:'7px'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontSize:'15px',fontWeight:700}}>
                                러닝화 찾기
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
                disableScrollLock={ true }
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
