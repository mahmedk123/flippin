// src/app/about/page.js
import Head from 'next/head';

export default function About() {
  return (
    <div>
      <Head>
        <title>About Us - Restaurant Name</title>
        <meta name="description" content="Learn more about us" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>About Us</h1>
        <p>Information about the restaurant.</p>
      </main>
    </div>
  );
}
