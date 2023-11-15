import {Box,Typography,Grid} from '@mui/material';
import React from "react";
import Filter from './Crew_Main_Title_Component/Crew_Location_Filter';
import { useRecoilState } from 'recoil';
import {Skeleton} from '@mui/material';
import {
    CrewLocation_Loading,
    CrewLocation_Location
} from "../../../../state/Crew/CrewLocation_State"
import Capital from "../../../../Image/CrewLocation/capital.png";
import chungcheong from "../../../../Image/CrewLocation/chungcheong.png";
import gangwon from "../../../../Image/CrewLocation/gangwon.png";
import gyeongsang from "../../../../Image/CrewLocation/gyeongsang.png";
import jeju from "../../../../Image/CrewLocation/jeju.png";
import jeolla from "../../../../Image/CrewLocation/jeolla.png";

export default function Shoes_Location_Image(props){

    const locationImage = {
        1:Capital,
        2:gyeongsang,
        3:chungcheong,
        4:jeolla,
        5:jeju,
    }

    const locationName = {
        1:'수도권',
        2:'경상권',
        3:'충청권',
        4:'전라권',
        5:'제주권',
    }

    const [loading,setLoading] = useRecoilState(CrewLocation_Loading);
    const [location,setLocation] = useRecoilState(CrewLocation_Location);

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%',mb:2}}>

            {/*상단 이미지*/}
            {
                loading?
                <Box sx={{width:'100%'}}>
                    <Skeleton variant="rectangular" width={'100%'} height={"90px"} sx={{mt:1,borderRadius:2}}/>
                </Box>
                :
                <Box sx={{width:'100%'}}>
                    
                    <Box sx={{width:'100%',display:'flex',alignItems:'start',flexDirection:'column',justifyContent:"center"}}>
                        <Box sx={{position:'relative',width:'100%',height:'90px',backgroundColor:'#4F1D76',backgroundImage:`url(${locationImage[location]})`,borderRadius:3,mx:'auto',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
                            <Typography sx={{position:"absolute",left:'50%',top:'50%',transform:"translate(-50%, -50%)",fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px',color:'#ffffff'}}>
                                {locationName[location]}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

            }

        </Box>    
    )
}