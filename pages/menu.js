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
      console.log('Response JSON:', data); // Log the response JSON
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
  console.log(initialMenuItems)
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [newItems, setNewItems] = useState(
    categories.reduce((acc, category) => {
      acc[category.type] = { name: '', price: '', description: '', type: category.type };
      return acc;
    }, {})
  );
  const [isOpen, setIsOpen] = useState(
    categories.reduce((acc, category) => {
      acc[category.type] = false;
      return acc;
    }, {})
  );
  const [errors, setErrors] = useState(
    categories.reduce((acc, category) => {
      acc[category.type] = '';
      return acc;
    }, {})
  );
  const { isSignedIn } = useUser();

  useEffect(() => {
    categories.forEach(({ type }) => fetchMenuData(type));
  }, []);

  const fetchMenuData = async (type) => {
    try {
      const res = await fetch(`/api/menuItem?type=${type}`);
      if (!res.ok) {
        throw new Error('Failed to fetch menu data');
      }
      const data = await res.json();
      setMenuItems((prev) => ({ ...prev, [type]: data }));
    } catch (error) {
      console.error(`Error fetching menu data for ${type}:`, error);
      setMenuItems((prev) => ({ ...prev, [type]: [] }));
    }
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    setNewItems((prev) => ({
      ...prev,
      [type]: { ...prev[type], [name]: value },
    }));
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const newItem = newItems[type];

    // Validate description length
    if (newItem.description.length < 50) {
      setErrors((prev) => ({
        ...prev,
        [type]: 'Description must be at least 50 characters long.',
      }));
      return;
    }

    try {
      console.log('Submitting new item:', newItem); // Add logging here
      const res = await fetch('/api/menuItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      if (!res.ok) {
        throw new Error(`Failed to add ${type}`);
      }
      fetchMenuData(type);
      setNewItems((prev) => ({
        ...prev,
        [type]: { name: '', price: '', description: '', type },
      }));
      setErrors((prev) => ({
        ...prev,
        [type]: '',
      }));
    } catch (error) {
      console.error(`Error adding ${type}:`, error);
    }
  };

  const toggleCollapse = (type) => {
    setIsOpen((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <Container maxW="container.xl">
      <Nav />
      <Heading as="h1" textAlign="center" my="8">
        Menu
      </Heading>
      {categories.map(({ label, type }) => (
        <Box key={type} my="4">
          <Flex
            justify="space-between"
            align="center"
            borderBottom="2px"
            borderColor="orange.500"
            pb="2"
            cursor="pointer"
            onClick={() => toggleCollapse(type)}
          >
            <Heading as="h2" size="lg">
              {label}
            </Heading>
            <Icon as={isOpen[type] ? ChevronUpIcon : ChevronDownIcon} w={6} h={6} />
          </Flex>
          <Collapse in={isOpen[type]}>
            <VStack spacing="4" align="start" mt="2">
              {(menuItems[type] || []).map((item, index) => (
                <Box
                  key={index}
                  p="2"
                  borderWidth="3px"
                  borderRadius="xl"
                  w="full"
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
              <Box as="form" onSubmit={(e) => handleSubmit(e, type)} mt="4">
                <FormControl mb="4">
                  <FormLabel>Name:</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={newItems[type].name}
                    onChange={(e) => handleInputChange(e, type)}
                    placeholder="Enter item name"
                    required
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Price:</FormLabel>
                  <Input
                    type="text"
                    name="price"
                    value={newItems[type].price}
                    onChange={(e) => handleInputChange(e, type)}
                    placeholder="Enter item price"
                    required
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Description:</FormLabel>
                  <Textarea
                    name="description"
                    value={newItems[type].description}
                    onChange={(e) => handleInputChange(e, type)}
                    placeholder="Enter item description"
                    required
                  />
                </FormControl>
                {errors[type] && <Text color="red.500">{errors[type]}</Text>}
                <Button type="submit" colorScheme="orange">
                  Add {label}
                </Button>
              </Box>
            )}
          </Collapse>
        </Box>
      ))}
    </Container>
  );
};

export default MenuPage;
