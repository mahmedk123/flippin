// src/components/Layout.js

import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const Layout = ({ children }) => (
  <div className="layout-container">
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <div className="content">{children}</div>
    <style jsx global>{`
      body {
        margin: 0;
        padding: 0;
        background: #000;
        color: #fff;
        font-family: 'Roboto', sans-serif;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .layout-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      .content {
        flex: 1;
      }
    `}</style>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
