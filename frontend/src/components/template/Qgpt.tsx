"use client";
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
import { Button, Typography } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import cacheRtl from "../../theme/rtl";
import theme from "../../theme/theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import data from "../../json/fakedata.json";
import { useState, useEffect } from "react";
import user from "../../../public/assets/user.jpg";
import Image from "next/image";
import DataAndTime from "../module/DateAndTime";
import qgpt from "../../../public/assets/qgpt.png";
import CircularProgress from "@mui/material/CircularProgress";
import QuestionModal from "../module/QuestionModal";
const { questions } = data;
export default function Qgpt() {
  const [title, setTitle] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [description, setDescription] = React.useState<string>("");
  const [displayedResponse, setDisplayedResponse] = React.useState("");
  const [userActive, setUserActive] = useState<boolean>(false);
  const [promptValue, setPromptValue] = useState("");
  const [loading, setLoading] = React.useState(false);


  const [chats, setChat] = useState<
    { id: number; prompt: string; response: string }[]
  >([]);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeQuestion = (event: SelectChangeEvent) => {
    const selectedQuestion = questions.find(
      (q) => q.title === event.target.value
    );

    if (selectedQuestion) {
      setQuestion(selectedQuestion.title);
      setDescription(selectedQuestion.description);
    }
    console.log(selectedQuestion?.description);
  };

  const handleSendPrompt = async () => {
    setPrompt("");
    setPromptValue(prompt);
    setUserActive(true);
    setLoading(true);
    const newChatEntry = { id: chats.length + 1, prompt: prompt, response: "" };
    setChat((prevChats) => [...prevChats, newChatEntry]);

    try {
      const response = await fetch("http://127.0.0.1:8000/qgpt/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `${prompt}\n ${description}`,
        }),
      });

      const responseData = await response.json();
      const fullResponse = responseData.choices[0].text;
      setDisplayedResponse("");

      for (let i = 0; i < fullResponse.length; i++) {
        setTimeout(() => {
          setDisplayedResponse((prevResponse) => prevResponse + fullResponse[i]);
        }, 50 * i);
      }
  
      setChat((prevChats) => {
        const updatedChats = [...prevChats];
        updatedChats[updatedChats.length - 1].response = fullResponse;
        return updatedChats;
      });
    } catch (error) {
      console.error("Error sending prompt:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    if (displayedResponse !== "") {
      setChat((prevChats) => {
        const updatedChats = [...prevChats];
        updatedChats[updatedChats.length - 1].response = displayedResponse;
        return updatedChats;
      });
    }
  }, [displayedResponse]);


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
                  {questions.map(
                    (q: { id: number; title: string; description: string }) => (
                      <MenuItem key={q.id} value={q.title}>
                        {q.title}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
            {userActive && (
              <>
                {chats.map((chat, index) => (
                  <React.Fragment key={chat.id}>
                    <Grid
                      container
                      spacing={0}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src={user}
                        alt="user picture"
                        width={40}
                        height={40}
                        className="rounded-full ml-1"
                      />
                      <Typography
                        sx={{
                          fontWeight: 1,
                        }}
                      >
                        علی شهرکی
                      </Typography>
                      <DataAndTime />
                    </Grid>
                    <Grid xs={16}>
                      <Typography sx={{ fontWeight: 1 }}>
                        {chat.prompt}
                      </Typography>
                      <QuestionModal text={description} />
                    </Grid>
                    <Box
                      sx={{
                        width: "100%",
                        bgcolor: "#F7FAFC",
                        padding: "12px",
                        gap: "12px",
                        borderRadius: "6px",
                      }}
                      key={chat.id}
                    >
                      <Grid container spacing={0} alignItems="center">
                        <Image
                          src={qgpt}
                          alt="user picture"
                          width={40}
                          height={40}
                          className="rounded-full ml-1"
                        />
                        <Typography
                          sx={{
                            fontWeight: 1,
                          }}
                        >
                          کیو جی چی تی
                        </Typography>
                        <DataAndTime />
                      </Grid>
                      <Grid xs={16}>
                        {index === chats.length - 1 && loading && (
                          <Grid
                            xs={16}
                            sx={{
                              display: "flex",
                              justifyContent: "left",
                              gap: "10px",
                            }}
                          >
                            <Typography key={`writing-${chat.id}`}>
                              در حال نوشتن
                            </Typography>
                            <CircularProgress size={15} />
                          </Grid>
                        )}

                        {/* {!loading && ( */}
                            <Typography key={`response-${chat.id}`} sx={{ fontWeight: 1 }}>
                              {chat.response}
                            </Typography>
                        {/* )} */}
                      </Grid>
                    </Box>
                  </React.Fragment>
                ))}
              </>
            )}
            {!loading && (
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
                    value={prompt}
                    placeholder="سوال خودتون رو اینجا بنویسید"
                    onChange={(event) => setPrompt(event.target.value)}
                  />
                  <Button
                    variant="contained"
                    startIcon={
                      <ArrowBackIcon
                        style={{
                          fontSize: 35,
                          opacity: "50%",
                          marginRight: "10px",
                        }}
                      />
                    }
                    sx={{
                      position: "absolute",
                      right: "8px",
                      top: "8px",
                      backgroundColor: "#EDF2F7",
                      width: "48px",
                      height: "50px",
                      ":hover": {
                        bgcolor: "primary.main",
                        color: "white",
                      },
                    }}
                    onClick={handleSendPrompt}
                  ></Button>
                </div>
              </Grid>
            )}
          </Grid>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}
