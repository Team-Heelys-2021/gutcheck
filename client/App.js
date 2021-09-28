import * as React from "react";
import AppBar from "./components/AppBar";
import EntryList from "./components/EntryList";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Auth from "./pages/Auth";
import "./index.scss";

import * as dataService from "./foodDataService";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [results, setResults] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState(null)
  const [entries, setEntries] = React.useState([]);

  React.useEffect(() => {
    if (search.length > 1) {
      searchFoods(search);
    }
  }, [search]);

  React.useEffect(() => {
    if (selectedValue) {
      setEntries([...entries, selectedValue])
      // TODO: send entry POST request to back end
      setSearch('')
      setSelectedValue(null)
    }
  }, [selectedValue])

  const searchFoods = async () => {
    setResults(await dataService.searchFoods(search));
  };

  const handleDeleteEntry = (fdcId) => {
    const newEntries = entries.filter(entry => entry.fdcId !== fdcId)
    setEntries(newEntries)
    // TODO: send entry DELETE request to back end
  }

  if (isLoggedIn) {
    return (
      <React.Fragment>
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
          <div className="grid-item-2">sdfsdfds</div>
          <div className="grid-item-3">
            <EntryList entries={entries} deleteEntry={handleDeleteEntry}/>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return <Auth />
  }

}

export default App;
