// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    orange: {
      500: '#FFA500',
    },
  },
  fonts: {
    // body: 'Roboto, sans-serif',
    heading: 'ParalucentStencil ExtraLight, sans-serif', // Change the font for headings
  
  },
});

export default theme;
