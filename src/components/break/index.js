import React from 'react';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const Break = ({
    breakSessionInSeconds,
    incrementBreakSessionByOneMinute,
    decrementBreakSessionByOneMinute,
}) => {

    const breakSessionInMinutes = moment.duration(breakSessionInSeconds, 's').asMinutes();

    return (
        <div>
            <p><strong>Break Session</strong></p>
            <p>{breakSessionInMinutes} minutes</p>
            <IconButton color="primary" onClick={decrementBreakSessionByOneMinute}>
                <RemoveCircleIcon />
            </IconButton>
            <IconButton color="primary" onClick={incrementBreakSessionByOneMinute}>
                <AddCircleIcon />
            </IconButton>
        </div>
    );
};

export default Break;