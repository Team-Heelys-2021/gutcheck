import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useOktaAuth } from '@okta/okta-react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import Calendar from '../components/Calendar.js';
import RichTextEditor from '../components/RichTextEditor.js';

const Journal = (props) => {
  const [currentDate, setcurrentDate] = useState(new Date());
  const [journalContent, setJournalContent] = useState();
  const [initContent, setInitContent] = useState();
  const { authState } = useOktaAuth();
  useAuth();

  if (authState && !authState.isAuthenticated) {
    history.replace('/login');
  }

  useEffect(() => {
    if (authState?.isAuthenticated && journalContent) {
      console.log('currContent: ', journalContent);
      const reqBody = {
        date: currentDate,
        content: JSON.stringify(journalContent),
      };
      axios.post('/api/createJournalEntry', reqBody).then((res) => {
        console.log('post entry: ', res);
        if (res.data.journalEntry != null) {
          const fetchedContent = JSON.parse(res.data.journalEntry.content);
          setInitContent(fetchedContent);
        }
      });
    }
  }, [journalContent]);

  useEffect(() => {
    if (authState?.isAuthenticated) {
      console.log('first useEffect')
      const formattedDate = currentDate.toISOString().split('T')[0];
      axios.get('/api/journalEntry/' + formattedDate).then((res) => {
        console.log('date: ', formattedDate);
        console.log('entry: ', res);
        if (res.data.journalEntry != null) {
          const fetchedContent = JSON.parse(res.data.journalEntry.content);
          console.log('content: ', fetchedContent);
          setInitContent(fetchedContent);
        } else {
          setInitContent(undefined);
        }
      });
    }
  }, [currentDate]);

  function handleDayClick(day) {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    if (day < tomorrow) {
      setcurrentDate(day);
    }
  }

  return (
    <div>
      <Box>
        <Container>
          <Grid container rowSpacing={2}>
            <Grid item xs={8}>
              <RichTextEditor
                currentDate={currentDate}
                updateContent={setJournalContent}
                initContent={initContent}
                colorTheme={props.colorTheme}
              />
            </Grid>
            <Grid item xs={4} id="calendar_container">
              <Calendar
                handleDayClick={handleDayClick}
                selectedDay={currentDate}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};
export default Journal;
