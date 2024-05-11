import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Text, List, ListItem, Spinner } from '@chakra-ui/react';

export default function TextDescription() {
    const [messages, setMessages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const isError = (err: unknown): err is Error => err instanceof Error;

    const fetchInnoviseData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/');
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }

            const text = await response.text();
            console.log("Raw Text Response:", text); // Always log raw response

            const data = JSON.parse(text);
            const data1 = JSON.parse(data);
            console.log(typeof(data1))
            const messageContent = data1.choices[0].message.content;

            setMessages(messageContent);
        } catch (err: unknown) {
            if (isError(err)) {
                setError(err.message || 'An error occurred while fetching data');
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInnoviseData();
    }, []);

    return (
        <Card>
            <CardHeader>
                <Text fontSize="xl" fontWeight="bold">
                    Chat Responses
                </Text>
            </CardHeader>
            <CardBody>
                {loading ? (
                    <Spinner size="lg" />
                ) : error ? (
                    <Text color="red.500">{error}</Text>
                ) : (
                    <Text > {messages} </Text>
                )}
            </CardBody>
        </Card>
    );
}
