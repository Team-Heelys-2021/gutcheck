import React, { useState, useReducer } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Timer from './Timer.js';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Meditation_Component() {
    const [durationInSeconds, setDurationInSeconds] = useState(0);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    function setDurationInMinutes(duration) {
      setDurationInSeconds(duration * 60); 
      forceUpdate()
    }

    return (
        <Grid>
            <Stack direction="row" spacing={6} alignItems="center" justifyContent="center">
              <Button variant="contained" onClick={() => {setDurationInMinutes(0.1) }}>1 minute</Button>
              <Button variant="contained" onClick={() => {setDurationInMinutes(3) }}>3 minutes</Button>
              <Button variant="contained" onClick={() => {setDurationInMinutes(5) }}>5 minutes</Button>
              <Button variant="contained" onClick={() => {setDurationInMinutes(10) }}>10 minutes</Button>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="center" pt={6}>
              <Timer durationInSeconds={durationInSeconds} />
            </Stack>
        </Grid>
      )
    };

