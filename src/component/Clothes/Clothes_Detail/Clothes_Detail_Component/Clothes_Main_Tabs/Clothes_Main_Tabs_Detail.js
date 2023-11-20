import {Box} from '@mui/material';
import {API_URL} from '../../../../../API/URL/url';

export default function Clothes_Tabs_Detail(props){
    return (
        <Box sx={{width:"100%",height:"100%",display:"flex",justifyContent:"center",flexDirection:"column"}}>
            <img src={`https://img.29cm.co.kr/item/202309/11ee56a5f82523f183bc2f25b9d45eda.jpeg`} style={{display:"inline",width:"100%",height:"100%",objectFit:'contain',objectPosition:'contain'}}/>
            <img src={`https://img.29cm.co.kr/item/202308/11ee3bfbece059d4acc5a9aeb1a2cd86.jpeg`} style={{display:"inline",width:"100%",height:"100%",objectFit:'contain',objectPosition:'contain'}}/>
            <img src={`https://img.29cm.co.kr/item/202308/11ee3bfbef9a49e9a3d84763feecf6ae.jpeg`} style={{display:"inline",width:"100%",height:"100%",objectFit:'contain',objectPosition:'contain'}}/>
        </Box>
    )
}