import React from 'react';
import moment from 'moment';
import momentDurationFormat from 'moment-duration-format';
import Button from '@material-ui/core/Button';

momentDurationFormat(moment);

const Timer = ({
    timer,
    sessionType,
    handleStartStop,
    isStarted,
    handleReset
}) => {
    const timerFormatted = moment.duration(timer, 's').format('mm:ss');

    return (
        <div>
            <h2>Ready? <span role="img" aria-label="clock">⏰</span></h2>
            <p><strong>{sessionType}</strong></p>
            <p>Time left: {timerFormatted}</p>
            <Button color="primary" variant="contained" onClick={handleReset} style={{ borderRadius: 25, margin: 5 }}>Reset</Button>
            <Button color="primary" variant="contained" onClick={handleStartStop} style={{ borderRadius: 25, margin: 5 }}>{isStarted}</Button>
        </div>
    );
}

export default Timer;
