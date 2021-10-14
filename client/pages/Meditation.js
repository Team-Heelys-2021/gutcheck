import * as React from 'react';
import Meditation_Component from '../components/Meditation_Component.js';
import Container from '@mui/material/Container';

const Zen = () => {
  return (
    <>
      <p>Meditation Page</p>
        <Container>
          <Meditation_Component />
        </Container>
    </>
  );
};

export default Zen;
