import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Detail from "./Shoes_Main_Tabs/Shoes_Main_Tabs_Detail"
import Review from "./Shoes_Main_Tabs/Shoes_Main_Tabs_Review"

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                <Tab label="상품정보" {...a11yProps(0)} sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',color:'#8E8D8D'}}/>
                <Tab label="리뷰" {...a11yProps(1)} sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',color:'#8E8D8D'}}/>
                <Tab label="문의" {...a11yProps(2)} sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',color:'#8E8D8D'}}/>
            </Tabs>
        </Box>
            <CustomTabPanel value={value} index={0}>
                <Detail clothes={props.shoes}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Review/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
            
            </CustomTabPanel>
    </Box>
  );
}