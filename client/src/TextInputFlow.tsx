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
import ClickableText from "./components/ClickableText";

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

            <Text fontSize="2xl" fontWeight="bold" color={colorScheme}>Vnesi besedlo</Text>

            <Input
              value={text}
              onChange={handleTextChange}
              placeholder="Vnesi besedilo tukaj"
              focusBorderColor={colorScheme}
            />
            <div className="edditable" style={{ width: "100%" }}>
              <ClickableText text={text} />
            </div>
            <Chat text={text} />
          </VStack>

            
          
        </Flex>
        <Box flex="1" p={5} bg={bg} boxShadow="lg" borderRadius="lg">
          <TextSimplification initialText={text}/>
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
