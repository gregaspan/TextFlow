import React, { useState, useEffect, ChangeEvent,useRef} from 'react';
import './App.css';
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
  } from '@chakra-ui/react';
  import { Tooltip } from '@chakra-ui/react';
  import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const WordCarousel: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [sliderValue, setSliderValue] = React.useState(100);
  const [showTooltip, setShowTooltip] = React.useState(false);

  // Handle text input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputText = e.target.value;
    setText(inputText);
    setWords(inputText.split(' ').filter((word) => word !== ''));
    setCurrentWordIndex(0); // Reset index
  };
  const sliderValueRef = useRef(sliderValue);
  sliderValueRef.current = mapSliderValueToRange(sliderValue);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length); // Cyclically update the index
    }, sliderValueRef.current); // Change words every sliderValue milliseconds

    return () => clearInterval(timer);
  }, [words, sliderValue]); 

  return (
    <>
    <Navbar />
    <div className="carousel-container">
      <input
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Enter your text here"
      />
      <div className="carousel-display">
        {words.length > 0 && words.map((word, index) => (
          <span 
            key={index}
            className={`word ${
              index === currentWordIndex ? 'active' :
              index === (currentWordIndex + 1) % words.length ? 'right' :
              index === (currentWordIndex + 2) % words.length ? 'right-hidden' :
              index === (currentWordIndex - 2 + words.length) % words.length ? 'left-hidden':
              index === (currentWordIndex - 1 + words.length) % words.length ? 'left' : 'hidden' 
              
            }`}
            >
            {word}
          </span>
        ))}
      </div>
      <Slider
        id='slider'
        defaultValue={1000}
        step={10}
        min={30}
        max={200}
        colorScheme='teal'
        onChange={setSliderValueAndTransition}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        >
        <SliderMark value={30} mt='1' ml='-2.5' fontSize='sm'>
            30
        </SliderMark>
        <SliderMark value={200} mt='1' ml='-2.5' fontSize='sm'>
            200
        </SliderMark>
        <SliderTrack>
            <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
            hasArrow
            bg='teal.500'
            color='white'
            placement='bottom'
            isOpen={showTooltip}
            label={`${sliderValue}`}
        >
            <SliderThumb />
        </Tooltip>
        </Slider>
    </div>
    <Footer />
    </>
  );
  function mapSliderValueToRange(sliderValue: number) {
    const inputMin = 30, inputMax = 200;
    const outputMin = 2000, outputMax = 300;
    // Linearly interpolate from slider range to desired range
    return outputMin + ((outputMax - outputMin) * (sliderValue - inputMin)) / (inputMax - inputMin);
  }
function setSliderValueAndTransition(v: any) {
    const inputMin = 30, inputMax = 200;
    const outputMin = 1.5, outputMax = 0.3;

    // Linearly interpolate from slider range to desired transition speed range
    const transitionSpeed = outputMin + ((outputMax - outputMin) * (v - inputMin)) / (inputMax - inputMin);

    // Apply the transition speed to the "word" class
    const wordElements = document.getElementsByClassName("word") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < wordElements.length; i++) {
        wordElements[i].style.transition = `all ${transitionSpeed}s`;
    }

    setSliderValue(v);
}
};

export default WordCarousel;
