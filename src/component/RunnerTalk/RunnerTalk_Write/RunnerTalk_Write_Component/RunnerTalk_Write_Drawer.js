import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import { useEffect,useState } from 'react';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import {Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {useRecoilState} from 'recoil'
import {
    RunnerTalkMain_Category
} from '../../../../state/RunnerTalk/RunnerTalkMain_State';

export default function TemporaryDrawer(props) {

    const [category,setCategory] = useRecoilState(RunnerTalkMain_Category);

    const navigate = useNavigate();
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
        props.setOpen(open);
    };

    const checkCategoryDrawer = (category) =>{
        props.setCheckCategory(category);
        props.setOpen(false);
    }

    useEffect(()=>{
        
    },[])

    const list = (anchor) => (
        <Box
        sx={{display:'flex',justifyContent:'center'}}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
        >
            <Box sx={DrawerTheme}>
                <Box sx={{height:'450px'}}>
                    <Box sx={{height:'80px',width:'100%',display:'flex',justifyContent:'start',alignItems:'center',position:'relative'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px',ml:2}}>
                            러너톡 주제
                        </Typography>
                    </Box>
                    <Divider/>

                    {/*날짜*/}
                    <Box sx={{width:"92%",height:'360px',mx:'auto',display:'flex',flexDirection:"column"}}>
                        {
                            props.category.map((item,index) => {
                                return(
                                    <Box onClick={()=>checkCategoryDrawer(item.name)} key = {index} sx={{width:'100%',mt:2}}>
                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'17px',ml:0.5}}>
                                            {item.name}
                                        </Typography>
                                    </Box> 
                                )
                            })
                        }
                        
                    </Box>

                </Box>

            </Box>
        </Box>
    );

    return (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:"center"}}
        
        >
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
