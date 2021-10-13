import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// import Item from '@mui/material/Item';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,

  padding: theme.spacing(1),

  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Meditation_Component() {

    return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
            <Button variant="contained" href="#contained-buttons">Link</Button>
            </Grid>
            <Grid item xs={4}>
              <Item>xs=4</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>xs=4</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>xs=8</Item>
            </Grid>
          </Grid>
        </Box>
      )
    };
