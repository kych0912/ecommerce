import {Box} from '@mui/material';
import {API_URL} from '../../../../../API/URL/url';

export default function Shoes_Tabs_Detail(props){
    return (
        <Box sx={{width:"100%"}}>
            <Box sx={{position:'relative',backgroundColor:'#f4f4f4',width:'100%',height:"auto"}}>
                <img src={`${API_URL}/api/file/${props.clothes.detail}`} style={{position:"absolute",width:"100%",height:"100%",objectFit:'contain',objectPosition:'contain'}}/>
            </Box>
        </Box>
    )
}