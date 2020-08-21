import React from 'react';
import './style.css';

export const ErrorMessage = ({ error }) => (<div className="ErrorMessage">
  <small>{error.toString()}</small> </div>
);