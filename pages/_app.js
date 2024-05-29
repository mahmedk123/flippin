import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';
import '../src/styles/globals.css'; 

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;