import React from 'react';
import './style.css';

export const Button = ({
  children,
  className,
  color = 'black',
  type = 'button',
  ...props
}) => (
    <button
      className={`${className} Button Button_${color}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );