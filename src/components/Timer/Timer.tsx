import Button from "@mui/material/Button";
import React from "react";

type Props = {
  timer: number;
  sessionType: string;
  isStarted: boolean;
  handleStartStop: () => void;
  handleReset: () => void;
};

const Timer: React.FC<Props> = ({
  timer,
  sessionType,
  isStarted,
  handleStartStop,
  handleReset,
}) => {
  const moment = require("moment");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const momentDurationFormatSetup = require("moment-duration-format");
  const timerFormatted = moment.duration(timer, "s").format("mm:ss");

  return (
    <div>
      <h2>
        Ready?{" "}
        <span role="img" aria-label="clock">
          ⏰
        </span>
      </h2>
      <p>
        <strong>{sessionType}</strong>
      </p>
      <p>Time left: {timerFormatted}</p>
      <Button
        role="handle-reset"
        color="primary"
        variant="contained"
        onClick={handleReset}
        style={{ borderRadius: 25, margin: 5 }}
      >
        Reset
      </Button>
      <Button
        role="handle-start-stop"
        color="primary"
        variant="contained"
        onClick={handleStartStop}
        style={{ borderRadius: 25, margin: 5 }}
      >
        {isStarted ? "Stop" : "Start"}
      </Button>
    </div>
  );
};

export default Timer;
