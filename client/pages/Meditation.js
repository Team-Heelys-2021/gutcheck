import React, { useState } from 'react';
import Meditation_Component from '../components/Meditation_Component.js';
import Container from '@mui/material/Container';
import Pulse from '../components/Pulse.js';
import Button from '@mui/material/Button';

const Zen = () => {
  const [isPulsing, setIsPulsing] = useState(false);
  function onPulseClick() {
    setIsPulsing(!isPulsing);
  }

  return (
    <>
      <Button xs={12} variant="contained" size="large" onClick={onPulseClick}>
        Breathe.
      </Button>
      {/* <Meditation_Component /> */}
      {isPulsing && <Pulse />}
      {/* {!isPulsing && <StillCircle/>} */}
    </>
  );
};

export default Zen;
