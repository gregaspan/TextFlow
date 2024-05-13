import React, { useState } from "react";
import '../App.css';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    Image,
  } from '@chakra-ui/react';
  import axios from "axios";


interface ClickableTextProps {
    text: string;
}
const ClickableText: React.FC<ClickableTextProps> = ({ text }) => {
    const [image, setImage] = useState("");
    const [definition, setDefinition] = useState("");
    const [synonyms, setSynonyms] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchAllData = async (word: String) => {
        const apiUrl = `http://127.0.0.1:8080/api`;
        const formattedWord = word.replace(/[^a-zA-Z]/g, '');

        try {
            setLoading(true);
          const [detailsResponse, imageResponse, synonymsResponse] = await Promise.all([
            axios.get(`${apiUrl}/sskj`, { params: { word: formattedWord } }),
            axios.get(`${apiUrl}/image`, { params: { word: formattedWord } }),
            axios.get(`${apiUrl}/synonyms`, { params: { word: formattedWord } }),
          ]);

          if (detailsResponse.data) {
            setDefinition(detailsResponse.data.definicija);
          }
    
          if (imageResponse.data.image_url) {
            setImage(imageResponse.data.image_url);
          }
          if (synonymsResponse.data.synonyms) {
            var synonymsText = synonymsResponse.data.synonyms[0];
            console.log(synonymsResponse.data.synonyms.length);
            for (let i = 1; i < synonymsResponse.data.synonyms.length; i++) {
                synonymsText += ","+synonymsResponse.data.synonyms[i];
            }
            setSynonyms(synonymsText);
          }
          setLoading(false);  
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    

    return (
        
        <div>
            {text.split(' ').map((word: string, index: number) => (
                <>
                <Popover placement='top'>
                    <PopoverTrigger>
                    <span
                        key={index}
                        className="clickable-word"
                        onClick={() => fetchAllData(word)}
                    >
                        {word}
                    </span>
                    </PopoverTrigger>
                    <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverContent>Loading...</PopoverContent>
                     <PopoverBody>{synonyms}</PopoverBody>
                     <PopoverHeader>{definition}</PopoverHeader>
                     <Image
                        src={image || "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"}
                        boxSize="300px"
                        borderRadius="full"
                        mb={4}
                    />
                    </PopoverContent>
                </Popover>
                </>
            ))}
        </div>
        
    );
};

export default ClickableText;