import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import cacheRtl from "../../theme/rtl";
import theme from "../../theme/theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Qgpt() {
  const [title, setTitle] = React.useState("");
  const [question, setQuestion] = React.useState("");

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeQuestion = (event: SelectChangeEvent) => {
    setQuestion(event.target.value);
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
            flexGrow: 1,
          }}
          noValidate
          autoComplete="on"
        >
          <Grid container spacing={2} columns={16}>
            <Grid xs={8}>
              <TextField
                required
                id="outlined-required"
                label="عنوان سوال"
                variant="outlined"
                value={title}
                fullWidth
                onChange={handleChangeTitle}
                InputLabelProps={{
                  sx: {
                    fontWeight: 1,
                    opacity: 0.8,
                  },
                }}
              />
            </Grid>
            <Grid xs={8}>
              <FormControl fullWidth required>
                <InputLabel
                  id="demo-simple-select-required-label"
                  sx={{ opacity: 0.8, fontWeight: 1 }}
                >
                  مسئله
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={question}
                  label="مسئله"
                  onChange={handleChangeQuestion}
                  sx={{ fontWeight: "1" }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={16}>
              <div style={{ position: "relative" }}>
                <BaseTextareaAutosize
                  minRows={2}
                  style={{
                    width: "100%",
                    border: "1px solid rgba(113, 128, 150,0.2)",
                    borderRadius: "6px",
                    padding: "9px 12px",
                    gap: " 10px",
                    fontWeight: 1,
                  }}
                  placeholder="سوال خودتون رو اینجا بنویسید"
                />
                <Button
                variant="contained"
                  startIcon={<ArrowBackIcon style={{ fontSize: 35,opacity:"50%",marginRight:"10px" }}/>}
                  sx={{
                    position: "absolute",
                    right: "8px",
                    top: "8px",
                    backgroundColor: "#EDF2F7",
                    width: "48px",
                    height: "50px",
                    ':hover': {
                        bgcolor: 'primary.main', 
                        color: 'white',
                      },
                  }}
                ></Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}
