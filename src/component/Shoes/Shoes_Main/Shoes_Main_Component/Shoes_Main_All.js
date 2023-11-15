import {Box,Typography,Grid,IconButton} from '@mui/material';
import React from "react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import {API_URL} from "../../../../API/URL/index"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {useRecoilState} from 'recoil'
import {
    ShoesMain_AllShoesLoading,
    ShoesMain_AllLoading,
    ShoesMain_ShoesBookMark
} from '../../../../state/Shoes/ShoesMain_State';
import {
    ShoesList,
    ShoesSearch_Error
} from '../../../../state/Shoes/ShoesSearch_State';
import { shoesList } from '../../../../style/plate/ShoesList';

import { fetchClothesAll } from '../../../../API/api/RunningShoes/clothes_api';


export default function Shoes_Main_All(props){
    const session = localStorage.getItem("sessionid");

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const navigate = useNavigate();
    const loadinglist = [1,2,3,4,5,6]

    const [loading,setLoading] = useRecoilState(ShoesMain_AllShoesLoading);
    const [loadingall,setLoadingall] = useRecoilState(ShoesMain_AllLoading);
    const [shoesBookmark,setShoesBookmark] = useRecoilState(ShoesMain_ShoesBookMark);
    const [error,setError] = useRecoilState(ShoesSearch_Error);
    const [list,setList] = useRecoilState(ShoesList);

    
    const getItems = async () =>{
        setLoading(true);

        const _ShoesList = await fetchClothesAll();

        if(_ShoesList.response){
            setError(_ShoesList.response.status)
            props.setOpen(true);
        }
        else{
            setList(_ShoesList)
        }
        setLoading(false);
    }

    const navigateToClothesDetail =(id) =>{
        navigate(`/clothes/detail/${id}`);
    }

    const navigateToShoesSearch =() =>{
        navigate(`/shoes/search`);
    }

    useEffect(() => {
        getItems();
    }, [])

    useEffect(() => {
        return () => {
          setList([]);
        };
      }, []);
    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%',mb:'70px'}}>

            {/*상단제목*/}
            <Box sx={{width:'100%'}}>
                <Box sx={{width:'100%',display:'flex',alignItems:'start',flexDirection:'column',justifyContent:"center"}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px'}}>
                        모든 러닝화
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:"#9D9D9D"}}>
                         러닝라이프에 등록된 모든 러닝화에요
                    </Typography>
                </Box>
            </Box>

            {
                loading||loadingall?
                <Box sx={{width:'100%',display:'flex',justifyContent:"center",mt:2}}>
                    <Box sx={{display:'flex',flexDirection:'column',width:"50%",alignItems:"center"}}>
                        {loadinglist.slice(0, Math.ceil(loadinglist.length / 2)).map((item, index) => (
                        <Box key={index} sx={{width:"100%",display:'flex',justifyContent:'center',alignItems:"center"}}>
                            <Skeleton variant="rectangular" width={'90%'} height={"240px"} sx={{mt:1,borderRadius:2}}/>   
                        </Box>
                        ))}
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'column',width:'50%'}}>
                        {loadinglist.slice(Math.ceil(loadinglist.length / 2)).map((item, index) => (
                        <Box key={index} sx={{width:"100%",display:'flex',justifyContent:'center',alignItems:"center"}}>
                            <Skeleton variant="rectangular" width={'90%'} height={"240px"} sx={{mt:1,borderRadius:2}}/>   
                        </Box>
                        ))}
                    </Box>
                </Box>
                :
                <Box sx={{width:"100%",mt:2}}>
                    {
                        list.length!=0?
                        <Box sx={{width:"100%"}}>
                             <Grid container spacing={1} columns={16} >
                                {
                                    list.map((item,index)=>{
                                        return(
                                            <React.Fragment key = {index}>
                                                <Grid item xs={8} key={item.id} sx={{display:'flex',justifyContent:'center'}}>
                                                    <Box onClick={()=>navigateToClothesDetail(item.id)} sx={{width:'100%',mb:1,display:'flex',flexDirection:'column',alignItems:"start",justifyContent:'center'}}>
                                                            <Box sx={{position:'relative',backgroundColor:'#f4f4f4',width:'100%',pb:'100%',overflow:"hidden",borderRadius:'8px'}}>
                                                                <img src={`${API_URL}/api/file/${item.mainImg}`} style={{position:"absolute",width:"100%",height:"100%",objectFit:'cover',objectPosition:'contain'}}/>
                                                            </Box>
                                                            <Box sx={shoesList.shoesDetailBox}>
                                                                <Typography sx={shoesList.shoesDetailBrand}>
                                                                    {item.brand}
                                                                </Typography>
                                                                <Typography sx={shoesList.shoesDetailName}>
                                                                    {item.name}
                                                                </Typography>
                                                                <Typography sx={shoesList.shoesDetailPrice}>
                                                                    {formatNumberWithCommas(item.price)}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                </Grid>
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </Grid>
                        </Box>
                        :
                        ""
                    }
                </Box>
            }

            {/*더보기 버튼*/}
            {
                loading||loadingall?
                <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'95%',flexDirection:'column',mt:1}}>
                    <Skeleton variant="rectangular" sx={{borderRadius:'10px',height:'40px',width:'100%'}}/>
                </Box>
                :
                <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'95%',flexDirection:'column',mt:1}}>
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'10px',height:'40px',width:'100%',border:1,color:'#E8E8E8'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:'#606060'}}>
                            더보기
                        </Typography>
                    </Box>
                </Box>
            }
        </Box>    
    )
}