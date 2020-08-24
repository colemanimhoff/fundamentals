import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as routes from '../constants/routes';
import Navigation from './Navigation/index.js';
import { Organization } from '../Organization/index.js';
import { Profile } from '../Profile/index.js';

import './style.css';

export const App = () => {
  const [organizationName, setOrganizationName] = useState('the-road-to-graphql');
  const onOrganizationSearch = useCallback((value) => setOrganizationName(value), [
    setOrganizationName
  ]);
  return (
    <Router>
      <div className="App">
        <Navigation
          organizationName={organizationName}
          onOrganizationSearch={onOrganizationSearch}
        />
        <div className="App-main">
          <Route
            exact
            path={routes.ORGANIZATION}
            component={() => (
              <div className="App-content_large-header">
                <Organization
                  organizationName={organizationName}
                />
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
  );
};