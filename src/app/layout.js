// src/app/layout.js
import Nav from '../components/Nav';
import '../styles/globals.css';

export const metadata = {
  title: 'Restaurant Name',
  description: 'Best restaurant in town',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
