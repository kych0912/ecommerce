import {Box,Typography,Skeleton} from '@mui/material';
import {React,useState,useEffect} from "react";
import {useRecoilState} from 'recoil'
import { useNavigate } from 'react-router-dom';
import {
    RunnerTalkMain_Error,
    RunnerTalkMain_LoadingAll,
    RunnerTalkMain_HotLoading
} from '../../../../state/RunnerTalk/RunnerTalkMain_State'
import {fetchPopularTalk} from "../../../../API/api/RunningTalk/runningTalk_api"
import Hot from "../../../../Image/Hot.png"

export default function RunnerTalk_Main_Hot(props){

    const navigate = useNavigate();
    const loadinglist = [1,2];

    const [list,setList] = useState([]);
    const [error,setError] = useRecoilState(RunnerTalkMain_Error);
    const [loading,setLoading] = useRecoilState(RunnerTalkMain_HotLoading);
    const [loadingall,setLoadingall] = useRecoilState(RunnerTalkMain_LoadingAll);

    const FetchRunnerTalkHot = async () => {
        const _HotPost = await fetchPopularTalk(2);

        if(_HotPost.response){
            setError(_HotPost.response.status)
            props.setOpen(true)
        }
        else{
            setList(_HotPost)
        }

        setLoading(false);
    }

    const navigateToDetail =(id)=>{
        navigate(`/runnertalk/detail/${id}`)
    }

    useEffect(()=>{
        setLoading(true);
        FetchRunnerTalkHot();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%',mb:'10px'}}>

            {/*상단제목*/}
            <Box sx={{width:'100%'}}>
                {
                    loadingall?
                    <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column'}}>
                        {loadinglist.map((item,index) =>(
                                <Skeleton key = {index} variant="rectangular" width={'100%'} height={"36px"} sx={{mt:1,borderRadius:2}}/>   
                        ))}
                    </Box>
                    :
                    <Box sx={{width:'100%'}}>
                        {
                            list.length!==0?
                            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column'}}>
                                {
                                    list.map((item,index) =>(
                                        <Box key={index} onClick={()=>navigateToDetail(item.id)} sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',mt:1}}>
                                            <Box sx={{width:'30px',height:'30px',mr:1,backgroundImage:`url(${Hot})`,backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
                                            <Box sx={{width:'calc(100% - 38px)',height:'36px',backgroundColor:'rgba(79, 29, 118, 0.25)',borderRadius:'7px',display:'flex',alignItems:"center"}}>
                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',ml:1}}>
                                                    {item.title}
                                                </Typography>
                                            </Box>    
                                        </Box>
                                    ))
                                }
                            </Box>
                            :
                            ""
                        }
                    </Box> 
                }
            </Box>
        </Box>    
    )
}