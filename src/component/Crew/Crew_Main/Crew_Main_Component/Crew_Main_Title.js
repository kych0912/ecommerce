import {Box,Typography,Grid} from '@mui/material';
import React from "react";
import Filter from './Crew_Main_Title_Component/Crew_Main_Filter';


export default function Shoes_Main_All(props){

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%',mb:2}}>

            {/*상단제목*/}
            <Box sx={{width:'100%'}}>
                <Box sx={{width:'100%',display:'flex',alignItems:'start',flexDirection:'column',justifyContent:"center"}}>
                    <Box sx={{height:'36px'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px',ml:0,mt:0.7}}>
                            크루와 함께해요
                        </Typography>
                    </Box>
                    <Box sx={{display:"flex",justifyContent:"space-between",width:"100%",alignItems:'center',height:"25px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',ml:0,color:"#9D9D9D",textAlign:'start',mt:1}}>
                            내 주변에 있는 크루를 쉽게 찾을 수 있어요
                        </Typography>
                        <Filter/>
                    </Box>
                </Box>
            </Box>
        </Box>    
    )
}