import * as React from 'react';
import axios from 'axios';
import AppBar from '../components/AppBar';
import BarChart from '../components/BarChart';

export default function Dashboard() {
  return (
    <div>
      <AppBar />
      <BarChart />
    </div>
  );
}
