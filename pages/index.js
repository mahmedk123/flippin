// pages/index.js
import Head from 'next/head';
import React from 'react';
import Nav from '../src/components/Nav';
import { SignInButton, SignedIn, SignedOut, UserButton, ClerkProvider } from '@clerk/nextjs';

export default function Home() {
  return (
    <ClerkProvider>
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
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </main>
      </div>
    </ClerkProvider>
  );
}