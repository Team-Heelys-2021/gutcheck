import React, {useState, useEffect} from 'react';
import Calendar from '../components/Calendar.js';
import CalendarModal from '../components/CalendarModal.js';

const Journal = () => {
  const [currentDay, setCurrentDay] = useState(new Date());
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    async function fetchMyApi() {
      const fetchedData = await fetch('');
      const res = await fetchedData.json();
      setJournalEntries(res);
    }
    fetchMyApi();
  }, []);

  // TODO: figure out whether useEffect is right tool for modal (onClick?) 

  function handleDayClick(day) {
    const currentDay = new Date();
    if (day <= currentDay) {
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
