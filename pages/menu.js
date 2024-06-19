import React, { useState, useEffect } from 'react';
import Nav from '../src/components/Nav';
import { useUser } from '@clerk/nextjs';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  Text,
  HStack,
  useBreakpointValue,
  Image,
} from '@chakra-ui/react';

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
      return data.length > 0 ? data : null;
    } catch (error) {
      console.error(`Error fetching menu data for ${type}:`, error);
      return null;
    }
  };

  const menuItems = {};
  for (const category of categories) {
    try {
      const data = await fetchMenuData(category.type);
      if (data) {
        menuItems[category.type] = data;
      }
    } catch (error) {
      console.error(`Error fetching data for category ${category.type}:`, error);
      menuItems[category.type] = [];
    }
  }

  return {
    props: {
      initialMenuItems: menuItems,
    },
    revalidate: 10,
  };
}

const MenuPage = ({ initialMenuItems }) => {
  const [menuItemsCache, setMenuItemsCache] = useState(initialMenuItems);
  const { isSignedIn } = useUser();
  const [formData, setFormData] = useState({ name: '', price: '', description: '' });
  const [imageURL, setImageURL] = useState('');

  const handleDelete = async (type, name) => {
    const encodedName = encodeURIComponent(name);
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (!isConfirmed) {
      return;
    }
    try {
      const res = await fetch(`/api/menuItem?type=${type}&name=${encodedName}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete menu item');
      }
      console.log('Menu item deleted successfully');
      setMenuItemsCache((prev) => {
        const filteredItems = prev[type].filter(item => item.foodname !== name);
        return {
          ...prev,
          [type]: filteredItems,
        };
      });
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const fetchMenuData = async (type) => {
    try {
      const res = await fetch(`/api/menuItem?type=${type}`);
      if (!res.ok) {
        throw new Error('Failed to fetch menu data');
      }
      const data = await res.json();
      if (data.length > 0) {
        setMenuItemsCache((prev) => ({ ...prev, [type]: data }));
      }
    } catch (error) {
      console.error(`Error fetching menu data for ${type}:`, error);
      setMenuItemsCache((prev) => ({ ...prev, [type]: [] }));
    }
  };

  useEffect(() => {
    categories.forEach(({ type }) => {
      if (!menuItemsCache[type] || menuItemsCache[type].length === 0) {
        fetchMenuData(type);
      }
    });
  }, [menuItemsCache]);

  const handleSubmit = async (e, type) => {
    e.preventDefault();
  
    const newItem = {
      name: formData.name,
      price: formData.price,
      description: formData.description,
      imageURL: formData.imageURL,
    };
    try {
      const res = await fetch(`/api/menuItem?type=${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      if (!res.ok) {
        throw new Error(`Failed to add new menu item: ${res.statusText}`);
      }
      const responseData = await res.json();
      setMenuItemsCache((prev) => ({
        ...prev,
        [type]: [...(prev[type] || []), responseData],
      }));
      setFormData({ name: '', price: '', description: '', imageURL: '' });
    } catch (error) {
      console.error('Error adding new menu item:', error);
    }
  };
  
  
 
  const handleImageUpload = async (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      console.error('No file selected.');
      return;
    }

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Image upload failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();

      if (data.url) {
        setFormData((prevFormData) => ({ ...prevFormData, imageURL: data.url }));
        console.log("Image URL set to:", data.url);
      } else {
        console.error('Received data:', data);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Container maxW="container.xl" minH="100vh" position="relative" pb="40px">
      <Nav />
      <Heading as="h1" textAlign="center" my="8">
        Menu
      </Heading>
      <HStack
        overflowX="auto"
        spacing={4}
        pb={4}
        mb={8}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {categories.map(({ label, type }) => (
          <Button
            key={type}
            onClick={() => document.getElementById(type).scrollIntoView({ behavior: 'smooth' })}
            _hover={{ bg: 'orange.500' }}
            flexShrink={0}
          >
            {label}
          </Button>
        ))}
      </HStack>
      {categories.map(({ label, type }) => (
        <Box key={type} my="12" id={type}>
          <Heading as="h2" size="lg" mb="4">
            {label}
          </Heading>
          <VStack spacing="4" align="start">
          {(menuItemsCache[type] || []).map((item, index) => (
              <Box
                key={index}
                p="2"
                borderWidth="3px"
                borderRadius="xl"
                w={{ base: '100%', md: '75%', lg: '50%' }}
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
                <Flex justifyContent="center" alignItems="center" mt="2">
                  {item.imageurl && (
                    <Image
                      src={item.imageurl}
                      alt={item.foodname}
                      boxSize="200px"
                      objectFit="cover"
                      onError={(e) => {
                        console.error('Error loading image:', e);
                        // Optionally, you can display a placeholder image or fallback content here
                      }}
                    />
                  )}
                </Flex>
                {isSignedIn && (
                  <Flex mt="2" justifyContent="flex-end">
                    <Button colorScheme="red" onClick={() => handleDelete(type, item.foodname)}>
                      Delete
                    </Button>
                  </Flex>
                )}
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
                  placeholder="Enter item name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Price:</FormLabel>
                <Input
                  type="text"
                  name="price"
                  placeholder="Enter item price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Description:</FormLabel>
                <Textarea
                  name="description"
                  placeholder="Enter item description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </FormControl>
              <Button type="submit" colorScheme="orange">
                Add {label}
              </Button>
            </Box>
          )}
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
        borderColor="black"
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