import * as React from 'react';
import AppBar from './components/AppBar';
import EntryList from './components/EntryList';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Auth from './pages/Auth';
import './index.scss';
import { Route, Switch, useHistory } from 'react-router-dom';
import { LoginCallback } from '@okta/okta-react';
import { useOktaAuth } from '@okta/okta-react';

import * as dataService from './foodDataService';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [entries, setEntries] = React.useState([]);
  const { oktaAuth, authState } = useOktaAuth();
  const history = useHistory();

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
    setResults(await dataService.searchFoods(search));
  };

  const handleDeleteEntry = (fdcId) => {
    const newEntries = entries.filter((entry) => entry.fdcId !== fdcId);
    setEntries(newEntries);
    // TODO: send entry DELETE request to back end
  };

  // FIXME: remove
  // return (
  //   <Router>
  //     <AppWithRouterAccess />
  //   </Router>
  // );

  if (!authState) return null;
  if (!authState.isAuthenticated) {
    history.replace({ path: '/' });
  }

  return (
    <React.Fragment>
      <Switch>
        <Route path="/login/callback" component={LoginCallback} />
        <Route path="/login">
          <Auth />
        </Route>
        <Route exact path="/">
          <AppBar />
          <div className="grid-container">
            <div className="grid-item-1">
              <Autocomplete
                id="size-small-filled"
                size="small"
                clearOnBlur={true}
                clearOnEscape={true}
                options={results}
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
            <div className="grid-item-2">foobar</div>
            <div className="grid-item-3">
              <EntryList entries={entries} deleteEntry={handleDeleteEntry} />
            </div>
          </div>
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
