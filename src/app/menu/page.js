// src/app/menu/page.js
import Head from 'next/head';

export default function Menu() {
  return (
    <div>
      <Head>
        <title>Menu - Restaurant Name</title>
        <meta name="description" content="Check out our menu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Menu</h1>
        <ul>
          <li>Dish 1</li>
          <li>Dish 2</li>
          <li>Dish 3</li>
        </ul>
      </main>
    </div>
  );
}
