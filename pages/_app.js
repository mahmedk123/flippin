// pages/_app.js
import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../src/styles/theme.js'; 
import Layout from '../src/components/Layout.js';
import '../src/styles/globals.css'; // Import global CSS

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <ChakraProvider theme={theme}>
        <Layout> 
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ClerkProvider>
  );
}

export default MyApp;
