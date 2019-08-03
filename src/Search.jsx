import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import ReactDOM from 'react-dom'
import SearchResults from './SearchResults';

function Search() {

  //declares stateful values for the search term the client is putting into the form field
  const [ searchIn, setSearchIn ] = useState('');

  //function to get the results section rendered on the Enter! button click
  const SearchForm = (e) => {
    e.preventDefault();
    console.log(`You Searched: ${searchIn}`);
    const results = document.getElementById('results')
    ReactDOM.render(<SearchResults strang={searchIn} />, results);
  };

  console.log(`search field input: ${searchIn}`);

  //render the form to gather client input, on change, set the state of searchIn
  return (
    <div className={css(styles.searchContainer)}>
      <label htmlFor="search" className={css(styles.label)}>Search:</label>
      <input name="search" type="text" placeholder="anakin" value={searchIn} onChange={e => setSearchIn(e.target.value)} />
      <button type="submit" value="submit" onClick={SearchForm}>Enter!</button>
    </div>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  label: {
    paddingRight: '12px',
  },
});

export default Search;
