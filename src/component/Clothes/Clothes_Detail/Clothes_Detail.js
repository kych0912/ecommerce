import {Box,Typography} from '@mui/material';
import React, { useState } from "react";
import { useEffect } from 'react';
import Banner from "./Clothes_Detail_Component/Clothes_Detail_Banner"
import Title from "./Clothes_Detail_Component/Clothes_Detail_Title"
import TopBar from "./Clothes_Detail_Component/Clothes_Detail_TopBar"
import {Divider} from '@mui/material';
import Navbar from './Clothes_Detail_Component/Clothes_Detail_Navbar';
import { fetchClothesDetail } from '../../../API/api/Clothes/clothes_api';
import Skeleton from '@mui/material/Skeleton';
import { useParams } from "react-router-dom";
import {Modal} from '@mui/material';
import Review from "./Clothes_Detail_Component/Clothes_Detail_Review"
import Tabs from "./Clothes_Detail_Component/Clothes_Main_Tabs"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



function Clothes_Detail(){
    const { id } = useParams();
    const session = localStorage.getItem("sessionid");

    const [loading,setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [error,setError] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [shoes,setShoes] = useState({});
    

    const FetchShoes = async () => {
        const _ShoesDetail = await fetchClothesDetail(id);
        
        if(_ShoesDetail.error){
            setError(_ShoesDetail.error)
            setOpen(true);
        }
        else{
            setShoes(_ShoesDetail);
        }

        setLoading(false);
    }
    
    useEffect(()=>{
        console.log(id)
        window.scrollTo({top:0})
        setLoading(true);
        FetchShoes();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%'}}>
            <TopBar shoes={shoes}/>
            {/* 60px은 navbar*/}
            <Box sx={{width:'100%',mt:'60px',mb:10}}>
                <Banner shoes={shoes}/>
                <Box sx={{zIndex:1,backgroundColor:"#ffffff"}}>
                    {
                        loading? 
                        <Box sx={{width:"100%",height:"720px"}}>
                            <Skeleton variant="rectangular" width={'100%'} height={"100%"} sx={{}}/>
                        </Box>
                        :
                        <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                            {
                                shoes?
                                <Box sx={{width:"100%"}}>
                                    <Title setError = {setError} shoes = {shoes}/>
                                    <Divider/>

                                    <Review shoes={shoes}/>


                                    <Tabs shoes={shoes}/>

                                </Box>
                                :
                                <Box sx={{width:'100%',height:"500px",display:'flex',justifyContent:"center",alignItems:"center"}}>
                                    error
                                </Box>
                            }
                        </Box>   
                    }

                </Box>
            </Box>
            <Navbar/>

            <Box>
                <Modal
                    open={open}
                    onClose={handleClose}
                    disableScrollLock
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {error}
                    </Typography>
                    
                    </Box>
                </Modal>
            </Box>
        </Box>    
    )
}


export default Clothes_Detail