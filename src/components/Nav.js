// src/components/Nav.js
import React, { useState } from 'react';
import Link from 'next/link';
import { Flex, Box, Button, VStack } from '@chakra-ui/react';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconCalendarStats,
} from '@tabler/icons-react';
import MyLogo from '../styles/flippin.jpeg';
import { SignedIn, SignedOut, UserButton, useClerk } from '@clerk/nextjs';

const Nav = () => {
  const [active, setActive] = useState(0);
  const { signOut } = useClerk();

  const mockdata = [
    { icon: IconHome2, label: 'Home', href: '/' },
    { icon: IconGauge, label: 'About', href: '/about' },
    { icon: IconDeviceDesktopAnalytics, label: 'Menu', href: '/menu' },
    { icon: IconCalendarStats, label: 'Contact', href: '/contact' },
  ];

  const links = mockdata.map((link, index) => {
    const IconComponent = link.icon;
    return (
      <Button
        as={Link}
        href={link.href}
        key={link.label}
        color="white"
        size="lg"
        variant="outline"
        borderColor="transparent"
        textDecoration="none"
        _hover={{ bg: 'orange.500' }}
        _active={{ bg: 'gray.800' }}
        onClick={() => setActive(index)}
        fontFamily="'Roboto', sans-serif"
        fontSize="1.2em"
        mt="1rem"
        leftIcon={<IconComponent />} // Include the icon component
      >
        {link.label}
      </Button>
    );
  });

  return (
    <Flex
      direction="column"
      width={{ base: 300 }}
      p="xs"
      bg="#000"
      h="100vh"
      pos="fixed"
      top={0}
      left={0}
      justifyContent="space-between"
    >
      <Box>
        <img src={MyLogo} alt="Your Logo" style={{ width: '30px', height: '30px' }} />
        <VStack spacing="4" mt="4">
          {links}
        </VStack>
      </Box>
      <Box mt="auto" mb="4">
        <SignedOut>
          <Button
            as={Link}
            href="/signin"
            color="white"
            size="lg"
            variant="solid"
            bg="orange.500"
            _hover={{ bg: 'orange.600' }}
            fontFamily="'Roboto', sans-serif"
            fontSize="1.2em"
            mt="1rem"
          >
            Sign In
          </Button>
        </SignedOut>
        <SignedIn>
          <VStack spacing="4">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  button: {
                    size: 'lg',
                    bg: 'orange.500',
                    color: 'white',
                    _hover: { bg: 'orange.600' },
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: '1.2em',
                  },
                },
              }}
            />
            <Button
              color="white"
              size="lg"
              variant="solid"
              bg="orange.500"
              _hover={{ bg: 'orange.600' }}
              fontFamily="'Roboto', sans-serif"
              fontSize="1.2em"
              mt="1rem"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </VStack>
        </SignedIn>
      </Box>
    </Flex>
  );
};

export default Nav;
