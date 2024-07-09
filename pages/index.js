import React from 'react';
import Head from 'next/head';
import Nav from '../src/components/Nav';
import Layout from '../src/components/Layout';
import { ChakraProvider, Image } from '@chakra-ui/react';
import theme from '../src/styles/theme.js';

export default function Home({ isMobile }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Head>
          <title>Flippin</title>
          <meta name="description" content="Best restaurant in town" />
          <link rel="icon" href="/flippin-white.svg" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <div className="content">
          {!isMobile && (
            <header className="header">
              <h1>10 ST HELENS ROAD BOLTON BL3 3NH</h1>
              <div className="border-line"></div>
            </header>
          )}
          <Nav isMobile={isMobile} />
          <main className="main">
            <div className="logotest-container">
              <Image src="/flippin-white.svg" alt="Flippin Logo" className="logotest" />
            </div>
            <div className="icons">
              <div className="icon-wrapper">
                <Image src="/burger.svg" alt="Burger Icon" className="burger-icon" />
                <p className="chicken-shaq">BY THE CHICKEN SHAQ</p>
                <Image src="/milkshake.svg" alt="Milkshake Icon" className="milkshake-icon" />
              </div>
            </div>
          </main>
          <footer className="footer">
            <div className="footer-content">
              <div className="uber-eats-container">
                <p>NOW AVAILABLE ON UBER EATS</p>
                <a href="https://www.ubereats.com/gb/store/flippin-burgers-%26-shakes/xk_u5JpzReG7ddvZTTX0bQ" target="_blank" rel="noopener noreferrer" className="uber-eats-link">
                  <Image src="/uber-eats.svg" alt="Uber Eats Icon" className="uber-eats-icon" />
                </a>
              </div>
              <div className="border-line"></div>
              <p className="footer-text">Telephone: 01204 665665</p>
            </div>
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
            font-size: 0.5em;
            background-color: rgba(0, 0, 0, 0.5); /* Add a background color for better visibility */
            display: flex;
            flex-direction: column;
            align-items: center;
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
            margin-top: 50px;
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
          
          .footer-content {
            width: 100%;
          }
          
          .uber-eats-container {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px; /* Adjust margin as needed */
            font-family: 'Montserrat', sans-serif;
            font-size: 2.5em;
          }
          
          .uber-eats-link {
            display: block; /* Make the link a block element to occupy full width */
            margin-left: 10px; /* Add margin to create space between text and icon */
          }
          
          .uber-eats-icon {
            height: 6em;
          }
          
          .footer-text {
            font-family: 'Montserrat', sans-serif;
            font-size: 5em;
          }

          /* Media query for mobile screens */
          @media (max-width: 768px) {
            .header {
              display: none; /* Hide header on mobile devices */
            }

            .logotest {
              height: 12em; /* Adjust height for smaller screens */
            }

            .icons {
              flex-direction: row; /* Change flex-direction to row for smaller screens */
            }

            .icon-wrapper {
              margin-top: 0; /* Remove top margin for smaller screens */
            }

            .burger-icon {
              height: 5em; /* Make the burger icon larger for mobile */
              position: fixed; /* Position burger icon fixed for mobile */
              top: 10px; /* Adjust top position as needed */
              left: 10px; /* Adjust left position as needed */
              z-index: 1001; /* Ensure burger icon is above other elements */
            }

            .uber-eats-container {
              flex-direction: column;
              text-align: center;
              font-size: 1.5em; /* Adjust font size for smaller screens */
            }

            .uber-eats-icon {
              height: 4em; /* Adjust height for smaller screens */
              margin-top: 10px;
            }

            .footer-text {
              font-size: 1em; /* Adjust footer text size for smaller screens */
            }

            .border-line {
              width: 90%; /* Adjust border line width for smaller screens */
            }

            .uber-eats-container p {
              font-size: 1em; /* Adjust 'NOW AVAILABLE ON UBER EATS' font size for mobile */
            }
          }

          /* Blur effect */
          .blur {
            filter: blur(3px); /* Adjust the blur intensity as needed */
          }
        `}</style>
      </Layout>
    </ChakraProvider>
  );
}

// Server-side rendering to detect mobile device
export async function getServerSideProps(context) {
  // Check if the request comes from a mobile device
  const isMobile = context.req
    ? /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(context.req.headers['user-agent'])
    : false;

  return {
    props: {
      isMobile,
    },
  };
}
