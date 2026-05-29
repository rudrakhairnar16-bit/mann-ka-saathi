import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Aapke saare components aur providers yahan import honge
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Chat from './pages/Chat';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import Resources from './pages/Resources';
import MoodTracker from './pages/MoodTracker';
import DailyChallenge from './pages/DailyChallenge';
import Books from './pages/Books'; // Naya Books page import kiya

// Providers import (ensure inke paths sahi hon)
import { LanguageProvider } from './context/LanguageContext'; 
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <Router>
          <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/results" element={<Results />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/mood" element={<MoodTracker />} />
              <Route path="/challenge" element={<DailyChallenge />} /> 
              {/* Humara naya Books route yahan add kiya hai 👇 */}
              <Route path="/books" element={<Books />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;