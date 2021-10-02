import * as React from 'react';
import axios from 'axios';
import AppBar from '../components/AppBar';
import BarChart from '../components/BarChart';
import { useOktaAuth } from '@okta/okta-react'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const [data, setData] = React.useState(null)
  const { authState } = useOktaAuth()
  useAuth()


  React.useEffect(() => {
    if (authState?.isAuthenticated) fetchDashboardData()
  }, [authState])

  const fetchDashboardData = async () => {
    const { data } = await axios.get('/api/dashboard')
    setData(data)
  }

  return (
    <div>
      <AppBar />
      {data?.length && <BarChart entries={data} />}
    </div>
  );
} 
  