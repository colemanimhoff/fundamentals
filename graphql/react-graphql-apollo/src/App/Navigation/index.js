import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../../constants/routes';

import { Button } from '../../Button';
import { Input } from '../../Input';

import './style.css';

const OrganizationSearch = (props) => {
  const { organizationName, onOrganizationSearch } = props;
  const [searchQuery, setSearchQuery] = useState(organizationName);
  const handleOnChange = (event) => setSearchQuery(event.target.value);
  const handleOnSubmit = (event) => {
    event.preventDefault();
    onOrganizationSearch(searchQuery);
  };
  return (
    <div className="Navigation-search">
      <form onSubmit={handleOnSubmit}>
        <Input
          color={'white'}
          onChange={handleOnChange}
          type="text"
          value={searchQuery}
        />
        {' '}
        <Button
          color={'white'}
          type="submit"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

const Navigation = ({
  location: { pathname },
  organizationName,
  onOrganizationSearch
}) => {
  return (
    <header className="Navigation">
      <div className="Navigation-link">
        <Link to={routes.PROFILE}>Profile</Link>
      </div>
      <div className="Navigation-link">
        <Link to={routes.ORGANIZATION}>Organization</Link>
      </div>
      {pathname === routes.ORGANIZATION && (
        <OrganizationSearch
          organizationName={organizationName}
          onOrganizationSearch={onOrganizationSearch}
        />
      )}
    </header>
  );
};

export default withRouter(Navigation);
