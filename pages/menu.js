import React, { useState, useEffect } from 'react';
import Nav from '../src/components/Nav';
import { useUser } from '@clerk/nextjs';
import {
  Box,
  Button,
  Container,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  Icon,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const categories = [
  { label: 'Smash Burgers', type: 'smashburgers' },
  { label: 'Chicken Burgers', type: 'chickenBurgers' },
  { label: 'Wraps', type: 'wraps' },
  { label: 'Wings', type: 'wings' },
  { label: 'Chicken', type: 'chicken' },
  { label: 'Sizzlers', type: 'sizzlers' },
  { label: 'Hot Dogs', type: 'hotdogs' },
];

export async function getStaticProps() {
  const fetchMenuData = async (type) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${baseUrl}/api/menuItem?type=${type}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch menu data for ${type}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Error fetching menu data for ${type}:`, error);
      return [];
    }
  };

  const menuItems = {};
  for (const category of categories) {
    try {
      menuItems[category.type] = await fetchMenuData(category.type);
    } catch (error) {
      console.error(`Error fetching data for category ${category.type}:`, error);
      menuItems[category.type] = [];
    }
  }

  return {
    props: {
      initialMenuItems: menuItems,
    },
    revalidate: 10, // If you want to enable Incremental Static Regeneration
  };
}

const MenuPage = ({ initialMenuItems }) => {
  const [menuItemsCache, setMenuItemsCache] = useState(initialMenuItems);
  const [isOpen, setIsOpen] = useState(
    categories.reduce((acc, category) => {
      acc[category.type] = false;
      return acc;
    }, {})
  );

  const { isSignedIn } = useUser();

  const toggleCollapse = (type) => {
    setIsOpen((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const fetchMenuData = async (type) => {
    try {
      const res = await fetch(`/api/menuItem?type=${type}`);
      if (!res.ok) {
        throw new Error('Failed to fetch menu data');
      }
      const data = await res.json();
      setMenuItemsCache((prev) => ({ ...prev, [type]: data }));
    } catch (error) {
      console.error(`Error fetching menu data for ${type}:`, error);
      setMenuItemsCache((prev) => ({ ...prev, [type]: [] }));
    }
  };

  useEffect(() => {
    categories.forEach(({ type }) => {
      if (!menuItemsCache[type].length) {
        fetchMenuData(type);
      }
    });
  }, [menuItemsCache]);

  return (
    <Container maxW="container.xl" minH="100vh" position="relative" pb="40px">
      <Nav />
      <Heading as="h1" textAlign="center" my="8">
        Menu
      </Heading>
      {categories.map(({ label, type }) => (
        <Box key={type} my="12"> {/* Adjusted margin to spread out labels */}
          <Flex
            justify="space-between"
            align="center"
            borderBottom="2px"
            borderColor="orange.500"
            pb="4"
            cursor="pointer"
            onClick={() => toggleCollapse(type)}
          >
            <Heading as="h2" size="lg">
              {label}
            </Heading>
            <Icon as={isOpen[type] ? ChevronUpIcon : ChevronDownIcon} w={6} h={6} />
          </Flex>
          <Collapse in={isOpen[type]}>
            <VStack spacing="4" align="start" mt="4">
              {(menuItemsCache[type] || []).map((item, index) => (
                <Box
                  key={index}
                  p="2"
                  borderWidth="3px"
                  borderRadius="xl"
                  w={{ base: '100%', md: '75%', lg: '50%' }} /* Ensure width is responsive */
                  margin="auto"
                  mt="4"
                  boxShadow="md"
                  textAlign="center"
                >
                  <Text fontWeight="bold" fontSize="xl">
                    {item.foodname}
                  </Text>
                  <Box mt="2">
                    <Text>{item.description}</Text>
                  </Box>
                  <Flex justifyContent="center" alignItems="center" mt="2">
                    <Text alignSelf="flex-start">{item.description ? 'on its own' : ''}</Text>
                    <Box ml="2">£{item.foodprice}</Box>
                  </Flex>
                </Box>
              ))}
            </VStack>
            {isSignedIn && (
              <Box as="form" onSubmit={(e) => e.preventDefault()} mt="4">
                <FormControl mb="4">
                  <FormLabel>Name:</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter item name"
                    required
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Price:</FormLabel>
                  <Input
                    type="text"
                    name="price"
                    placeholder="Enter item price"
                    required
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Description:</FormLabel>
                  <Textarea
                    name="description"
                    placeholder="Enter item description"
                    required
                  />
                </FormControl>
                <Button type="submit" colorScheme="orange">
                  Add {label}
                </Button>
              </Box>
            )}
          </Collapse>
        </Box>
      ))}
      <Box
        as="footer"
        position="absolute"
        bottom="0"
        left="0"
        width="100%"
        bg="black"
        p="4"
        textAlign="center"
        borderTop="2px"
        borderColor="orange.500"
        color="white"
      >
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold">
          UPGRADE TO A MEAL +£1.50
        </Text>
      </Box>
    </Container>
  );
};

export default MenuPage;
