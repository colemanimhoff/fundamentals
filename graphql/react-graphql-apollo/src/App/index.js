import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as routes from '../constants/routes';
import { Navigation } from './Navigation';
import { Organization } from '../Organization/index.js';
import { Profile } from '../Profile/index.js';

import './style.css';

export const App = () => (
  <Router>
    <div className="App">
      <Navigation />
      <div className="App-main">
        <Route
          exact
          path={routes.ORGANIZATION}
          component={() => (
            <div className="App-content_large-header">
              <Organization />
            </div>
          )}
        />
        <Route
          exact
          path={routes.PROFILE}
          component={() => (
            <div className="App-content_small-header"> <Profile />
            </div>
          )}
        />
      </div>
    </div>
  </Router>
  // return <Profile />;
);