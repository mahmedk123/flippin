import Head from 'next/head';
import React from 'react';
import Nav from '../src/components/Nav'; // Import Nav component

export default function Home() {
  return (
    <div>
      <Head>
        <title>Flippin</title>
        <meta name="description" content="Best restaurant in town" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
      </Head>
      <main className="main">
        <Nav /> {/* Include Nav component */}
        <h1 className="logo">Flippin</h1>
        <p>Delicious food and great ambiance.</p>
      </main>
      <style jsx>{`
        .logo {
          font-family: 'Pacifico', cursive;
          font-size: 4em;
          margin: 20px 0;
          color: #FF6347;
        }
        p {
          font-family: 'Roboto', sans-serif;
          font-size: 1.2em;
          color: #fff; /* Change text color to white */
        }
        .main {
          text-align: center;
          padding: 50px;
          background: #000; /* Change background color to black */
          color: #fff; /* Change text color to white */
        }
      `}</style>
    </div>
  );
}
