import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./About";
import Scraper from "./Scraper";
import Textflow from "./Textflow";
import Words from "./Words";
import Landing from "./Landing";

function App() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/scraper" element={<Scraper />} />
          <Route path="/textflow" element={<Textflow />} />
          <Route path="/words" element={<Words />} />
          <Route path="/about" element={<About />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
