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
import TextSimplification from "./components/textSimplification";
import TextToSpeech from "./components/TextToSpeach";
import Header from "./components/Navbar";
import SpeachToText from "./components/SpeachToText";
import ClickableText from "./components/ClickableText";
import Footer from "./components/Footer";

export default function Scraper() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState({
    naslov: "",
    povzetek: "",
    vsebina_clanka: "",
    tags: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setUrl(e.target.value);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Replace 'http://localhost:5000/api/scrape' with your actual API endpoint
      const response = await axios.post("http://localhost:8080/api/scrape", {
        article: url,
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
        <Flex direction={["column", "column", "row"]} p={5} align="stretch">
          <VStack spacing={5} flex="3" p={5} align="stretch" overflow="auto">
            <Text fontSize="3xl" fontWeight="bold">
              {"Vnesite povezavo članka📰"}
            </Text>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={Search2Icon} color="gray.400" />
              </InputLeftElement>
              <Input
                value={url}
                onChange={handleUrlChange}
                type="url"
                placeholder="Enter article URL"
                focusBorderColor={colorScheme}
              />
            </InputGroup>
            <Button
              colorScheme={colorScheme}
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText="Scraping..."
            >
              Scrape
            </Button>
            <Box
              bg={bg}
              p={4}
              boxShadow="lg"
              borderRadius="lg"
              overflow="hidden"
            >
              <Text fontSize="3xl" fontWeight="bold">
                {data.naslov || "Tu bo prikazan naslov"}
              </Text>
              <br />
              <Text fontWeight="bold" fontSize="lg">
              {data.povzetek}
              </Text>
              <br />
              <div className="edditable" style={{ width: "100%" }}>
                <ClickableText text={data.vsebina_clanka} />
              </div>
              <Text fontWeight="bold" fontSize="lg">{data.tags}</Text>
            </Box>
            <Chat text={data.vsebina_clanka} />

            <Box flex="1" p={5} bg={bg} boxShadow="lg" borderRadius="lg">
              <TextToSpeech text={data.vsebina_clanka} />
            </Box>
            <Box height="2px" width="full" bgGradient="linear(to-r, gray.900, white)" opacity="0.6" my={6} boxShadow="sm"/>
          </VStack>
        </Flex>
        <Box flex="1" p={5} bg={bg} boxShadow="lg" borderRadius="lg">
          <TextSimplification initialText={data.vsebina_clanka} />
        </Box>
      </VStack>
      <Box height="2px" width="full" bgGradient="linear(to-r, gray.900, white)" opacity="0.6" my={6} boxShadow="sm"/>
      <Footer />
    </>
  );
}
