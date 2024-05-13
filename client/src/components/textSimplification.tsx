import { Textarea, Text, RadioGroup, Stack, Radio, Button, Card, CardHeader, CardBody, Container, useColorModeValue, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

interface InputTextProps {
    initialText: string; // Define a prop to receive initial text
}

export default function InputText({ initialText }: InputTextProps) {
    const [simplificationLevel, setSimplificationLevel] = useState('basic');
    //const [simplifiedText, setSimplifiedText] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessages] = useState<string[]>([]);
    const [inputText, setInputText] = useState(initialText);
    const bg = useColorModeValue('blue', 'orange')


    useEffect(() => {
        setInputText(initialText); // Update inputText when initialText changes
    }, [initialText]);

    // Handle text input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(e.target.value);
    };

    // Handle simplification level change
    const handleLevelChange = (level: string) => {
        setSimplificationLevel(level);
    };

    // Submit the data to the backend for processing
    const submitTextForProcessing = async () => {
        setLoading(true);
        setError(null);
        //setSimplifiedText(null);

        try {
            // Create the payload
            const payload = {
                text: inputText,
                level: simplificationLevel
            };

            // Send the request to the backend API
            const response = await fetch('http://localhost:8080/api/simplify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            // Parse the response data

            const text = await response.text();
            console.log("Raw Text Response:", text); // Always log raw response

            const data = JSON.parse(text);
            const data1 = JSON.parse(data);
            console.log(typeof (data1))
            const messageContent = data1.choices[0].message.content;
            setMessages(messageContent);

        } catch (err: any) {
            setError(`Unable to process the text: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxW={"xl"} width="100%">
            {error ? (
                <Text color='red.500'>{error}</Text>
            ) : (

                <Text fontSize="3xl" fontWeight="bold">
                    Izberi nivo poenostavitve:
                </Text>
            )}
            <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                <RadioGroup value={simplificationLevel} onChange={handleLevelChange} mb={6}>
                    <Stack direction="row" spacing={5}>
                        <Radio value="malo poenostavljeno">malo poenostavljeno</Radio>
                        <Radio value="bolj poenostavljeno">bolj poenostavljeno</Radio>
                        <Radio value="zelo poenostavljeno">zelo poenostavljeno</Radio>
                    </Stack>
                </RadioGroup>
            </Box>
        
            <Textarea
                value={inputText}
                onChange={handleInputChange}
                placeholder='Vnesi text za poenostavitev'
                size='sm'
                mb={4}
                style={{ width: 0, height: 0, opacity: 0 }}
            />

            <Button onClick={submitTextForProcessing} colorScheme={bg} mb={4} isLoading={loading} loadingText="Poenostavljanje...">
                Poenostavi
            </Button>

            <Card>
                <CardHeader>
                    <Text fontSize="xl" fontWeight="bold">
                        Poenostavljeno besedilo
                    </Text>
                </CardHeader>
                <CardBody>
                    {error ? (
                        <Text color="red.500">{error}</Text>
                    ) : (
                        <Text > {message} </Text>
                    )}
                </CardBody>
            </Card>
        </Container>
    );
}
