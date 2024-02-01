import { createTheme } from "@mui/material";
import { yekan } from "@/utils/fonts";

let theme = createTheme({
    palette: {
      primary: {
        main: "#0EA7DA",
      },
      secondary: {
        main: "#edf2ff",
      },
    },
    typography: {
      fontSize: 14 ,
      fontFamily: yekan 
    },
    direction: "rtl",
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: { color: "red" },
        },
      },
    },
  });
  
export default theme;