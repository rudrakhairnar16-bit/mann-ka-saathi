import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { LanguageProvider } from './context/LanguageContext';

// Pages
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Chat from './pages/Chat';
import MoodTracker from './pages/MoodTracker';
import Assessment from './pages/Assessment';
import Books from './pages/Books';
import Community from './pages/Community';
import DailyChallenge from './pages/DailyChallenge';
import Resources from './pages/Resources';
import SOS from './pages/SOS';
import Journal from './pages/Journal';
import Analytics from './pages/Analytics';

// Protected Route Logic
const ProtectedRoute = ({ children }) => {
  const userName = localStorage.getItem('mannkasaathi_user');
  if (!userName || userName.trim() === '') {
    return <Navigate to="/onboarding" replace />;
  }
  return children;
};

export default function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <Router>
          <Routes>
            {/* Open Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
            
            {/* SOS is open for emergencies */}
            <Route path="/sos" element={<SOS />} /> 

            {/* Protected Routes */}
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/mood" element={<ProtectedRoute><MoodTracker /></ProtectedRoute>} />
            <Route path="/assessment" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
            <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
            <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
            <Route path="/challenges" element={<ProtectedRoute><DailyChallenge /></ProtectedRoute>} />
            <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
            <Route path="/journal" element={<ProtectedRoute><Journal /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          </Routes>
        </Router>
      </UserProvider>
    </LanguageProvider>
  );
}