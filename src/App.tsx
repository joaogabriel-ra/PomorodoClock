import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material";

import Header from "./components/Header/Header";
import Timer from "./components/Timer/Timer";
import BreakSession from "./components/BreakSession/BreakSession";
import WorkSession from "./components/WorkSession/WorkSession";

import "./App.scss";

function App() {
  const [breakSessionInSeconds, setBreakSessionInSeconds] = useState(300);
  const [workSessionInSeconds, setWorkSessionInSeconds] = useState(1500);
  const [sessionType, setSessionType] = useState("Work");
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  const [timer, setTimer] = useState(workSessionInSeconds);
  const [color, setColor] = useState(false);
  const [pomodoroCounter, setPomodoroCounter] = useState(0);
  const isStarted = intervalId !== null;
  const bell = require("./audio/bell.mp3");

  let token: any;
  let audio = new Audio(bell);

  useEffect(() => {
    setTimer(workSessionInSeconds);
  }, [workSessionInSeconds]);

  useEffect(() => {
    if (timer === 0) {
      audio.play();

      if (sessionType === "Work") {
        if (pomodoroCounter === 4 && sessionType === "Work") {
          setSessionType("Break");
          setTimer(breakSessionInSeconds * 4);
          resetPomodoroCounter();
        } else {
          setSessionType("Break");
          setTimer(breakSessionInSeconds);
          setPomodoroCounter(pomodoroCounter + 1);
        }
      } else if (sessionType === "Break") {
        setSessionType("Work");
        setTimer(workSessionInSeconds);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionType, workSessionInSeconds, breakSessionInSeconds, timer]);

  const resetPomodoroCounter = () => {
    setPomodoroCounter(0);
  };

  const handleStartStop = () => {
    if (isStarted) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      token = setInterval(() => {
        setTimer((timeLeft) => timeLeft - 1);
      }, 1000);

      setIntervalId(token);
    }
  };

  const handleReset = () => {
    clearInterval(intervalId as NodeJS.Timer);
    setIntervalId(null);
    setSessionType("Work");
    setWorkSessionInSeconds(1500);
    setBreakSessionInSeconds(300);
    setTimer(1500);
  };

  const handleIncrementBreakSessionByOneMinute = () => {
    const newBreakSessionInSeconds = breakSessionInSeconds + 60;

    if (newBreakSessionInSeconds <= 1800) {
      setBreakSessionInSeconds(newBreakSessionInSeconds);
    }
  };

  const handleDecrementBreakSessionByOneMinute = () => {
    const newBreakSessionInSeconds = breakSessionInSeconds - 60;

    if (newBreakSessionInSeconds > 0) {
      setBreakSessionInSeconds(newBreakSessionInSeconds);
    }
  };

  const handleIncrementWorkSessionByOneMinute = () => {
    const newWorkSessionInSeconds = workSessionInSeconds + 60;

    if (newWorkSessionInSeconds <= 5400) {
      setWorkSessionInSeconds(newWorkSessionInSeconds);
    }
  };

  const handleDecrementWorkSessionByOneMinute = () => {
    const newWorkSessionInSeconds = workSessionInSeconds - 60;

    if (newWorkSessionInSeconds > 0) {
      setWorkSessionInSeconds(newWorkSessionInSeconds);
    }
  };

  //#region Styled Components
  const theme = createTheme({
    palette: {
      mode: color ? "dark" : "light",
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
    },
  });

  //Code copied 20/01/2022 from https://mui.com/components/switches/
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));
  //#endregion

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header />
        <div style={{ float: "right" }}>
          <MaterialUISwitch
            role="switch"
            sx={{ m: 1 }}
            checked={color}
            onChange={() => setColor(!color)}
          />
        </div>
        <Grid container className="clock" style={{ marginTop: 100 }}>
          <Grid item xs={12}>
            <Timer
              timer={timer}
              sessionType={sessionType}
              isStarted={isStarted}
              handleStartStop={handleStartStop}
              handleReset={handleReset}
            />
          </Grid>
          <Grid item xs={6}>
            <BreakSession
              breakSessionInSeconds={breakSessionInSeconds}
              handleIncrementBreakSessionByOneMinute={
                handleIncrementBreakSessionByOneMinute
              }
              handleDecrementBreakSessionByOneMinute={
                handleDecrementBreakSessionByOneMinute
              }
            />
          </Grid>
          <Grid item xs={6}>
            <WorkSession
              workSessionInSeconds={workSessionInSeconds}
              handleIncrementWorkSessionByOneMinute={
                handleIncrementWorkSessionByOneMinute
              }
              handleDecrementWorkSessionByOneMinute={
                handleDecrementWorkSessionByOneMinute
              }
            />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
