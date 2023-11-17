import {Box,Typography,Grid,IconButton} from '@mui/material';
import React, { useState,useEffect } from "react";
import {CircularProgress} from '@mui/material';
import {API_URL} from "../../../API/URL/index"
import { fetchClothesAll } from '../../../API/api/RunningShoes/clothes_api';
import { shoesList } from '../../../style/plate/ShoesList';
import {useNavigate} from 'react-router-dom';

export default function Crew_Main_List(props){
    const loadingcomponent =[1,2,3,4,5,6];

    const navigate = useNavigate();

    const [list,setList] = useState([]);
    const session = localStorage.getItem('sessionid');

    const FetchList = async () => {
        const _PopularCLothes = await fetchClothesAll();
    
        if(_PopularCLothes.error){
            props.setError(_PopularCLothes.error)
            props.setOpen(true)
        }
        else{
            setList(_PopularCLothes);
        }
        
        props.setLoading3(false);
    }


    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const navigateToClothesDetail = (id) =>{
        navigate(`/clothes/detail/${id}`)
    }

    useEffect(()=>{
        FetchList();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%',mb:8,mt:'22px'}}>
            
            
            <Box sx={{width:"90%"}}>

            {/*상단제목*/}
            <Box sx={{width:'90%'}}>
                <Box sx={{width:'100%',display:'flex',flexDirection:"column",justifyContent:"center",alignItems:"start"}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px'}}>
                        모든 의류
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',color:'#8E8D8D'}}>
                        TradeTrend 에 등록된 모든 의류에요
                    </Typography>
                </Box>
            </Box>


            {
                props.loadingall?
                <Box sx={{width:'100%',pt:2,height:'250px',display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <CircularProgress/>
                </Box>
                :
                <Box sx={{width:"100%",display:"flex",justifyContent:"end",pt:2}}>
                    {
                        list?
                        <Grid container spacing={1} columns={16} >
                            {
                                list.map((item,index)=>{
                                    return(
                                        <React.Fragment key = {index}>
                                            <Grid item xs={8} key={item.id} sx={{display:'flex',justifyContent:'center'}}>
                                                <Box onClick ={()=>navigateToClothesDetail(item.id)} sx={{width:'100%',mb:1,display:'flex',flexDirection:'column',alignItems:"start",justifyContent:'center'}}>
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
                        :
                        <Box>
                            error
                        </Box>
                    }
                </Box>
            }
                
            </Box>
            
        </Box>    
    )
}