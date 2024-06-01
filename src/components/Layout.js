// src/components/Layout.js
import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <div className="layout-container">
    <div className="content">{children}</div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
