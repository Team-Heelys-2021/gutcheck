import * as React from 'react';
import Countdown from 'react-countdown';

const Timer = (props) => {
  return (
    <Countdown
      date={Date.now() + props.durationInSeconds * 1000}
      key={props.durationInSeconds * Math.random()}
      onComplete={(t) => {
        console.log(t);
      }}
    />
  );
};

export default Timer;
