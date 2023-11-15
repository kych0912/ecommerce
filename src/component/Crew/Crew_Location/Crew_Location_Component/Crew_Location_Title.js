import {Box,Typography,Grid} from '@mui/material';
import {React,useEffect} from "react";
import Filter from './Crew_Main_Title_Component/Crew_Location_Filter';
import { useRecoilState } from 'recoil';
import {Skeleton} from '@mui/material';
import {
    CrewLocation_Loading,
    CrewLocation_Location
} from "../../../../state/Crew/CrewLocation_State"

export default function Shoes_Location_All(props){

    const locationName = {
        1:'수도권',
        2:'경상권',
        3:'충청권',
        4:'전라권',
        5:'제주권',
    }
    const [loading,setLoading] = useRecoilState(CrewLocation_Loading);
    const [location,setLocation] = useRecoilState(CrewLocation_Location);

    useEffect(()=>{
        console.log(loading)
    },[loading])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%',mb:2}}>

            {/*상단제목*/}
            {
                loading?
                <Box sx={{width:'100%'}}>
                    <Skeleton variant="rectangular" width={'100%'} height={"60px"} sx={{mt:1,borderRadius:2}}/>
                </Box>
                :
                <Box sx={{width:'100%'}}>
                    
                    <Box sx={{width:'100%',display:'flex',alignItems:'start',flexDirection:'column',justifyContent:"center"}}>
                        <Box sx={{height:'36px'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px',ml:0.5,mt:0.7}}>
                                {locationName[location]}에 있는 러닝크루에요
                            </Typography>
                        </Box>
                        <Box sx={{display:"flex",justifyContent:"space-between",width:"100%",alignItems:'center',height:"25px"}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',ml:0.5,color:"#9D9D9D",textAlign:'start',mt:1}}>
                                내 주변에 있는 크루를 쉽게 찾을 수 있어요
                            </Typography>
                            <Filter/>
                        </Box>
                    </Box>
                </Box>

            }

        </Box>    
    )
}