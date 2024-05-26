// pages/index.js
import Head from 'next/head';
import React from 'react';
import Nav from '../src/components/Nav';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Restaurant Name</title>
        <meta name="description" content="Best restaurant in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Nav />
        <h1>Welcome to Restaurant Name</h1>
        <p>Delicious food and great ambiance.</p>
      
      </main>
    </div>
  );
}
