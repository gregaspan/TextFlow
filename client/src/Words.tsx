import React, { useState } from 'react';
import { Box, Text, Image, Flex, Input, Button } from '@chakra-ui/react';
import axios from 'axios';

function App() {
  const [word, setWord] = useState('');
  const [image, setImage] = useState('');
  const [header, setHeader] = useState('');
  const [definition, setDefinition] = useState('');
  const [fullEntry, setFullEntry] = useState('');

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setWord(event.target.value);
  };

  const fetchAllData = async () => {
    const apiUrl = `http://127.0.0.1:8080/api`;  // Base URL for API calls
    try {
      const [detailsResponse, imageResponse] = await Promise.all([
        axios.get(`${apiUrl}/sskj`, { params: { word } }),
        axios.get(`${apiUrl}/image`, { params: { word } })
      ]);
      
      if (detailsResponse.data) {
        setHeader(detailsResponse.data.beseda);
        setDefinition(detailsResponse.data.zaglavje);
        setFullEntry(detailsResponse.data.definicija);
      }
      if (imageResponse.data.image_url) {
        setImage(imageResponse.data.image_url);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" p={5}>
      <Box textAlign="center" mb={4}>
        <Text fontSize="3xl" fontWeight="bold">{header || 'Enter a word'}</Text>
        <Text fontSize="md">{definition || 'Header will appear here'}</Text>
        <Text fontSize="sm">{fullEntry || 'Full entry will be displayed here'}</Text>
      </Box>
      <Image src={image || 'https://via.placeholder.com/300'} boxSize="300px" borderRadius="full" mb={4} />
      <Flex gap={2}>
        <Input placeholder="Type a word here..." value={word} onChange={handleInputChange} />
        <Button colorScheme="blue" onClick={fetchAllData}>Search</Button>
      </Flex>
    </Flex>
  );
}

export default App;
