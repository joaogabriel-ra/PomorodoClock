import React from 'react';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const Work = ({
    workSessionInSeconds,
    incrementWorkSessionByOneMinute,
    decrementWorkSessionByOneMinute,
}) => {

    const workSessionInMinutes = moment.duration(workSessionInSeconds, 's').asMinutes();

    return (
        <div>
            <p><strong>Work Session</strong></p>
            <p>{workSessionInMinutes} minutes</p>
            <IconButton color="primary" onClick={decrementWorkSessionByOneMinute}>
                <RemoveCircleIcon />
            </IconButton>
            <IconButton color="primary" onClick={incrementWorkSessionByOneMinute}>
                <AddCircleIcon />
            </IconButton>
        </div>
    );
};

export default Work;