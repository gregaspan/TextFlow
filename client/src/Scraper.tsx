import React, { useState } from "react";
import {
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Box,
  Text,
  Textarea,
  useColorModeValue,
  Icon,
  Flex
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import axios from "axios";
import Chat from "./components/Chat";
import TextSimplification from "./components/textSimplification"
import TextToSpeech from "./components/TextToSpeach"
import Header from "./components/Navbar";

export default function Scraper() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState({ naslov: '', povzetek: '', vsebina_clanka: '', tags: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setUrl(e.target.value);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Replace 'http://localhost:5000/api/scrape' with your actual API endpoint
      const response = await axios.post('http://localhost:8080/api/scrape', { article: url });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Styles
  const bg = useColorModeValue("white", "gray.800");
  const colorScheme = useColorModeValue("blue", "orange");

  return (
    <>
    <Header />
    <VStack spacing={5} p={5} align="stretch">
      <Flex direction={['column', 'column', 'row']} p={5} align="stretch">
        <VStack spacing={5} flex="3" p={5} align="stretch" overflow="auto">
          <Text fontSize="2xl" fontWeight="bold" color={colorScheme}>Article Scraper</Text>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={Search2Icon} color="gray.400" />
            </InputLeftElement>
            <Input value={url} onChange={handleUrlChange} type="url" placeholder="Enter article URL" focusBorderColor={colorScheme} />
          </InputGroup>
          <Button colorScheme={colorScheme} onClick={handleSubmit} isLoading={isLoading} loadingText="Scraping...">
            Scrape
          </Button>
          <Box bg={bg} p={4} boxShadow="lg" borderRadius="lg" overflow="hidden">
            <Text fontWeight="bold" fontSize="lg">Title:</Text>
            <Text mb={2}>{data.naslov}</Text>
            <Text fontWeight="bold" fontSize="lg">Summary:</Text>
            <Text mb={2}>{data.povzetek}</Text>
            <Text fontWeight="bold" fontSize="lg">Content:</Text>
            <Textarea value={data.vsebina_clanka} isReadOnly />
            <Text fontWeight="bold" fontSize="lg">Tags:</Text>
            <Text>{data.tags}</Text>
          </Box>
        </VStack>
        <Box flex="1" p={5} bg={bg} boxShadow="lg" borderRadius="lg">
          <Chat text={data.vsebina_clanka} />
        </Box>

      </Flex>
      <Box flex="1" p={5} bg={bg} boxShadow="lg" borderRadius="lg">
        <TextSimplification />
      </Box>
      <Box flex="1" p={5} bg={bg} boxShadow="lg" borderRadius="lg">
        <TextToSpeech text={data.vsebina_clanka} />
      </Box>
    </VStack>
    </>
  );
}
