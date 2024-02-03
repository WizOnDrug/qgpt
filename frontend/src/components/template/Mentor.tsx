import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { ThemeProvider } from "@mui/material/styles";
import { MuiFileInput } from "mui-file-input";
import { toast } from "react-toastify";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import DragAndDrop from "../module/Draganddrup";
import { Button, ListItem } from "@mui/material";
import theme from "../../theme/theme";
import data from "../../json/fakedata.json";
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

export default function Mentor() {
  const [title, setTitle] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [file, setFile] = React.useState(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const MAX_FILE_SIZE_MB = 2;
  const { quetions } = data;
  const handleChange = (newFile: any) => {
    if (
      newFile &&
      newFile.size &&
      newFile.size > MAX_FILE_SIZE_MB * 1024 * 1024
    ) {
      toast.error("سایز فایل بیشتر از ۲ مگابایت است!");
      return;
    }

    setFile(newFile);
  };
  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
                id="outlined-basic"
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
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ opacity: 0.8, fontWeight: 1 }}
                >
                  مسئله
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-label"
                  value={question}
                  label="مسئله"
                  onChange={handleChangeQuestion}
                  sx={{ fontWeight: "1" }}
                >
                  {data.quetions.map(
                    (q: { id: number; title: string; description: string }) => (
                      <MenuItem key={q.id} value={q.title}>
                        {q.title}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={16}>
              <MuiFileInput
                fullWidth
                placeholder="ضمیمه پاسخ ارسالی"
                value={file}
                onChange={handleChange}
                inputRef={fileInputRef}
                InputProps={{
                  endAdornment: (
                    <AttachFileOutlinedIcon
                      sx={{
                        fontWeight: 1,
                        opacity: 0.8,
                        cursor: "pointer",
                      }}
                      onClick={handleIconClick}
                    />
                  ),
                  sx: {
                    fontWeight: 1,
                    opacity: 0.8,
                  },
                }}
              />
            </Grid>
            <Grid xs={16} sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-textarea-label" sx={{ fontSize: 16 }}>
                متن
              </InputLabel>
              <BaseTextareaAutosize
                minRows={3}
                style={{
                  width: "100%",
                  border: "1px solid #718096",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  gap: " 10px",
                }}
                placeholder=" لطفا مشکلی که باهاش مواجه شدید رو اینجا توضیح بدید. همچنین بخش‌های اصلی کدتون رو هم شرح بدید."
              />
            </Grid>
            <Grid xs={16}>
              <DragAndDrop />
            </Grid>
            <Grid xs={8}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#EDF2F7" }}
                className="w-40 h-10"
              >
                ارسال
              </Button>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}
