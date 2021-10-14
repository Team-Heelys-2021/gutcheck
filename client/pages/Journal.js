import React, {useState, useEffect} from 'react';
import Calendar from '../components/Calendar.js';
import CalendarModal from '../components/CalendarModal.js';
import axios from 'axios';

const Journal = () => {
  const [currentDay, setCurrentDay] = useState(new Date());
  const [journalEntries, setJournalEntries] = useState([]);

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
  
  return <div className='page_calendar_container'>
    <p>Journal Page</p>
    <CalendarModal/>
    <Calendar handleDayClick={handleDayClick}/>
  </div>
};
export default Journal;
