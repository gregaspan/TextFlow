import React, { useState, useEffect, ChangeEvent, useRef, FormEventHandler } from 'react';
import './App.css';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { IoPlay } from "react-icons/io5";
import { TbPlayerPauseFilled } from "react-icons/tb";
import { IconContext } from "react-icons";
import { useLocation } from 'react-router-dom';

const WordCarousel: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [sliderValue, setSliderValue] = React.useState(100);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const bg = useColorModeValue('blue', 'orange')
  const bg_slider = useColorModeValue('gray.300', 'white')

  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.text) {
      setText(location.state.text);  // Set text from navigation state
      setWords(location.state.text.split(' ').filter((word: string) => word !== ''));
      const wordElements = document.getElementsByClassName("input-text")[0] as HTMLDivElement;
      wordElements.style.display = 'none';
    }
  }, [location]);

  // Handle text input changes
  const handleInputChange = (e: ChangeEvent<HTMLDivElement>) => {
    var inputText = e.target.textContent ? e.target.textContent : '';
    const wordElements = document.getElementsByClassName("input-text")[0] as HTMLDivElement;
    wordElements.style.display = (inputText == '')?``:'none';


    inputText = inputText.replace(/<[^>]*>?/gm, '');
    setText(inputText);
    setWords(inputText.split(' ').filter((word) => word !== ''));
    setCurrentWordIndex(0); // Reset index
  };
  
  const sliderValueRef = useRef(sliderValue);
  sliderValueRef.current = mapSliderValueToRange(sliderValue);
  const index = useRef(currentWordIndex);
  index.current = currentWordIndex;
  const barva = useRef(bg);
  barva.current = bg;
  const running = useRef(isRunning);
  running.current = isRunning;


  function formatText(text: string) {
    if (text === '') return;
    const words = text.split(' ').filter(word => word !== '');
    if (words.length >= index.current) {
      words[(index.current + 1 < words.length) ? index.current + 1 : 0] = `<span style="color: ${barva.current};"><b>${words[(index.current + 1 < words.length) ? index.current + 1 : 0]}</b></span>`;
    }
    const editableDiv = document.querySelector('.edditable');
    if (editableDiv) {
      editableDiv.innerHTML = words.join(' ');
    }

  }
  useEffect(() => {
    const timer = setInterval(() => {
      if (running.current) {
        formatText(text);
        console.log(index.current);
        setCurrentWordIndex((index) => (index + 1) % words.length); // Cyclically update the index
        console.log(index.current);
      }
    }, sliderValueRef.current); // Change words every sliderValue milliseconds
    return () => clearInterval(timer);
  }, [words, sliderValue]);

  return (
    <>
      <Navbar />
      <br />

      <Text fontSize="3xl" fontWeight="bold">
            {"Pomocnik za hitro branje📚"}
      </Text>
      <div className="carousel-container">
        <div className="edditable" contentEditable={!running.current} onInput={handleInputChange}>{text}</div>
        <div className='input-text' style={{position: 'absolute', top: '21.5%', left: '50%', transform: 'translateX(-50%)'}}>
        <span style={{opacity:0.5}}>"Vpisi besedilo in izberi hitrost branja!"</span>
        </div>
        <div className="carousel-display">
          {words.length > 0 && words.map((word, index) => (
            <span
              key={index}
              className={`word ${index === currentWordIndex ? 'active' :
                  index === (currentWordIndex + 1) % words.length ? 'right' :
                    index === (currentWordIndex + 2) % words.length ? 'right-hidden' :
                      index === (currentWordIndex - 2 + words.length) % words.length ? 'left-hidden' :
                        index === (currentWordIndex - 1 + words.length) % words.length ? 'left' : 'hidden'

                }`}
            >
              {word}
            </span>
          ))}
        </div>
        <Slider
          id='slider'
          defaultValue={100}
          step={10}
          min={30}
          max={300}
          colorScheme={bg}
          onChange={setSliderValueAndTransition}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SliderMark value={30} mt='1' ml='-2.5' fontSize='sm'>
            30
          </SliderMark>
          <SliderMark value={300} mt='1' ml='-2.5' fontSize='sm'>
            300
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg={bg}
            color='white'
            placement='bottom'
            isOpen={showTooltip}
            label={`${sliderValue}`}
          >
            <SliderThumb bg={bg_slider} />
          </Tooltip>
        </Slider>
        <button onClick={() => (running.current) ? setIsRunning(false) : setIsRunning(true)} className="button-icon">
          <IconContext.Provider value={{ size: "0.2em" }}>
            {running.current ? <TbPlayerPauseFilled /> : <IoPlay />}
          </IconContext.Provider>
        </button>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
  function mapSliderValueToRange(sliderValue: number) {
    let output: number;
    output = 60 / sliderValue * 1000;
    return output;
  }
  function setSliderValueAndTransition(v: any) {

    // Linearly interpolate from slider range to desired transition speed range
    const transitionSpeed = 25 / v;

    // Apply the transition speed to the "word" class
    const wordElements = document.getElementsByClassName("word") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < wordElements.length; i++) {
      wordElements[i].style.transition = `all ${transitionSpeed}s`;
    }

    setSliderValue(v);
  }
};

export default WordCarousel;