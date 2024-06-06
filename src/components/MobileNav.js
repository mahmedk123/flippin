import React from 'react';
import Link from 'next/link';
import { Box, VStack, Button } from '@chakra-ui/react';
import {
  IconHome2,
  IconBurger,
  IconAddressBook,
} from '@tabler/icons-react';

const MobileNav = () => {
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
    <Box
      p="xs"
      bg="#000"
      h="100vh"
      pos="fixed"
      top={0}
      left={0}
      zIndex={1003}
      display={{ base: 'flex', md: 'none' }} // Show only on mobile
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      width="100%"
    >
      <VStack spacing="4" mt="4">
        {links}
      </VStack>
    </Box>
  );
};

export default MobileNav;
