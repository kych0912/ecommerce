import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Typography,Grid } from '@mui/material';
import { useEffect,useState } from 'react';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import {Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {useRecoilState} from 'recoil'
import {
    CompetitionFilter_Course,
    CompetitionFilter_Location,
    CompetitionFilter_Month,
} from '../../../../state/Competition/CompetitionSearch_State';
import { createTheme } from '@mui/system';

const theme = createTheme({
    breakpoints: {
      values: {
        mobile: 0,
        largeMobile: 425,
        tablet: 640,
        laptop: 1024,
        desktop: 1200,
      },
    },
  });


const tagtypo = {
    fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',lineHeight:"16.71px"
}

const tagbox = {
    border:1,borderRadius:'13px',display:'flex',justifyContent:'center',alignItems:'center',borderColor:'#D9D9D9',py:'7px',px:'12px'
}

export default function TemporaryDrawer(props) {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

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
        props.setOpen(open);
    };

    const [month, setMonth] = useRecoilState(CompetitionFilter_Month);
    const [course, setCourse] = useRecoilState(CompetitionFilter_Course);
    const [location, setLocation] = useRecoilState(CompetitionFilter_Location);

    const handleToggleMonth = (value) => {
        !month.includes(value)
        ? setMonth((month) => [...month, value])
        : setMonth(month.filter((button) => button !== value));
    };

    const handleToggleCourse = (value) => {
        !course.includes(value)
        ? setCourse((course) => [...course, value])
        : setCourse(course.filter((button) => button !== value));
    };

    const handleToggleLocation = (value) => {
        !location.includes(value)
        ? setLocation((location) => [...location, value])
        : setLocation(location.filter((button) => button !== value));
    };

    const navigateToSearch = () =>{
        let queryMonth = month.join("%20");
        let queryCourse = course.join("%20");
        let queryLocation = location.join("%20");

        const queryArray = [queryMonth,queryCourse,queryLocation];
        const queryKey = ['month','course','location'];

        console.log(queryLocation)

        let payload ={}

        for(let i = 0 ; i<3;i++){
            if(queryArray[i] != ""){
                payload[queryKey[i]] = queryArray[i];
            }
        }

        var payloadString = Object.entries(payload).map(e => e.join('=')).join('&');
        navigate(`/schedule/search?${payloadString}`);
    }

    const list = (anchor) => (
        <Box
        sx={{display:'flex',justifyContent:'center',position:'relative'}}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
        >
            <Box sx={DrawerTheme}>
                <Box sx={{mb:'100px'}}>
                    <Box sx={{height:'50px',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px'}}>
                            필터
                        </Typography>
                        <ClearIcon onClick={toggleDrawer(false)} sx={{position:'absolute', right:30}}/>
                    </Box>
                    <Divider/>

                    {/*날짜*/}
                    <Box sx={{width:"90%",mx:'auto'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',mt:2}}>
                            날짜
                        </Typography>

                        <Grid container rowSpacing={1.5} columnSpacing={0.75} column={{mobile:14,largeMobile:16}} sx={{mb:'20px',mt:'0px'}}>
                            {['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월','접수가능'].map((text,index)=>(
                                <Grid item mobile={2} largeMobile={2} key = {index}>
                                    <Box onClick ={()=>handleToggleMonth(index+1)} backgroundColor={month.includes(index+1)?'#4F1D76':'#ffffff'} sx={tagbox}>
                                        <Typography color = {month.includes(index+1)?'white':"#606060"} sx={tagtypo}>
                                            {text}
                                        </Typography>
                                    </Box>   
                                </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                    <Divider/>

                    {/*코스*/}
                    <Box sx={{width:"90%",mx:'auto'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',mt:2}}>
                            코스
                        </Typography>

                        <Grid container rowSpacing={1.5} columnSpacing={0.75} column={{mobile:10,largeMobile:12}} sx={{mb:'11px',mt:"0px"}}>
                            {['FULL','HALF','10K','5K','ULTRA','챌린지'].map((text,index)=>(
                                <Grid item mobile={2} largeMobile={2} key = {index}>
                                    <Box onClick ={()=>handleToggleCourse(index)} backgroundColor={course.includes(index)?'#4F1D76':'#ffffff'} sx={tagbox}>
                                        <Typography color = {course.includes(index)?'white':"#606060"} sx={tagtypo}>
                                            {text}
                                        </Typography>
                                    </Box>   
                                </Grid>
                                ))
                            }
                        </Grid>

                    </Box>
                    <Divider/>

                    {/*지역*/}
                    <Box sx={{width:"90%",mx:'auto'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',mt:2}}>
                            지역
                        </Typography>

                        <Grid container rowSpacing={1.5} columnSpacing={0.75} column={{mobile:14,largeMobile:16}} sx={{mb:'20px',mt:"0px"}}>
                            {['수도권','충청권','강원권','전라권','경상권','제주권'].map((text,index)=>(
                                <Grid item mobile={2} largeMobile={2} key = {index}>
                                    <Box onClick ={()=>handleToggleLocation(index)} backgroundColor={location.includes(index)?'#4F1D76':'#ffffff'} sx={tagbox}>
                                        <Typography color = {location.includes(index)?'white':"#606060"} sx={tagtypo}>
                                            {text}
                                        </Typography>
                                    </Box>   
                                </Grid>
                                ))
                            }
                        </Grid>
                    </Box>

                    {/*하단 버튼*/}
                    <Box sx={{display:'flex',position:"absolute",bottom:'33px',justifyContent:'center',alignItems:'center',left:"50%",transform:'translateX(-50%)',width:'90%',mx:'auto',mt:1,minWidth:'324px',maxWidth:"405px"}}>
                        <Button disabled={!month.length&&!course.length&&!location.length} onClick ={()=>{
                            navigateToSearch();
                            }} variant="contained" color='primary' sx={{width:'100%',height:'45px',borderRadius:'7px'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontSize:'15px',fontWeight:700}}>
                                러닝대회 찾기
                            </Typography>
                        </Button>
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
