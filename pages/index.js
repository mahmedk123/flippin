import Head from 'next/head';
import React, { useEffect } from 'react';
import Nav from '../src/components/Nav'; // Import Nav component

export default function Home() {
  useEffect(() => {
    const element = document.querySelector('.header'); // Select the element where the font is expected to be applied
    const computedStyle = window.getComputedStyle(element);
    const fontFamily = computedStyle.getPropertyValue('font-family');

    console.log('Font Family:', fontFamily);
  }, []); // Run this effect only once after the component is mounted

  return (
    <div>
      <Head>
        <title>Flippin</title>
        <meta name="description" content="Best restaurant in town" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        />
        {/* Add Adobe Fonts link */}
        <link
          rel="stylesheet"
          href="https://use.typekit.net/pct7dxo.css"
        />
      </Head>
      <main className="main">
        <Nav /> {/* Include Nav component */}
        <header className="header">
          <h1>10 ST HELENS ROAD BOLTON BL3 3NH</h1>
          <div className="border-line"></div>
        </header>
        <h1 className="logo">Flippin</h1>
        <p>Delicious food and great ambiance.</p>
      </main>
      <style jsx>{`
        .header {
          text-align: center;
          margin-top: 20px;
         font-style: normal;
          font-weight: 200;
        }
        .header h1 {
          font-size: 2.5em;
          color: #fff;
        }
        .border-line {
          width: 80%;
          margin: 10px auto;
          border-bottom: 2px solid #fff; /* White border line */
        }
        .logo {
          font-family: 'Pacifico', cursive; /* Keep the logo font as Pacifico */
          font-size: 4em;
          margin: 20px 0;
          color: #fff; /* Ensure text color is white */
        }
        p {
          font-family: 'Roboto', sans-serif;
          font-size: 1.2em;
          color: #fff; /* Ensure text color is white */
        }
        .main {
          text-align: center;
          padding: 50px;
          background: transparent; /* Avoid overriding the global background color */
          color: #fff; /* Ensure text color is white */
        }
      `}</style>
    </div>
  );
}
