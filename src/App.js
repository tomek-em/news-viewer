import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

import styles from './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

          <Switch>
            <Route exact path="/" render={props => (
              <Fragment>
                <Home />
              </Fragment>
              )}/>

            <Route path="/about" component={ About }/>
          </Switch>

      </div>
    </Router>
  );
}

export default App;
