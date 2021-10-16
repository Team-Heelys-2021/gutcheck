import React, { useState } from 'react';
import Meditation_Component from '../components/Meditation_Component.js';
import Container from '@mui/material/Container';
import Pulse from '../components/Pulse.js';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const Zen = () => {
  const [isPulsing, setIsPulsing] = useState(false);
  function onPulseClick() {
    setIsPulsing(!isPulsing);
  }

  return (
    <>
      <Grid container pt={15} justifyContent="center">
        <Button variant="contained" size="large" onClick={onPulseClick}>
          Breathe.
        </Button>
      </Grid>
      {/* <Meditation_Component /> */}
      {isPulsing && <Pulse />}
      {/* {!isPulsing && <StillCircle/>} */}
    </>
  );
};

export default Zen;
