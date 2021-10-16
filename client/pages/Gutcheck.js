import React, { useState, useEffect, useLayoutEffect } from 'react';
import AppBar from '../components/AppBar';
import EntryList from '../components/EntryList';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';
import { useFoods } from '../hooks/useFoods';
import { useAuth } from '../hooks/useAuth';
import Thermometer from '../components/Thermometer';
import BarChart from '../components/BarChart';
import Calendar from '../components/Calendar.js';

const Gutcheck = () => {
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [entries, setEntries] = useState([]);
  const history = useHistory();
  const { authState } = useOktaAuth();
  const { foodsList, doFoodsSearch } = useFoods();
  const [data, setData] = useState(null);
  const [currentDate, setcurrentDate] = useState();
  useAuth();

  if (authState && !authState.isAuthenticated) {
    history.replace('/login');
  }

  useLayoutEffect(() => {
    async function fetchMyApi() {
      try {
        const fetchedData = await axios.post('/api/dateOfEntry', {
          date: currentDate,
        });
        const res = fetchedData;
        setEntries(res.data.entries);
      } catch (e) {
        console.log(e);
      }
    }
    if (currentDate !== undefined) {
      fetchMyApi();
    }
  }, [currentDate]);

  useEffect(() => {
    if (search.length > 1) {
      searchFoods(search);
    }
  }, [search]);

  useEffect(() => {
    if (authState?.isAuthenticated) {
      axios.get('/api/entry').then(({ data: { entries } }) => {
        setEntries(entries);
      });
      fetchDashboardData();
    }
  }, [authState]);

  useEffect(() => {
    if (selectedValue) {
      syncEntries(selectedValue).then((entryId) => {
        if (entryId) {
          const food = { entryId, ...selectedValue };
          setEntries([...entries, food]);
          setSearch('');
          setSelectedValue(null);
        } else {
          throw new Error('Failed to save entry');
        }
      });
    }
  }, [selectedValue]);

  function handleDayClick(day) {
    if (day <= new Date()) {
      setcurrentDate(day);
    }
  }

  const syncEntries = async (food) => {
    const reqBody = { food }
    if (currentDate) {
      reqBody['date'] = currentDate;
    }
    const {
      data: { entryId },
    } = await axios.post('/api/entry', reqBody);
    fetchDashboardData();
    return entryId;
  };

  const searchFoods = async () => {
    await doFoodsSearch(search);
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      await axios.delete(`/api/entry/${entryId}`);
      const newEntries = entries.filter((entry) => entry.entryId !== entryId);
      setEntries(newEntries);
      fetchDashboardData();
    } catch (e) {
      console.log('An error occurred when deleting ', entryId);
    }
  };

  const fetchDashboardData = async () => {
    const { data } = await axios.get('/api/dashboard');
    setData(data);
  };

  if (!authState) return null;

  return (
    <div>
      <Box>
        <Container>
          <Grid container rowSpacing={2} columnSpacing={1}>
            <Grid item xs={8}>
              {data?.length && <BarChart entries={data} />}
            </Grid>
            <Grid item xs={4} id="calendar_container">
              <Calendar handleDayClick={handleDayClick} />
            </Grid>
            <Grid item xs={8}>
              <Autocomplete
                id="size-small-filled"
                size="small"
                clearOnBlur={true}
                clearOnEscape={true}
                options={foodsList}
                getOptionLabel={(option) =>
                  `${option.description} ${
                    option.brandName ? `(${option.brandName})` : ''
                  } - (${option.fdcId})`
                }
                onChange={(e, value) => setSelectedValue(value)}
                value={selectedValue}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Size small"
                    placeholder="Favorites"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                  />
                )}
              />
              <EntryList entries={entries} deleteEntry={handleDeleteEntry} />
            </Grid>
            <Grid item xs={4}>
              <Thermometer entries={entries} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Gutcheck;
