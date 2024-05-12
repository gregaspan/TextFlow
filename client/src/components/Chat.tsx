import React, { useState } from "react";
import {
  VStack,
  Textarea,
  Input,
  Button,
  useToast,
  useColorModeValue
} from "@chakra-ui/react";
import axios from "axios";

// Define the type for the props
interface ChatProps {
    text: string;  // Assuming text should be a string
  }

const Chat: React.FC<ChatProps> = ({ text }) => {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
  
    const handleQuestionChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setQuestion(e.target.value);
  
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
      }finally {
        setIsLoading(false);
      }
    };

    const colorScheme = useColorModeValue("blue", "orange");
  
    return (
        <VStack spacing={4} width="100%">
        <Input
          value={question}
          onChange={handleQuestionChange}
          placeholder="Enter your question..."
          focusBorderColor={colorScheme}
        />
        <Button
          colorScheme={colorScheme}
          onClick={handleSubmit}
          isLoading={isLoading}
          loadingText="Submitting..."
        >
          Submit
        </Button>
        <Textarea value={response} placeholder="Response will appear here..." isReadOnly />
      </VStack>
    );
  };
  
  export default Chat;