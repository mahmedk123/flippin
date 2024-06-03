import React, { useEffect } from 'react';
import Head from 'next/head';
import Nav from '../src/components/Nav';
import Layout from '../src/components/Layout';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../src/styles/theme.js';

export default function Home() {
  useEffect(() => {
    const header = document.querySelector('.header h1');
    console.log('Header font family:', window.getComputedStyle(header).fontFamily);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Head>
          <title>Flippin</title>
          <meta name="description" content="Best restaurant in town" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="content">
          <main className="main">
            <Nav />
            <header className="header">
              <h1>10 ST HELENS ROAD BOLTON BL3 3NH</h1>
              <div className="border-line"></div>
            </header>
            <div className="logotest-container">
              <img src="/flippin-white.svg" alt="Flippin Logo" className="logotest" />
            </div>
            
            <div className="icons">
              <div className="icon-wrapper">
                <img src="/burger.svg" alt="Burger Icon" className="burger-icon" />
                <p className="chicken-shaq">BY THE CHICKEN SHAQ</p>
                <img src="/milkshake.svg" alt="Milkshake Icon" className="milkshake-icon" />
              </div>
            </div>

            {/* Uber Eats */}
            <a href="https://www.ubereats.com/gb/store/flippin-burgers-%26-shakes/xk_u5JpzReG7ddvZTTX0bQ" target="_blank" rel="noopener noreferrer" className="uber-eats-link">
              <img src="/uber-eats.svg" alt="Uber Eats" className="uber-eats-icon" />
            </a>
          </main>
          {/* Footer */}
          <footer className="footer">
            <div className="border-line"></div>
            <p>Telephone: 01234567865</p>
          </footer>
        </div>
        <style jsx>{`
          .content {
            display: flex;
            flex-direction: column;
            min-height: 100vh; /* Set the minimum height of the content to be at least the height of the viewport */
          }

          .main {
            flex: 1; /* Allow the main content to grow to fill the remaining space */
            text-align: center;
            padding: 50px;
            background: transparent;
            color: #fff;
          }

          .footer {
            text-align: center;
            font-family: 'Montserrat', sans-serif; /* Use body font from theme */
            font-size: 2em;
            background-color: rgba(0, 0, 0, 0.5); /* Add a background color for better visibility */
          }

          .header h1 {
            font-family: 'Montserrat', sans-serif;
            font-size: 2em;
            color: #fff;
            text-align: center;
            margin-top: 20px;
          }

          .border-line {
            width: 80%;
            margin: 10px auto;
            border-bottom: 2px solid #fff;
          }

          .logotest-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
          }

          .logotest {
            height: 22em;
          }

          .icons {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
          }

          .icon-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 10px;
          }

          .burger-icon {
            height: 4em;
            margin-right: 10px;
          }

          .milkshake-icon {
            height: 4em;
            margin-left: 10px;
          }

          .chicken-shaq {
            font-family: 'Pacifico', cursive;
            color: orange;
            font-size: 2.5em;
            margin: 0;
          }

          .uber-eats-link {
            margin-top: 20px; /* Adjust margin as needed */
            display: block; /* Make the link a block element to occupy full width */
          }

          .uber-eats-icon {
            height: 4em;
           
        }
        
        `}</style>
      </Layout>
    </ChakraProvider>
  );
}
