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

export default function TemporaryDrawer(props) {

    const navigate = useNavigate();

    const [brand, setBrand] = useState([]);
    const [feature, setFeature] = useState([]);

    const brandList = ["NIKE","ADIDAS","ARCTERYX","LEE","MIZUNO"]
    const CategoryList = [
        {
            "name":"신발",
            "query":'shoes'
        },
        {
            "name":"자켓",
            "query":'jacket'
        },
        {
            "name":"셔츠",
            "query":'shirt'
        },
        {
            "name":"하의",
            "query":'pants'
        }

    ]

    const DrawerTheme = {
        width:'100%',
        height:'100%',
        minWidth:'360px',
        maxWidth:'450px',
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

    {/*
        속성마다 Drawer의 버튼 선택 여부 변경
    */}

    const handleToggleBrand = (value) => {
        !brand.includes(value)
        ? setBrand(((brand) => [value]))
        : setBrand((brand.filter((button) => button !== value)));
    };

    const handleToggleFeature = (value) => {
        !feature.includes(value)
        ? setFeature(((feature) => [value]))
        : setFeature((feature.filter((button) => button !== value)));
    };

    {/*
        queryString으로 검색
    */}

    const navigateToShoesSearch = () =>{
        let querybrand = brand.map((index)=>brandList[index]);
        let querycategory = feature.map((index)=>CategoryList[index].query);

        const queryArray = [querybrand,querycategory];
        const queryKey = ['brand','category'];

        let payload ={}

        for(let i = 0 ; i<2;i++){
            if(queryArray[i].length){
                payload[queryKey[i]] = queryArray[i];
            }
        }

        var payloadString = Object.entries(payload).map(e => e.join('=')).join('&');
        props.setOpen(false)

        props.setQuery(prev=>prev=payloadString)
    }


    const list = (anchor) => (
        <Box
        sx={{display:'flex',justifyContent:'center'}}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
        >
            <Box sx={DrawerTheme}>
                <Box sx={{height:'320px'}}>
                    <Box sx={{height:'50px',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'15px'}}>
                            필터
                        </Typography>
                        <ClearIcon onClick={toggleDrawer(false)} sx={{position:'absolute', right:30}}/>
                    </Box>
                    <Divider/>

                    {/*브랜드*/}
                    <Box sx={{width:"92%",height:'80px',mx:'auto'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'13px',mt:2}}>
                        브랜드
                        </Typography>
                        <Box sx={{mt:1}}>
                            <Box sx={{display:'flex',width:"100%"}}>
                                {["NIKE","ADIDAS","ARCTERYX","LEE","MIZUNO"].map((text,index)=>(
                                    <Box key = {index} onClick ={()=>handleToggleBrand(index)} backgroundColor={brand.includes(index)?'#A1BBFF':''}  sx={{width:"auto",height:'23px',border:1,borderRadius:5,display:'flex',justifyContent:'center',alignItems:'center',mr:1,borderColor:'#D9D9D9'}}>
                                        <Typography color = {brand.includes(index)?'white':'black'} sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',mx:1}}>
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
                    <Box sx={{width:"92%",height:'80px',mx:'auto'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'13px',mt:2}}>
                            특징
                        </Typography>
                        <Box sx={{mt:1}}>
                            <Box sx={{display:'flex',width:"100%"}}>
                                {["신발","자켓","셔츠","하의"].map((text,index)=>(
                                    <Box key = {index} onClick ={()=>handleToggleFeature(index)} backgroundColor={feature.includes(index)?'#A1BBFF':''}  sx={{width:"auto",height:'23px',border:1,borderRadius:5,display:'flex',justifyContent:'center',alignItems:'center',mr:1,borderColor:'#D9D9D9'}}>
                                        <Typography color = {feature.includes(index)?'white':'black'} sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',mx:1}}>
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
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'92%',mx:'auto',mt:1}}>
                        <Button onClick ={()=>{
                            navigateToShoesSearch();
                            }} variant="contained" color='primary' sx={{width:'100%',height:'45px',borderRadius:'7px'}}>
                            <Typography color="white" sx={{fontFamily:'Pretendard Variable',fontSize:'15px',fontWeight:700}}>
                                상품 찾기
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
                    backgroundColor: "transparent",
                    boxShadow: "none",
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
