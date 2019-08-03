import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import ReactDOM from 'react-dom'
import SearchResults from './SearchResults';

function Search() {
  const [ searchIn, setSearchIn ] = useState('');

  const SearchForm = (e) => {
    e.preventDefault();
    console.log(`You Searched: ${searchIn}`);
    const results = document.getElementById('results')
    ReactDOM.render(<SearchResults strang={searchIn} />, results);
  };

  console.log(`search input thing: ${searchIn}`);
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
