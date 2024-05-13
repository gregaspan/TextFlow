import React, { useState } from "react";
import {
  VStack,
  Button,
  Input,
  useToast,
  useColorModeValue,
  Box,
  Text,
  Progress
} from "@chakra-ui/react";
import axios from "axios";

const SpeachToText = () => {
  const [mp3Url, setMp3Url] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //const [transcript, setTranscript] = useState("");
  const [translated, setTranslated] = useState("");
  const toast = useToast();

  const handleMp3UrlChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setMp3Url(e.target.value);
  };

  const handleSubmit = async () => {
    if (!mp3Url) {
      toast({
        title: "Error",
        description: "No MP3 URL provided.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/stt', { mp3_url: mp3Url });
      //setTranscript(response.data.transcript);
      setTranslated(response.data.slo_verzija);
    } catch (error) {
      console.error('Error processing MP3:', error);
      toast({
        title: "Error",
        description: "Failed to process the MP3 file.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const colorScheme = useColorModeValue("blue", "orange");

  return (
    <VStack spacing={4} width="100%">
      <Input
        placeholder="Enter MP3 URL..."
        value={mp3Url}
        onChange={handleMp3UrlChange}
        focusBorderColor={colorScheme}
      />
      <Button
        colorScheme={colorScheme}
        onClick={handleSubmit}
        isLoading={isLoading}
        loadingText="Processing..."
      >
        Prevedi
      </Button>
      {isLoading ? (
        <Progress size="xs" isIndeterminate />
      ) : (
        <>
          {translated && (
            <Box p="4" boxShadow="md" borderRadius="md" w="full">
              <Text fontSize="md" mb="2" fontWeight="bold">Translated:</Text>
              <Text>{translated}</Text>
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

export default SpeachToText;
