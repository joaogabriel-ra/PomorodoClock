import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";
import moment from "moment";
import React from "react";

type Props = {
  workSessionInSeconds: number;
  handleIncrementWorkSessionByOneMinute: () => void;
  handleDecrementWorkSessionByOneMinute: () => void;
};

const WorkSession: React.FC<Props> = ({
  workSessionInSeconds,
  handleIncrementWorkSessionByOneMinute,
  handleDecrementWorkSessionByOneMinute,
}) => {
  const workSessionInMinutes = moment
    .duration(workSessionInSeconds, "s")
    .asMinutes();

  return (
    <div>
      <p>
        <strong>Work Session</strong>
      </p>
      <p>{workSessionInMinutes} minutes</p>
      <IconButton
        role="decrement-work"
        color="primary"
        onClick={handleDecrementWorkSessionByOneMinute}
      >
        <RemoveCircleIcon />
      </IconButton>
      <IconButton
        role="increment-work"
        color="primary"
        onClick={handleIncrementWorkSessionByOneMinute}
      >
        <AddCircleIcon />
      </IconButton>
    </div>
  );
};

export default WorkSession;
