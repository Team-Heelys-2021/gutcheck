import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useOktaAuth } from '@okta/okta-react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import Calendar from '../components/Calendar.js';
import RichTextEditor from '../components/RichTextEditor.js';


const Journal = () => {
  const [currentDate, setcurrentDate] = useState(new Date());
  const [journalContent, setJournalContent] = useState({});
  const { authState } = useOktaAuth();
  useAuth();

  if (authState && !authState.isAuthenticated) {
    history.replace('/login');
  }

  useEffect(() => {
    if (authState?.isAuthenticated && journalContent != {}){
      console.log('currContent: ', journalContent)
      const reqBody = {
        date: currentDate,
        content: JSON.stringify(journalContent),
      }
      axios.post('/api/createJournalEntry', reqBody).then((res) => {
        console.log(res)
      })

    }
  }, [journalContent])

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
              <RichTextEditor currentDate={currentDate} updateContent={setJournalContent} />
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
