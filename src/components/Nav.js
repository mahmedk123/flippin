// src/components/Nav.js
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/index.js">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
    
          <Link href="/menu">Menu</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
      {/* <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
    </nav>
  );
};

export default Nav;
