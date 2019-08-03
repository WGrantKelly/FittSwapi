import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import Search from './Search';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <div className={css(styles.header)}>
        <img src={logo} className={css(styles.logo)} alt="logo" />
        <h1>SWAPI Code Challenge</h1>
      </div>
      <div className={css(styles.descriptionCont)}>
        <p className={css(styles.descText)}>
          Hey there! This coding challenge it pretty straightforward and a chance for you to show us your react chops.
          We have provided some boilerplate code and then some.  We would like you finish out this Star Wars character search app using the classic
          SWAPI (Star Wars API).  All the documentation you need can be found
          {' '}
          <a href="https://swapi.co/documentation" target="blank"> here...</a>
        </p>
        <p className={css(styles.descText)}>
          Users should be able to search for their favorite characters, see a list of results, and sort the list of results
          by three different criteria (alphabetical, age, etc.).  While we have provided some sample code using a class component, we would like you to refactor
          it using only functional components and react hooks.
        </p>
        <p className={css(styles.descText)}>
          In addition, since SWAPI limits its page results to 10, we would like you to also build page buttons that allow you to go to the next
          or previous page of results without showing the entire list.  If you have any questions, feel free to shoot myself or Nick an email.
        </p>

      </div>
      <div className={css(styles.descriptionCont)}>
        <Search />
      </div>
      <div id="results" />
    </div>
  );
}

export default App;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingTop: '48px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionCont: {
    paddingTop: '24px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descText: {
    width: '70%',
    margin: '8px 0',
  },
  logo: {
    height: '96px',
    width: 'auto',
    paddingRight: '32px',
  },
});
