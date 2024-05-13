import React, { useState } from "react";
import {
  VStack,
  Input,
  Button,
  Box,
  Text,
  Textarea,
  useColorModeValue,
  Flex
} from "@chakra-ui/react";
import Chat from "./components/Chat";
import TextSimplification from "./components/textSimplification";
import TextToSpeech from "./components/TextToSpeach";
import Header from "./components/Navbar";
import SpeechToText from "./components/SpeachToText";

export default function TextInputFlow() {
  const [text, setText] = useState('');
  const bg = useColorModeValue("white", "gray.800");
  const colorScheme = useColorModeValue("blue", "orange");

  const handleTextChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setText(e.target.value);

  return (
    <>
      <Header />
      <VStack spacing={5} p={5} align="stretch">
        <Flex direction={['column', 'column', 'row']} p={5} align="stretch">
          <VStack spacing={5} flex="3" p={5} align="stretch">
            <Text fontSize="2xl" fontWeight="bold" color={colorScheme}>Text Input</Text>
            <Input
              value={text}
              onChange={handleTextChange}
              placeholder="Enter text here"
              focusBorderColor={colorScheme}
            />
            <Textarea value={text} isReadOnly />
          </VStack>
          <Box flex="1" p={5} bg={bg} boxShadow="lg" borderRadius="lg">
            <Chat text={text} />
          </Box>
        </Flex>
        <Box flex="1" p={5} bg={bg} boxShadow="lg" borderRadius="lg">
          <TextSimplification />
        </Box>
        <Box flex="1" p={5} bg={bg} boxShadow="lg" borderRadius="lg">
          <TextToSpeech text={text} />
        </Box>
        <Box flex="1" p={5} bg={bg} boxShadow="lg" borderRadius="lg">
          <SpeechToText />
        </Box>
      </VStack>
    </>
  );
}
