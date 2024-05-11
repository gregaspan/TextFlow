import React, { useState } from 'react';
import './App.css';
import Menu from './components/Menu';

function App() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="App">
      <Menu activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
    </div>
  );
}

export default App;
