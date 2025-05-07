// src/components/Layout/MenuBar.jsx
import React from 'react';

const MenuBar = ({ title }) => {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        width: '80vw',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '10px',
      }}
    >
      <h4 style={{ color: 'var(--darkPurple)' }}>{title}</h4>
    </div>
  );
};

export default MenuBar;
