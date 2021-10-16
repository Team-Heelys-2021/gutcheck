import { getThemeProps } from '@mui/system';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default function Calendar(props) {
  
  const {handleDayClick} = props;
  const today = new Date()
  const selectedDay = props.selectedDay ? props.selectedDay : today
  
  return <DayPicker onDayClick={handleDayClick} disabledDays={{after: today}} selectedDays={selectedDay}/>
}