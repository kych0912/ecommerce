// import { useEffect, useState } from "react";
// import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import {Box,Typography,IconButton} from '@mui/material';
// import {
//     runnerTalkLike,
//     runnerTalkBookMark
// } from "../../../../API/api/RunnerTalk/runnerTalk_api"


// export default function RunnerTalk_Detail_Like(props) {
//     const [isBookmark,setIsBookmark] = useState(false);
//     const [isLike,setIsLike] = useState(false);
//     const [bookmarkCount,setBookmarkCount] = useState(0);
//     const [likeCount,setLikeCount] = useState(0);

//     useEffect(()=>{
//         setIsBookmark(prev=>prev=props.bookmarked);
//         setIsLike(prev=>prev=props.liked);
//         setBookmarkCount(prev=>prev=props.bookmarkPoint);
//         setLikeCount(prev=>prev=prev=props.likePoint);
//     },[props.detail])

//     return (
//         <Box sx={{width:"100%",display:"flex",justifyContent:'start',alignItems:"center"}}>
//             <Box sx={{display:'flex'}}>
//                 {
//                     isLike?
//                     <IconButton onClick={()=>onClickLike(props.id)} sx={{}}>
//                         <ThumbUpAltIcon sx={{fontSize:35}}/>
//                     </IconButton>
//                     :
//                     <IconButton onClick={()=>onClickLike(props.id)} sx={{}}>
//                         <ThumbUpOffAltOutlinedIcon sx={{fontSize:35}}/>
//                     </IconButton>
//                 }
//                 <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'18px'}}>
//                     {likeCount}
//                 </Typography>
//             </Box>

//             <Box sx={{display:'flex',ml:2}}>
//                 {
//                     isBookmark?
//                     <IconButton color="primary" onClick={()=>onClickBookmark(props.id)} sx={{}}>
//                         <BookmarkIcon sx={{fontSize:35}}/>
//                     </IconButton>
//                     :
//                     <IconButton onClick={()=>onClickBookmark(props.id)} sx={{}}>
//                         <BookmarkBorderIcon sx={{fontSize:35}}/>
//                     </IconButton>
//                 }
//                 <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'18px'}}>
//                     {bookmarkCount}
//                 </Typography>
//             </Box>


//         </Box>
//     )
// }