// src/app/layout.js
import Nav from '../components/Nav';
import '../styles/globals.css';
import {ClerkProvider} from '@clerk/nextjs'

export const metadata = {
  title: 'Restaurant Name',
  description: 'Best restaurant in town',
};



export default function RootLayout({
  children,

}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
        
          <Nav/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
