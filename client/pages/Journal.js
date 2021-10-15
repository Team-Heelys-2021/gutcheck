import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import Calendar from '../components/Calendar.js';
import RichTextEditor from '../components/RichTextEditor.js';


const Journal = () => {
  const [currentDate, setcurrentDate] = useState(new Date());
  const [journalEntries, setJournalEntries] = useState({});

  // useEffect(() => {
  //   async function fetchMyApi() {
  //     const fetchedData = await fetch('');
  //     const res = await fetchedData.json();
  //     setJournalEntries(res);
  //   }
  //   fetchMyApi();
  // }, []);


  function handleDayClick(day) {
    if (day <= new Date()) {
      setcurrentDate(day);
    }
  }

  return (
    <div>
      <Box> 
        <Container>
          <Grid container rowSpacing={2}>
            <Grid item xs={8}> 
              <RichTextEditor />
            </Grid>
            <Grid item xs={4} id="calendar_container"> 
              <Calendar handleDayClick={handleDayClick} selectedDay={currentDate} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};
export default Journal;
