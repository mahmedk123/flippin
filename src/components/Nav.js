import React, { useState } from 'react';
import Link from 'next/link';
import { Flex, Box, Button, VStack, Center } from '@chakra-ui/react';
import {
  IconHome2,
  IconBurger,
  IconAddressBook,
  IconMenu2,
} from '@tabler/icons-react';
import { SignedIn, SignedOut, UserButton, useClerk } from '@clerk/nextjs';

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { signOut } = useClerk();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    const content = document.querySelector('.content');
    if (content) {
      content.classList.toggle('blur');
    }
  };

  const mockdata = [
    { icon: IconHome2, label: 'Home', href: '/' },
    { icon: IconBurger, label: 'Menu', href: '/menu' },
    { icon: IconAddressBook, label: 'Contact', href: '/contact' },
  ];

  const links = mockdata.map((link) => {
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
        fontFamily="'Roboto', sans-serif"
        fontSize="1.2em"
        mt="1rem"
        leftIcon={<IconComponent />}
      >
        {link.label}
      </Button>
    );
  });

  return (
    <>
      <Button
        className="burger-icon"
        onClick={toggleNav}
        variant="unstyled"
        color="white"
        size="lg"
        pos="fixed"
        top={0}
        left={0}
        zIndex={1002}
        m="1rem"
      >
        <IconMenu2 />
      </Button>
      <Flex
        direction="column"
        width={{ base: 300 }}
        p="xs"
        bg="#000"
        h="100vh"
        pos="fixed"
        top={0}
        left={isNavOpen ? 0 : '-300px'}
        transition="left 0.3s ease"
        justifyContent="space-between"
        className="nav"
        zIndex={isNavOpen ? 1003 : 0} // Adjust z-index when nav is open
      >
        <Box>
          <VStack spacing="4" mt="4">
            {links}
          </VStack>
        </Box>
        <Center mb="4">
          <Box>
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
        </Center>
      </Flex>
      <style jsx>{`
        // Add your custom styles here
        .blur {
          filter: blur(3px); /* Adjust the blur intensity as needed */
        }
      `}</style>
    </>
  );
};

export default Nav;
