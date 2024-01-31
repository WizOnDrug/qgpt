"use client"
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { yekan } from "@/utils/fonts";
import Qgpt from "./Qgpt";
import Mentor from "./Mentor";
import { createTheme,ThemeProvider } from '@mui/material/styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
let theme = createTheme({
    palette: {
      primary: {
        main: '#0EA7DA',
      },
      secondary: {
        main: '#edf2ff',
      },
    },
    typography:{
        fontFamily:yekan as any,
    }
  });
  

function CustomTabPanel(props: TabPanelProps) {
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
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontFamily: yekan }}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const HomePage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
      <div className="w-[690px]">
        <p
          className="text-right text-black text-sm font-light leading-normal p-[12px]"
        >
          بررسی کدی که نوشتید و رفع خطا توسط خودتون یکی از مفیدترین کارها برای
          پیشرفت مهارت برنامه‌نویسیه! اگر به اندازه کافی تلاش کردید و وقت خوبی
          برای رفع خطا گذاشتید و به نتیجه نرسیدید، ما اینجاییم که در فرایند
          دیباگ کردن بهتون کمک کنیم.
        </p>
        <ThemeProvider theme={theme}>
        <Box>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              sx={{
                borderColor: "primary",
                borderRadius: "8px",
                width:"100%",
                marginTop:"24px",
                boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)",
              }}
            >
              <Tab label=" سوال از ربات QGPT" sx={{ fontSize: '18px',width:"100%"}} {...a11yProps(0)} />
              <Tab label="سوال از مربی‌های دوره" sx={{ fontSize: '18px',width:"100%"}} {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
           <Qgpt/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Mentor/>
          </CustomTabPanel>
        </Box>
      </ThemeProvider>
      </div>
  );
};

export default HomePage;
