import {Box} from '@mui/material';
import {API_URL} from '../../../../../API/URL/url';

export default function Shoes_Tabs_Detail(props){
    return (
        <Box sx={{width:"100%",height:"100%",display:"flex",justifyContent:"center",flexDirection:"column"}}>
            <img src={`https://image.musinsa.com/images/prd_img/2022070114375600000093242.jpg`} style={{display:"inline",width:"100%",height:"100%",objectFit:'contain',objectPosition:'contain'}}/>
            <img src={`https://image.musinsa.com/images/prd_img/2022032917465400000010650.jpg`} style={{display:"inline",width:"100%",height:"100%",objectFit:'contain',objectPosition:'contain'}}/>
            <img src={`https://image.msscdn.net/display/images/common/2023/07/24/b0c1ce6ef6cb42468b7d322244147993.jpg`} style={{display:"inline",width:"100%",height:"100%",objectFit:'contain',objectPosition:'contain'}}/>
        </Box>
    )
}