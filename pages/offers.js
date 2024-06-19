import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  Flex,
  Text,
  Image,
  HStack,
} from '@chakra-ui/react';
import Nav from '../src/components/Nav';

const categories = [
  { foodType: 'offers' }
];

const OffersPage = () => {
  const { isSignedIn } = useUser();
  const [offerItemsCache, setOfferItemsCache] = useState({});
  const [formData, setFormData] = useState({ name: '', price: '', description: '', imageURL: '' });

  useEffect(() => {
    const fetchOfferItems = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const promises = categories.map(async (category) => {
          const res = await fetch(`${baseUrl}/api/offerItems?type=${category.foodType}`);
          if (!res.ok) {
            throw new Error(`Failed to fetch offer items for ${category.foodType}`);
          }
          const data = await res.json();
          console.log('Fetched data:', data); // Log the fetched data
          return { [category.foodType]: data };
        });
        const results = await Promise.all(promises);
        const offerItems = results.reduce((acc, result) => ({ ...acc, ...result }), {});
        setOfferItemsCache(offerItems);
      } catch (error) {
        console.error('Error fetching offer items:', error);
      }
    };
    

    fetchOfferItems();
  }, []);

  const handleDelete = async (foodType, foodname) => {
    const encodedName = encodeURIComponent(foodname);
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (!isConfirmed) {
      return;
    }

    try {
      const res = await fetch(`/api/offerItems?type=${foodType}&name=${encodedName}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete offer item');
      }
      console.log('Offer item deleted successfully');
      setOfferItemsCache((prev) => ({
        ...prev,
        [foodType]: prev[foodType].filter((item) => item.foodname !== foodname),
      }));
    } catch (error) {
      console.error('Error deleting offer item:', error);
    }
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();

    const newItem = {
      name: formData.name,
      price: formData.price,
      description: formData.description,
      imageURL: formData.imageURL,
      type: type,
    };

    try {
      const res = await fetch(`/api/offerItems?type=${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      if (!res.ok) {
        throw new Error(`Failed to add new offer item: ${res.statusText}`);
      }
      const responseData = await res.json();
      setOfferItemsCache((prev) => ({
        ...prev,
        [type]: [...(prev[type] || []), responseData],
      }));
      setFormData({ name: '', price: '', description: '', imageURL: '' });
    } catch (error) {
      console.error('Error adding new offer item:', error);
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

  return (
    <Container maxW="container.xl" minH="100vh" position="relative" pb="40px">
      <Nav />
      <title>Offers only - limited time</title>
      <meta name="description" content="Check out our limited-time offers!" />
      <link rel="icon" href="/favicon.ico" />

      <Heading as="h1" textAlign="center" my="8">
        Offers
      </Heading>

      {categories.map(({ foodType }) => (
        <Box key={foodType} my="12" id={foodType}>
          <Heading as="h2" size="lg" mb="4">
            {foodType}
          </Heading>

          <VStack spacing="4" align="start">
            {(offerItemsCache[foodType] || []).map((item, index) => (
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
                  {item.imageURL && ( // Ensure imageURL exists before rendering Image
                    <Image
                      src={item.imageURL} // Render imageURL
                      alt={item.foodname}
                      boxSize="200px"
                      objectFit="cover"
                      onError={(e) => {
                        console.error('Error loading image:', e);
                      }}
                    />
                  )}
                </Flex>
                {isSignedIn && (
                  <Flex justifyContent="center" mt="4">
                    <Button colorScheme="red" onClick={() => handleDelete(foodType, item.foodname)}>
                      Delete
                    </Button>
                  </Flex>
                )}
              </Box>
            ))}
          </VStack>

          {isSignedIn && (
            <Box w={{ base: '100%', md: '75%', lg: '50%' }} margin="auto" mt="4">
              <form onSubmit={(e) => handleSubmit(e, foodType)}>
                <VStack spacing="4" align="stretch">
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Price</FormLabel>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Image</FormLabel>
                    <Input type="file" onChange={handleImageUpload} />
                  </FormControl>
                  <Button colorScheme="teal" type="submit">
                    Add Offer
                  </Button>
                </VStack>
              </form>
            </Box>
          )}
        </Box>
      ))}
    </Container>
  );
};

export default OffersPage;