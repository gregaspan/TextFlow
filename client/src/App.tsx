import React, { useState } from 'react';
import './App.css';
import InputText from './components/InputText';
import TextDescription from './components/textDescription';

function App() {
  const [count, setCount] = useState(0); // Ensure useState is properly imported <TextDescription /> 

  return (
    <>
      <InputText />
    </>
  );
}

export default App;