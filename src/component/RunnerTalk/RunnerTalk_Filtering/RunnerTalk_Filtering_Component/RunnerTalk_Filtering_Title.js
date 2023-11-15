import {Box,Typography,Skeleton} from '@mui/material';
import {React,useState,useEffect} from "react";
import {useRecoilState} from 'recoil'
import {useParams} from "react-router-dom"
import { RunnerTalkFiltering_FilterLoading,
    RunnerTalkFiltering_Error,
    RunnerTalkFiltering_Category,
    RunnerTalkFiltering_LoadingAll
} from '../../../../state/RunnerTalk/RunnerTalkFiltering_State';
import {fetchRunnerTalkCategory} from "../../../../API/api/RunningTalk/runningTalk_api"

export default function RunnerTalk_Main_Title(props){

    const { id } = useParams();

    const [error,setError] = useRecoilState(RunnerTalkFiltering_Error);
    const [category,setCategory] = useRecoilState(RunnerTalkFiltering_Category);
    const [loading,setLoading] = useRecoilState(RunnerTalkFiltering_FilterLoading);
    const [loadingall,setLoadingall] = useRecoilState(RunnerTalkFiltering_LoadingAll);

    const FetchRunnerTalkCategory = async () => {
        const _Category = await fetchRunnerTalkCategory();
        

        if(_Category.response){
            setError(_Category.response.status)
            props.setOpen(true)
        }
        else{
            setCategory(prev=>prev=_Category)
        }

        setLoading(false);
    }

    useEffect(()=>{
        setLoading(true)
        FetchRunnerTalkCategory();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%'}}>
            {
                loadingall?
                ""
                :
                <Box sx={{width:'100%'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'25px',ml:0,mt:1.5}}>
                    {category[id-1].name}
                    </Typography>
                </Box>
            }
        </Box>    
    )
}