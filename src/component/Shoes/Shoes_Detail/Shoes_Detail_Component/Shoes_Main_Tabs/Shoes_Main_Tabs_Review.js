import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { API_URL } from '../../../../../API/URL';

export default function Competition(){

    const reviewList = [
        {
            id:1,
            title:"만족해요",
            content:"마지막 스프라이트 입고 반바지입고 부츠 신은 사진 속 코디위에 걸치려고 주문했는데\n" 
            +
            "일단 단추가 너무 귀여워요ㅎㅎ 첨엔 단추에까지 털을 붙여놨다고?? 단추 채우고 풀다가 털 다 빠지는거 아닌가 생각했는데 생각보다 튼튼하게 붙어있는거같더라구요\n"
            +
            "그리고 팔 기장도 딱이고 전체적인 기장도 너무 짧거나 길거나 하지않고 딱 맞는거 같아요\n"
            +
            "예쁘게 잘 코디해서 입을게요ㅎㅎ",
            date:"2021-10-10",
            like:10,
            comment:10,
            img:"https://image.msscdn.net/data/estimate/3584063_0/gallery_6554ab3c3c9ac.jpg.list",
            name:"김민수",
            profile:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        {
            id:2,
            title:"좋아요",
            content:"너무 커요",
            date:"2021-10-10",
            like:10,
            comment:10,
            img:"https://image.msscdn.net/data/estimate/3465171_0/gallery_64f83050cba78.jpg.list",
            name:"김민수",
            profile:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        {
            id:3,
            title:"좋아요",
            content:"너무 커요",
            date:"2021-10-10",
            like:10,
            comment:10,
            img:"https://image.msscdn.net/data/estimate/1666442_0/gallery_62314fdf3c439.jpg.list",
            name:"김민수",
            profile:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
    ]



    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%',py:'22px'}}>

            {/*상단제목*/}
            <Box sx={{width:'95%'}}>
                <Box sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'start'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px'}}>
                        리뷰
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',color:'#8E8D8D',ml:1}}>
                        3
                    </Typography>
                </Box>
            </Box>

            <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                <Box sx={{width:'95%',pt:1}}>
                {
                    reviewList.map((item,index)=>{
                        return(
                            <Box key ={index} sx={{display:'flex',alignItems:'center',flexDirection:'column',alignItems:"start",py:3,px:4,backgroundColor:'#F6F6F6',borderRadius:2,mt:1}}>
                                <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',width:`calc(100% - 112px)`,flexDirection:'column',height:"calc(100% - 40px)",gap:'4px'}}>
                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'13px',color:'#606060',lineHeight:'15.51px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                        {item.name}
                                    </Typography>
                                </Box>
                                <Box sx={{position:'relative',backgroundColor:'#f4f4f4',width:'100%',pb:'100%',overflow:"hidden",borderRadius:'8px',my:2}}>
                                    <img src={`${item.img}`} onerror="this.style.display='none'" style={{position:"absolute",width:"100%",height:"100%",objectFit:'cover',objectPosition:'contain'}}/>
                                </Box>
                                <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',width:`100%`,flexDirection:'column',height:"calc(100% - 40px)",gap:'4px'}}>
                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'13px',color:'#606060',lineHeight:'15.51px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                        {item.title}
                                    </Typography>
                                    
                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060',lineHeight:'15.51px',whiteSpace:'pre-line',overflow:'hidden',textOverflow:'ellipsis',WebkitLineClamp:3,display:'-webkit-box',WebkitBoxOrient:'vertical'}}>
                                        {item.content}
                                    </Typography>
                                </Box>
                            </Box>
                        )
                    })
                }
                </Box>
            </Box>
            
        </Box>    
    )
}
