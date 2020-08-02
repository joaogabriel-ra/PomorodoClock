import React, { useState, useEffect, useRef } from 'react';
import Header from './components/header';
import Break from './components/break';
import Work from './components/work';
import Timer from './components/timer';
import Grid from '@material-ui/core/Grid';
import './App.css';

function App() {
  const [breakSessionInSeconds, setBreakSessionInSeconds] = useState(300);
  const [workSessionInSeconds, setWorkSessionInSeconds] = useState(1500);
  const [sessionType, setSessionType] = useState('Work');
  const [intervalId, setIntervalId] = useState(null);
  const [timer, setTimer] = useState(workSessionInSeconds);
  const isStarted = intervalId !== null;
  const audio = useRef(null);

  useEffect(() => {
    setTimer(workSessionInSeconds);
  }, [workSessionInSeconds])

  useEffect(() => {
    if (timer === 0) {
      audio.current.play();

      if (sessionType === 'Work') {
        setSessionType('Break');
        setTimer(breakSessionInSeconds);
      }
      else if (sessionType === 'Break') {
        setSessionType('Work')
        setTimer(workSessionInSeconds);
      }
    }
  }, [sessionType, workSessionInSeconds, breakSessionInSeconds, timer]);

  const decrementBreakSessionByOneMinute = () => {
    const newBreakSessionInSeconds = breakSessionInSeconds - 60;

    if (newBreakSessionInSeconds > 0) {
      setBreakSessionInSeconds(newBreakSessionInSeconds);
    }
  };

  const incrementBreakSessionByOneMinute = () => {
    const newBreakSessionInSeconds = breakSessionInSeconds + 60;

    if (newBreakSessionInSeconds <= 1800) {
      setBreakSessionInSeconds(newBreakSessionInSeconds);
    }
  };

  const decrementWorkSessionByOneMinute = () => {
    const newWorkSessionInSeconds = workSessionInSeconds - 60;

    if (newWorkSessionInSeconds > 0) {
      setWorkSessionInSeconds(newWorkSessionInSeconds);
    }
  };

  const incrementWorkSessionByOneMinute = () => {
    const newWorkSessionInSeconds = workSessionInSeconds + 60;

    if (newWorkSessionInSeconds <= 5400) {
      setWorkSessionInSeconds(newWorkSessionInSeconds);
    }
  };

  const handleStartStop = () => {
    if (isStarted) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    else {
      const newIntervalId = setInterval(() => {
        setTimer(timeLeft => timeLeft - 1)
      }, 1000);

      setIntervalId(newIntervalId);
    }
  }

  const handleReset = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setSessionType('Work');
    setWorkSessionInSeconds(1500);
    setBreakSessionInSeconds(300);
    setTimer(1500);
    audio.current.load();
  }

  return (
    <div className="App">
      <Header />
      <Grid container className="clock" style={{ marginTop: 200 }}>
        <Grid item xs={12}>
          <Timer
            timer={timer}
            sessionType={sessionType}
            handleStartStop={handleStartStop}
            isStarted={isStarted ? 'Stop' : 'Start'}
            handleReset={handleReset}
          />
        </Grid>
        <Grid item xs={6}>
          <Break
            breakSessionInSeconds={breakSessionInSeconds}
            incrementBreakSessionByOneMinute={incrementBreakSessionByOneMinute}
            decrementBreakSessionByOneMinute={decrementBreakSessionByOneMinute}
          />
        </Grid>
        <Grid item xs={6}>
          <Work
            workSessionInSeconds={workSessionInSeconds}
            incrementWorkSessionByOneMinute={incrementWorkSessionByOneMinute}
            decrementWorkSessionByOneMinute={decrementWorkSessionByOneMinute}
          />
        </Grid>
        <audio ref={audio}>
          <source src="https://onlineclock.net/audio/options/default.mp3" type="audio/mpeg">
          </source>
        </audio>
      </Grid>
    </div>
  );
}

export default App;