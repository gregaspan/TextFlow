// Importing React hooks and components from Chakra UI
import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Textarea,
  Input,
  Button,
  useToast,
  useColorModeValue
} from "@chakra-ui/react";
import axios from "axios";  // Importing axios for API requests

// Define the type for the props
interface ChatProps {
  text: string;  // Assuming text should be a string
}

// Component definition for ChatDrawer
const ChatDrawer: React.FC<ChatProps> = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);  // State to manage Drawer visibility
  const [question, setQuestion] = useState("");  // State to hold the question input
  const [response, setResponse] = useState("");  // State to store the API response
  const [isLoading, setIsLoading] = useState(false);  // State to manage loading status
  const toast = useToast();  // Hook to call toast for notifications

  const handleOpen = () => setIsOpen(true);  // Function to open the drawer
  const handleClose = () => setIsOpen(false);  // Function to close the drawer

  const toggleDrawer = () => setIsOpen(!isOpen);

  // Handles changes to the question input
  const handleQuestionChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setQuestion(e.target.value);

  // Function to submit the question
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:8080/api/chat', { question, text });
      const data = JSON.parse(response.data);
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error communicating with the API:', error);
      toast({
        title: "Error",
        description: "Failed to fetch the answer from the server.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const colorScheme = useColorModeValue("blue", "blue");  // Dynamic color scheme based on theme

  return (
    <>
      <Button onClick={toggleDrawer} colorScheme={colorScheme}>
        Odpri Chat
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={toggleDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Vnsei vprašanje!</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4}>
              <Input
                value={question}
                onChange={handleQuestionChange}
                placeholder="Vnesi vprašanje..."
                focusBorderColor={colorScheme}
              />
              <Button
                colorScheme={colorScheme}
                onClick={handleSubmit}
                isLoading={isLoading}
                loadingText="Vnašanje..."
              >
                Vnesi
              </Button>
              <Textarea value={response} placeholder="Tukaj bo odgovor..." isReadOnly />
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={toggleDrawer}>
              Zapri
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ChatDrawer;
