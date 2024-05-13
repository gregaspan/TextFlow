import React, { useState } from "react";
import {
  VStack,
  Input,
  Button,
  Box,
  Text,
  Textarea,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import Chat from "./components/Chat";
import TextSimplification from "./components/textSimplification";
import TextToSpeech from "./components/TextToSpeach";
import Header from "./components/Navbar";
import SpeechToText from "./components/SpeachToText";
import ClickableText from "./components/ClickableText";
import SpeachToText from "./components/SpeachToText";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function TextInputFlow() {
  const [text, setText] = useState("");
  const bg = useColorModeValue("white", "gray.800");
  const colorScheme = useColorModeValue("blue", "orange");

  const handleTextChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setText(e.target.value);

  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Box flex="1" p={5} bg={bg} boxShadow="lg" borderRadius="lg">
        <SpeachToText />
      </Box>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}
