import React from 'react';
import { Box } from '@chakra-ui/react';
import Nav from '../components/Nav';

const Layout = ({ children }) => {
  return (
    <Box>
      <Nav />
      {children}
    </Box>
  );
};

export default Layout;
