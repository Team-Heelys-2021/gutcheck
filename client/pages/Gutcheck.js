import React from 'react';
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

const Gutcheck = () => {
  const [search, setSearch] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [entries, setEntries] = React.useState([]);
  const history = useHistory();
  const { authState } = useOktaAuth();
  const { foodsList, doFoodsSearch } = useFoods();
  const [data, setData] = React.useState(null)
  useAuth();

  if (authState && !authState.isAuthenticated) {
    history.replace('/login');
  }

  React.useEffect(() => {
    if (search.length > 1) {
      searchFoods(search);
    }
  }, [search]);

  React.useEffect(() => {
    if (authState?.isAuthenticated) {
      axios.get('/api/entry').then(({ data: { entries } }) => {
        setEntries(entries);
      });
      fetchDashboardData();
    }
  }, [authState]);

  React.useEffect(() => {
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

  const syncEntries = async (food) => {
    const {
      data: { entryId },
    } = await axios.post('/api/entry', { food });
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
    const { data } = await axios.get('/api/dashboard')
    setData(data)
  }

  const redirectToLogin = () => {
    history.push('/login');
  };

  if (!authState) return null;

  const login = async () => history.push('/login');

  return (
    <div>
      <Box>
        <Container>
          <Grid container> 
            <Grid item xs={12}>
            {data?.length && <BarChart entries={data} />}
            </Grid>
          </Grid>

        </Container>
      </Box>
      {/* <Link to="/protected">Protected</Link> */}
      <div className="grid-container">
        <div className="grid-item-1">
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
        </div>
        <div className="grid-item-2">
          <Thermometer entries={entries} />
        </div>
        <div className="grid-item-3">
          <EntryList entries={entries} deleteEntry={handleDeleteEntry} />
        </div>
      </div>
    </div>
  );
};

export default Gutcheck;
