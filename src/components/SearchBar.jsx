import React from 'react'

import { alpha, makeStyles } from "@material-ui/core/styles";
import {InputBase} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.grey['400'], 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.grey['400'], 0.25),
    },
    marginLeft: 0,
    marginBottom: theme.spacing(3),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export const SearchBar = (props) => {
  const classes = useStyles();
  const {searchInput, setSearchInput} = props

  const handleChange = (event) => {
    let searchValue = event.target.value;
    setSearchInput(searchValue)
  }

  return (
    <>
      <div data-testid="search-bar" className={classes.search}>
        <div data-testid="search-icon" className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search Title…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleChange}
          value={searchInput}
        />
      </div>
    </>
  )
}
