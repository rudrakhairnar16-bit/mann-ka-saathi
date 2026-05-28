import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Chat from './pages/Chat';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import Resources from './pages/Resources';
import MoodTracker from './pages/MoodTracker';
import DailyChallenge from './pages/DailyChallenge'; // Naya import

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
              <Route path="/challenge" element={<DailyChallenge />} /> {/* Naya Route */}
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;