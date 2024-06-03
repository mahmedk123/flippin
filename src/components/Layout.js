import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <div className="layout-container">
    <div className="content">{children}</div>
    <style jsx>{`
      .layout-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
      .content {
        width: 100%;
        height: 100%;
      }
    `}</style>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
