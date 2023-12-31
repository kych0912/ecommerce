import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
      primary: {
        main: "#A1BBFF",
        // light: main값을 통해 계산됨
  	    // dark: main값을 통해 계산됨
        // contrastText: main값을 통해 계산됨
      },
      gray:{
        main:'#E8E8E8',
      },
    },
    typhography: {
      fontFamily: [
        'Pretendard Variable',
      ]
    }
});


export default theme;