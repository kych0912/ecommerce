import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Button,Typography } from '@mui/material';
import styled from "styled-components"

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
    display: 'inline-block',
    cursor: 'pointer'
  });

export default function Navbar(props) {
    const [value, setValue] = React.useState('recents');

    const navigate = useNavigate();


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const encodeFileToBase64 = (image) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);    
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageUpload = async (e) => {
        const fileArr = e.target.files;
        props.setBase64s([]);

        let file;
        let maxFile = 10;
        let filesLength = fileArr.length > maxFile ? maxFile : fileArr.length;

        if (fileArr.length > maxFile) {
            alert(`한번에 업로드 가능한 사진은 최대 ${maxFile}장 까지 입니다.`);
        }

        for (let i = 0; i < filesLength; i++) {
            file = fileArr[i];

            console.log(file);

            if (file.type !== "image/jpeg" && file.type !== "image/jpg") {
                alert(`JPG 사진 파일만 가능합니다.`);
                break;
            } else {
                try {
                    const data = await encodeFileToBase64(file);

                    props.setBase64s((prev) => [...prev, data ]);
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

  return (
    <Box sx={{display:'flex',alignItems:"center", position: 'fixed', bottom: 0, left: '50%', right: 0,width:'95%',minWidth:'342px',maxWidth:'399px',transform:'translate(-50%,0)',zIndex:2,height:'65px',borderTop:1,borderTopColor:'#EDEDED',backgroundColor:'#ffffff' }} elevation={0}>
        <Label for="input-file">
            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:"100%",ml:0.5}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'16px'}}>
                    사진
                </Typography>
            </Box>
        </Label>

        <VisuallyHiddenInput
            id="input-file"
            multiple   
            name="photo_file"
            accept=".jpg"
            onChange={handleImageUpload}
            type="file"
        />
    </Box>
  );
}

const Label = styled.label`
    width:100%;
`