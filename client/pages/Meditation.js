import * as React from 'react';
import Meditation_Component from '../components/Meditation_Component.js';
import Container from '@mui/material/Container';
import Pulse from '../components/Pulse.js';

const Zen = () => {
  return (
    <>
      <p>Meditation Page</p>
        <Container>
          <Meditation_Component />
          <Pulse />
        </Container>
    </>
  );
};

export default Zen;
