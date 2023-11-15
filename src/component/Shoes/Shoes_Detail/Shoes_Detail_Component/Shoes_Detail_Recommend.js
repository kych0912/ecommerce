import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import { useEffect,useState } from 'react';
import { listItemSecondaryActionClasses } from '@mui/material';

export default function Shoes_Detail_Recommend(props) {

    const [firstDetail,setFirstDetail] = useState([]);
    const [secondDetail,setSecondDetail] = useState([]);
    const category = ["대회일시","접수기간","대회장소","대회종목"];
    const secondCategory = ["홈페이지","주최","주관"];

    
    useEffect(()=>{
        
    },[])

    return (
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%',mt:2}}>
            <Box sx={{width:'90%'}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px'}}>
                    이런 분들에게 추천해요
                </Typography>
            </Box>

            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%',mb:3,mt:1}}>
                {
                    props.shoes.recommendTo.map((item,index)=>{
                        return(
                            <Box key = {index} sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'90%',mt:1,backgroundColor:'#4F1D76',height:'25px',borderRadius:'3px'}}>
                                <Box key ={index} sx={{borderRadius:'50%',width:'15px',height:'15px',mx:1,border:1,backgroundColor:'#ffffff',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Typography marginRight={index==0?'1px':0} align="center" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px',height:'15px',lineHeight:'15.51px'}}>
                                        {index+1}
                                    </Typography>
                                </Box>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'10px',color:'#ffffff'}}>
                                    {item.content}
                                </Typography>
                            </Box>
                        )
                    })
                }
            </Box>

        </Box>
    );
}