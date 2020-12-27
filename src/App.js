import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

import NewsState from './context/NewsState';

import './App.css';

function App() {

  return (
    <NewsState>
      <Router>
        <div className="App">
          <Navbar />
            <Switch>
              <Route exact path="/" render={props => (
                <Home />
                )}/>
              <Route path="/about" component={ About }/>
            </Switch>
        </div>
      </Router>
    </NewsState>
  );
}

export default App;
