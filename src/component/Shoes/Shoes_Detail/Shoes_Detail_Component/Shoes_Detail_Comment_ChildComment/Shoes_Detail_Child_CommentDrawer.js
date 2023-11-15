import * as React from 'react';
import { useCallback } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Typography,CircularProgress,IconButton,Button,Modal} from '@mui/material';
import { useEffect,useState } from 'react';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import {Avatar} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import { useParams } from "react-router-dom";
import {
    ShoesDetail_Comment,
    ShoesDetail_Comment_Order
} from "../../../../../state/Shoes/ShoesMain_State"
import {API_URL} from "../../../../../API/URL/index"
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { FetchRunningshoesCommentReplies,RunningshoesCommentLike } from '../../../../../API/api/RunningShoes/Shoes_comment_api';
import CommentAdder from "./Shoes_Detail_Child_CommentDrawer_AddComment"


export default function TemporaryDrawer(props) {

    const { id } = useParams();
    const session = localStorage.getItem('sessionid');
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = (id=0) => {
        setClickedId(id);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false)
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '320px',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
      };

    const navigateToBack = ()=>{
        navigate(-1);
    }

    const useBodyScrollLock = () => {
        const lockScroll = useCallback(() => {
            document.body.style.overflow = 'hidden';
        }, []);

        const openScroll = useCallback(() => {
            document.body.style.removeProperty('overflow');
        }, []);

        return { lockScroll, openScroll };
    }
    
    const { lockScroll, openScroll } = useBodyScrollLock();

    const navigate = useNavigate();
    const DrawerTheme = {
        width:'100%',
        height:'100%',
        minWidth:'360px',
        maxWidth:'420px',
        borderTopLeftRadius:20,
        borderTopRightRadius:20, 
        backgroundColor:'#ffffff',
        pb:'60px',

    }

    function timeForToday(value) {
        const today = new Date();
        const timeValue = new Date(value);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${betweenTimeDay}일전`;
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        
        props.setOpen((prev)=>prev=open);
    };

    

    const [comment,setComment] =useState([]);
    const [loading,setLoading] = useState(false);
    const [mainComment,setMainComment] = useState([]);

    const [clickedId,setClickedId] = useState(0);


    useEffect(()=>{
        return(()=>{
            document.body.style.removeProperty('overflow');
        })
        
    },[])

    const FetchRunningshoesCommentRepliesFunction = async () => {
        const _Comment = await FetchRunningshoesCommentReplies(props.id,session);

        if(_Comment.response){
            props.setError(_Comment.response.status)
            props.setErrorOpen(true);
        }
        else{
            setComment(prev=>prev=_Comment.comments);
            setMainComment(prev=>prev=_Comment.main_comment[0]);
        }

        console.log(mainComment)
        console.log(comment)

        setLoading(false);

    }

    const RunningShoesCommentLikeFunction = async () => {
        const response = await RunningshoesCommentLike(clickedId,session);

        if(response.response){
            handleClose();
            return;
        }
        else{
            handleClose();
        }
    
    }
    useEffect(()=>{
        setLoading(true);
        FetchRunningshoesCommentRepliesFunction();
    },[props.id]);

    const list = (anchor) => (
        <Box
        sx={{display:'flex',justifyContent:'center',height:"100%"}}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
        >
            <Box sx={DrawerTheme}>
                <Box sx={{}}>
                    <Box sx={{display:"flex",height:'60px'}}>
                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <IconButton onClick = {toggleDrawer(false)} type="button" sx={{color:'black',ml:2 }} aria-label="search">
                                <WestIcon sx={{}}/>
                            </IconButton>
                        </Box>
                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'start',position:'relative',flexDirection:'column',px:2}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px'}}>
                                {"답글"}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider/>

                    {/*날짜*/}
                    {
                        loading?
                        <Box sx={{width:"100%",height:'400px',mx:'auto',display:'flex',flexDirection:"column",justifyContent:"center",alignItems:'center'}}>
                            <CircularProgress color="primary" />
                        </Box>
                        :
                        <Box sx={{width:"100%",height:'400px',mx:'auto',display:'flex',flexDirection:"column"}}>
                            {/*댓글*/}
                            <Box sx={{display:'flex',alignItems:'start',px:2,py:1.5,backgroundColor:"#D9D9D9"}}>
                                <Box sx={{height:'100%',mt:0.5}}>
                                    <Avatar src={`${API_URL}${mainComment.user_profile}`} sx={{width:'20px',height:'20px',mr:1}}/>
                                </Box>
                                <Box sx={{flex:1}}>
                                    <Box sx={{display:'flex'}}>
                                        <Typography color="#959494" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px'}}>
                                            {mainComment.user}{" -"}
                                        </Typography>
                                        <Typography color="#959494" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px',ml:0.5}}>
                                            {timeForToday(mainComment.created)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{width:"100%",mb:0.6}}>
                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:'#000000'}}>
                                            {mainComment.comment}
                                        </Typography>
                                    </Box>
                                    <Box sx={{display:"flex"}}>
                                        <Box onClick={()=>handleOpen(mainComment.id)} sx={{display:'flex',alignItems:'center',height:'14px'}}> 
                                            <ThumbUpOffAltOutlinedIcon sx={{width:'16px',height:'16px',mr:0.3}}/>
                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',mr:1,height:'100%'}}>
                                                {mainComment.likePoint}
                                            </Typography>
                                        </Box>
                                        <Box sx={{display:'flex',alignItems:'center',height:'14px'}}>
                                            <ModeCommentOutlinedIcon sx={{width:'16px',height:'16px',mr:0.3}}/>
                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',height:'100%'}}>
                                                {mainComment.commentPoint}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    
                                </Box>
                            </Box> 

                            {/*대댓글*/}
                            <Box sx={{height:"100%",overflow:'hidden'}}>
                            {
                                comment.map((item,index) => {
                                    return(
                                        <Box  key = {index} sx={{display:'flex',alignItems:'start',mx:2,my:1.5}}>
                                            <Box sx={{height:'100%',mt:0.5}}>
                                                <Avatar src={`${API_URL}${item.user_profile}`} sx={{width:'20px',height:'20px',mr:1,mb:4.5}}/>
                                            </Box>
                                            <Box sx={{flex:1}}>
                                                <Box sx={{display:'flex'}}>
                                                    <Typography color="#959494" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px'}}>
                                                        {item.user}{" -"}
                                                    </Typography>
                                                    <Typography color="#959494" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px',ml:0.5}}>
                                                        {timeForToday(item.created)}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{width:"100%",mb:0.6}}>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:'#000000',whiteSpace:'normal',wordBreak:'break-all'}}>
                                                        {item.comment}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{display:"flex",mt:1.5}}>
                                                    <Box onClick={()=>handleOpen(item.id)} sx={{display:'flex',alignItems:'center',height:'14px'}}> 
                                                        <ThumbUpOffAltOutlinedIcon sx={{width:'16px',height:'16px',mr:0.3}}/>
                                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',mr:1,height:'100%'}}>
                                                            {item.likePoint}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                
                                            </Box>
                                        </Box> 
                                    )
                                })
                            }
                            </Box>
                        </Box>
                    }

                </Box>

            </Box>
        </Box>
    );
    

    return (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:"center"}}
        
        >
            <React.Fragment>
            <Drawer
                disableScrollLock={ true }
                PaperProps={{
                    sx: {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    
                    }
                }}
                anchor={'bottom'}
                open={props.open}
                onClose={toggleDrawer(false)}
            >   
                {list()}
                <CommentAdder setError = {props.setError} setErrorOpen={props.setErrorOpen} id={props.id} setComment={setComment}/>
            </Drawer>

            <Box>
                <Modal
                    open={open}
                    onClose={handleClose}
                    disableScrollLock
                >
                    <Box sx={style}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px'}}>
                            {"이 댓글을 공감하시겠습니까?"}
                        </Typography>
                        <Box sx={{}}>
                            <Box sx={{display:"flex",justifyContent:'end',alignItems:'center'}}>
                                <Button onClick={()=>handleClose()} color='primary'>
                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px'}}>
                                        {"취소"}
                                    </Typography>
                                </Button>
                                <Button color='primary'>
                                    <Typography onClick ={()=>RunningShoesCommentLikeFunction()} sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px'}}>
                                        {"확인"}
                                    </Typography>
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            </Box>
            </React.Fragment>
        </Box>
    );
}
