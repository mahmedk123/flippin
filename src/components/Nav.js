import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
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
        <SignedOut>
          <li>
            <Link href="/signin">Sign In</Link>
          </li>
        </SignedOut>
        <SignedIn>
          <li>
            <UserButton />
          </li>
        </SignedIn>
      </ul>
    </nav>
  );
};

export default Nav;
