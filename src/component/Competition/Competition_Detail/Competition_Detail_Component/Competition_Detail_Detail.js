import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import { useEffect,useState } from 'react';
import { API_URL } from '../../../../API/URL/url';

export default function Competition_Detail_Detail(props) {

    const [firstDetail,setFirstDetail] = useState([]);
    const [secondDetail,setSecondDetail] = useState([]);
    const category = ["대회일시","접수기간","대회장소","대회종목"];
    const secondCategory = ["홈페이지","주최/주관","후원"];

    const convertToCustomDate = (date) => {
        const customDate = new Date(date); // 월은 0부터 시작하므로 2는 3월을 의미합니다.
        const year = customDate.getFullYear();
        const month = (customDate.getMonth() + 1).toString().padStart(2, '0'); // 1을 더하고 두 자리로 맞춥니다.
        const day = customDate.getDate().toString().padStart(2, '0'); // 두 자리로 맞춥니다.
        return `${year}.${month}.${day}`;
    };

    const convertToCustomDateLong = (date) => {
        const customDate = new Date(date); // 월은 0부터 시작하므로 2는 3월을 의미합니다.
        const daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

        const year = customDate.getFullYear();
        const month = (customDate.getMonth() + 1).toString().padStart(2, '0'); // 1을 더하고 두 자리로 맞춥니다.
        const day = customDate.getDate().toString().padStart(2, '0'); // 두 자리로 맞춥니다.
        const DayofWeek = daysOfWeek[customDate.getDay()]; // 두 자리로 맞춥니다.
        const hour = customDate.getHours();
        return `${year}.${month}.${day} ${DayofWeek} ${hour}시`;
    };


    useEffect(()=>{
        const squareList = [];
        const detail =[];

        squareList.push(convertToCustomDateLong(props.competition["competitionTime"]));
        squareList.push([convertToCustomDate(props.competition["receptionStartTime"]),convertToCustomDate(props.competition["receptionEndTime"])]);
        squareList.push(props.competition["place"]);
        squareList.push(props.competition["courseTags"].map(item=>item.name).join(", "));

        detail.push(props.competition["homepage"]);
        detail.push(props.competition["host"]);
        detail.push(props.competition["managementAgency"]);

        setFirstDetail(squareList);
        setSecondDetail(detail);

        const now = new Date(props.competition["receptionEndTime"]);

    },[])

    return (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'start',flexDirection:'column',width:'100%',mt:'15px'}}>
            <Box sx={{width:'90%'}}>
                <Typography color = "#4F1D76" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px'}}>
                    대회상세
                </Typography>
            </Box>

            <Box sx={{display:'flex',justifyContent:'center',alignItems:'start',flexDirection:'column',width:'100%',mt:1}}>
                {
                    firstDetail.map((item,index)=>{
                        if(index!==1){
                            return(
                                <Box key ={index} sx={{width:'100%',height:'50px',border:1,borderColor:'#E8E8E8',borderRadius:'5px',my:0.5}}>
                                    <Box sx={{width:'95%',margin:'auto',alignItems:"start",display:'flex',flexDirection:'column',justifyContent:"center",height:'100%'}}>
                                        <Typography color="#9D9D9D" sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'12px'}}>
                                            {category[index]}
                                        </Typography>
                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'12px'}}>
                                            {item}
                                        </Typography>
                                    </Box>
                                </Box>
                            )
                        }
                        else{
                            return(
                                <Box key ={index} sx={{width:'100%',height:'50px',border:1,borderColor:'#E8E8E8',borderRadius:'5px',my:0.5}}>
                                    <Box sx={{width:'95%',margin:'auto',alignItems:"start",display:'flex',flexDirection:'column',justifyContent:"center",height:'100%'}}>
                                        <Typography color="#9D9D9D" sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'12px'}}>
                                            {category[index]}
                                        </Typography>
                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'12px'}}>
                                            {item[0]} ~ {item[0]}
                                        </Typography>
                                    </Box>
                                </Box>
                            )
                        }
                    })
                }
            </Box>

            <Box sx={{display:'flex',justifyContent:'center',alignItems:'start',flexDirection:'column',width:'100%',my:2}}>
                {
                    secondDetail.map((item,index)=>{
                        return(
                            <Box key ={index} sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',height:'10px',my:0.8}}>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px'}}>
                                    {secondCategory[index]}
                                </Typography>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'12px'}}>
                                    {item}
                                </Typography>
                            </Box>
                        )
                    })}
            </Box>

        </Box>
    );
}