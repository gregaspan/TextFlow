import React, { useState } from "react";
import { Box, Text, Image, Flex, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [word, setWord] = useState("");
  const [image, setImage] = useState("");
  const [header, setHeader] = useState("");
  const [definition, setDefinition] = useState("");
  const [fullEntry, setFullEntry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setWord(event.target.value);
  };

  const fetchAllData = async () => {
    setIsLoading(true);
    const apiUrl = `http://127.0.0.1:8080/api`;
    try {
      const [detailsResponse, imageResponse] = await Promise.all([
        axios.get(`${apiUrl}/sskj`, { params: { word } }),
        axios.get(`${apiUrl}/image`, { params: { word } }),
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
      console.error("Error fetching data:", error);
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Navbar />
      <Flex direction="column" align="center" justify="center" p={5}>
        <Box textAlign="center" mb={4}>
          <Text fontSize="3xl" fontWeight="bold">
            {header || "Vnesite besedo📖"}
          </Text>
          <Text fontSize="md">{definition || ""}</Text>
          <Text fontSize="sm">{fullEntry || "Definicija bo podana tukaj"}</Text>
        </Box>
        <Image
          src={image || "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"}
          boxSize="300px"
          borderRadius="full"
          mb={4}
        />
        <Flex gap={2}>
          <Input
            placeholder="Type a word here..."
            value={word}
            onChange={handleInputChange}
          />
          <Button colorScheme="blue" onClick={fetchAllData} isLoading={isLoading} loadingText="Searching...">
            Search
          </Button>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}

export default App;
