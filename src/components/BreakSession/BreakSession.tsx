import React from "react";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

type Props = {
  breakSessionInSeconds: number;
  handleIncrementBreakSessionByOneMinute: () => void;
  handleDecrementBreakSessionByOneMinute: () => void;
};

const BreakSession: React.FC<Props> = ({
  breakSessionInSeconds,
  handleIncrementBreakSessionByOneMinute,
  handleDecrementBreakSessionByOneMinute,
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
      >
        <RemoveCircleIcon />
      </IconButton>
      <IconButton
        role="increment-break"
        color="primary"
        onClick={handleIncrementBreakSessionByOneMinute}
      >
        <AddCircleIcon />
      </IconButton>
    </div>
  );
};

export default BreakSession;
