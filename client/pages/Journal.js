import React, {useState, useEffect} from 'react';
import Calendar from '../components/Calendar.js';
import CalendarModal from '../components/CalendarModal.js';
import axios from 'axios';
import PulsingCircle from '../components/PulsingCircle.js';
import StillCircle from '../components/StillCircle.js';
import Button from '@mui/material/Button';

const Journal = () => {
  const [currentDay, setCurrentDay] = useState(new Date());
  const [journalEntries, setJournalEntries] = useState([]);
  
  // below should be brought over to meditation page
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    async function fetchMyApi() {
      try {
        const fetchedData = await axios.post('/api/dateOfEntry', {date: currentDay});   
        const res = fetchedData;
        setEntries(res.data.entries);
      } catch(e) {
        console.log(e)
      }
    };
    if (currentDay !== undefined) {
      fetchMyApi();
    }
  }, [currentDay]);


  function handleDayClick(day) {
    if (day <= new Date()) {
      setCurrentDay(day => day);
      console.log(day);
      // TODO: acces the correct journal entry from journalEntries based on the day
    }
  }
  
  function onPulseClick() {
    setShowPulse(!showPulse);
  }

  // below references to still and pulsing circle should be moved to meditation
  return <div className='page_calendar_container'>
    <p>Journal Page</p>
    <Button onClick={onPulseClick}>Rythm</Button>
    {showPulse && <PulsingCircle/>}
    {!showPulse && <stillCircle/>}
    <CalendarModal/>
    <Calendar handleDayClick={handleDayClick}/>
  </div>
};
export default Journal;
