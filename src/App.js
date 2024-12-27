import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Welcome from "./pages/Welcome"
import { SoundProvider } from './context/SoundContext';
import TakeName from './pages/Name';


const App = () => {
  return (
    <SoundProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/onboarding" element={<TakeName />} />
          <Route path="/ai" element={<Home />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    </SoundProvider>
  );
};

export default App;
