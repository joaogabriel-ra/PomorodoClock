import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";
import moment from "moment";
import React from "react";

type Props = {
  breakSessionInSeconds: number;
  handleIncrementBreakSessionByOneMinute: () => void;
  handleDecrementBreakSessionByOneMinute: () => void;
  isStarted: boolean;
};

const BreakSession: React.FC<Props> = ({
  breakSessionInSeconds,
  handleIncrementBreakSessionByOneMinute,
  handleDecrementBreakSessionByOneMinute,
  isStarted,
}) => {
  const breakSessionInMinutes = moment
    .duration(breakSessionInSeconds, "s")
    .asMinutes();

  return (
    <div>
      <p>
        <strong>Break Session</strong>
      </p>
      <p>{breakSessionInMinutes} minutes</p>
      <IconButton
        role="decrement-break"
        color="primary"
        onClick={handleDecrementBreakSessionByOneMinute}
        disabled={isStarted}
      >
        <RemoveCircleIcon />
      </IconButton>
      <IconButton
        role="increment-break"
        color="primary"
        onClick={handleIncrementBreakSessionByOneMinute}
        disabled={isStarted}
      >
        <AddCircleIcon />
      </IconButton>
    </div>
  );
};

export default BreakSession;
