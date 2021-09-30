import React from 'react';
import AppBar from '../components/AppBar';
import EntryList from '../components/EntryList';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory, Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

import { useFoods } from '../hooks/useFoods';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

const Home = () => {
  const [search, setSearch] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [entries, setEntries] = React.useState([]);
  const history = useHistory();
  const { oktaAuth, authState } = useOktaAuth();
  const { foodsList, doFoodsSearch } = useFoods();
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
    if (selectedValue) {
      setEntries([...entries, selectedValue]);
      // TODO: send entry POST request to back end
      setSearch('');
      setSelectedValue(null);
    }
  }, [selectedValue]);

  const searchFoods = async () => {
    await doFoodsSearch(search);
  };

  const handleDeleteEntry = (fdcId) => {
    const newEntries = entries.filter((entry) => entry.fdcId !== fdcId);
    setEntries(newEntries);
    // TODO: send entry DELETE request to back end
  };

  const redirectToLogin = () => {
    history.push('/login');
  };

  if (!authState) return null;

  const login = async () => history.push('/login');

  const testBackend = () => {
    axios.get('/api/debug').then(({ data }) => {
      console.log(data);
    });
  };

  return (
    <div>
      {/* <Link to="/protected">Protected</Link> */}
      <AppBar />
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
          <Button onClick={testBackend}>Test Backend</Button>
        </div>
        <div className="grid-item-3">
          <EntryList entries={entries} deleteEntry={handleDeleteEntry} />
        </div>
      </div>
    </div>
  );
};
export default Home;
