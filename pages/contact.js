// src/app/contact/page.js
import Head from 'next/head';

export default function Contact() {
  return (
    <div>
      <Head>
        <title>Contact Us - Restaurant Name</title>
        <meta name="description" content="Get in touch with us" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Contact Us</h1>
        <p>Phone: (123) 456-7890</p>
        <p>Email: contact@restaurant.com</p>
      </main>
    </div>
  );
}
