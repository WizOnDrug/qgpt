"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yekan } from "@/utils/fonts";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import Button from "@mui/material/Button";
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
    fontFamily: yekan as any,
    fontSize: 14 as any,
    fontWeightBold: 1,
  },
  direction: "rtl",
});
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});
const FilterList = () => {
  const [open, setOpen] = React.useState(false);
  const [problem, setProblem] = React.useState<number>(30);
  const [status, setStatus] = React.useState<number>(20);
  const [category, setCategory] = React.useState<number>(10);

  React.useEffect(() => {
    console.log("Problem:", problem);
  }, [problem]);

  React.useEffect(() => {
    console.log("Status:", status);
  }, [status]);

  React.useEffect(() => {
    console.log("Category:", category);
  }, [category]);

  const handleProblemChange = (event: SelectChangeEvent) => {
    setProblem(Number(event.target.value));
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(Number(event.target.value));
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(Number(event.target.value));
  };
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          className="border-b-2 border-slate-200"
        >
          <ListItemButton
            onClick={handleClick}
            sx={{ ":hover": { backgroundColor: "transparent" } }}
          >
            <ListItemText primary="فیلتر" sx={{ fontWeight: "1" }} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                className="flex-col"
                sx={{ ":hover": { backgroundColor: "transparent" } }}
              >
                <Typography
                  sx={{
                    fontFamily: yekan,
                    fontWeight: "1",
                    marginRight: "auto",
                  }}
                >
                  مسئله ها
                </Typography>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <Select
                    labelId="problem-label"
                    id="problem-select"
                    value={`${problem}`}
                    onChange={handleProblemChange}
                    sx={{ fontWeight: "1", height: "35px" }}
                  >
                    <MenuItem value={30}>
                      <p>همه سوالات</p>
                    </MenuItem>
                    <MenuItem value={1}>۱ ساعت گذشته</MenuItem>
                    <MenuItem value={2}>۲۴ ساعت گذشته</MenuItem>
                    <MenuItem value={3}>هفته گذشته</MenuItem>
                  </Select>
                </FormControl>
              </ListItemButton>
              <ListItemButton
                className="flex-col"
                sx={{ ":hover": { backgroundColor: "transparent" } }}
              >
                <Typography
                  sx={{
                    fontFamily: yekan,
                    fontWeight: "1",
                    marginRight: "auto",
                  }}
                >
                  وضعیت
                </Typography>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <Select
                    labelId="status-label"
                    id="status-select"
                    value={`${status}`}
                    onChange={handleStatusChange}
                    sx={{ fontWeight: "1", height: "35px" }}
                  >
                    <MenuItem value={20}>
                      <p>همه</p>
                    </MenuItem>
                    <MenuItem value={4}>۱ ساعت گذشته</MenuItem>
                    <MenuItem value={5}>۲۴ ساعت گذشته</MenuItem>
                    <MenuItem value={6}>هفته گذشته</MenuItem>
                  </Select>
                </FormControl>
              </ListItemButton>
              <ListItemButton
                className="flex-col"
                sx={{ ":hover": { backgroundColor: "transparent" } }}
              >
                <Typography
                  sx={{
                    fontFamily: yekan,
                    fontWeight: "1",
                    marginRight: "auto",
                  }}
                >
                  دسته بندی
                </Typography>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <Select
                    labelId="category-label"
                    id="category-select"
                    value={`${category}`}
                    onChange={handleCategoryChange}
                    sx={{ fontWeight: "1", height: "35px" }}
                  >
                    <MenuItem value={10}>
                      <p>همه</p>
                    </MenuItem>
                    <MenuItem value={7}>۱ ساعت گذشته</MenuItem>
                    <MenuItem value={8}>۲۴ ساعت گذشته</MenuItem>
                    <MenuItem value={9}>هفته گذشته</MenuItem>
                  </Select>
                </FormControl>
              </ListItemButton>
            </List>
            <ListItemButton
              sx={{ ":hover": { backgroundColor: "transparent" } }}
            >
              <Button variant="contained" color="primary" className="w-[100%]">
                اعمال فیلتر
              </Button>
            </ListItemButton>
          </Collapse>
        </List>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default FilterList;
