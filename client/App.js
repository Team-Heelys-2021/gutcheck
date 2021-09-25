import * as React from 'react'
import AppBar from './components/AppBar'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Auth from './pages/Auth'
import './index.scss'

import * as dataService from './foodDataService'

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [results, setResults] = React.useState([])
  const [search, setSearch] = React.useState('')
  

  React.useEffect(() => {
    if (search.length > 1) {
      searchFoods(search)
    }
  }, [search])

  const searchFoods = async () => {
    setResults(await dataService.searchFoods(search))
  }

  return (
    <React.Fragment>
    <AppBar />
    <div className="grid-container">
      <div className="grid-item-1">
        <Autocomplete
          id="size-small-filled"
          size="small"
          options={results}
          getOptionLabel={(option) => `${option.description} ${option.brandName ? `(${option.brandName})` : ''}`}
          // defaultValue={}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option.title}
                size="small"
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Size small"
              placeholder="Favorites"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          )}
        />
      </div>
      <div className="grid-item-2">asdf</div>
      <div className="grid-item-3">asdfasdf</div>
    </div>
    </React.Fragment>
  )

  // return <Auth logIn={(status) => setIsLoggedIn(status)}/>
}

export default App
