import { getThemeProps } from '@mui/system';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default function Calendar(props) {
  
  const {handleDayClick} = props;
  
  return <DayPicker onDayClick={handleDayClick} disabledDays={{after: new Date()}}/>
}