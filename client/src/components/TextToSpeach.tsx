import React, { useState } from "react";
import {
  VStack,
  Button,
  useToast,
  useColorModeValue,
  Progress,
  Box,
  Icon,
  Text
} from "@chakra-ui/react";
import { FaPlayCircle } from 'react-icons/fa'; // Importing a play icon for the button
import axios from "axios";

interface TextToSpeechProps {
  text: string;  // Text to be converted to speech
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!text) {
      toast({
        title: "Error",
        description: "No text provided for speech conversion.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/tts', { text }, { responseType: 'blob' });
      const url = URL.createObjectURL(response.data);
      setAudioBlobUrl(url);
    } catch (error) {
      console.error('Error converting text to speech:', error);
      toast({
        title: "Error",
        description: "Failed to convert text to speech.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setAudioBlobUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  const colorScheme = useColorModeValue("blue", "blue");

  return (
    <VStack spacing={4} width="100%">
      <Button
        leftIcon={<Icon as={FaPlayCircle} />}
        colorScheme={colorScheme}
        onClick={handleSubmit}
        isLoading={isLoading}
        loadingText="Converting..."
      >
        Pretvori v govor
      </Button>
      {isLoading ? (
        <Progress size="xs" isIndeterminate />
      ) : audioBlobUrl ? (
        <Box boxShadow="md" p="4" borderRadius="md" w="full">
          <Text fontSize="md" mb="2">Pretvori v govor:</Text>
          <audio controls src={audioBlobUrl} style={{ width: '100%' }}>
            Your browser does not support the audio element.
          </audio>
        </Box>
      ) : null}
    </VStack>
  );
};

export default TextToSpeech;
