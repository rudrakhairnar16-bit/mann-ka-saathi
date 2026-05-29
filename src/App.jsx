import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider, useUser } from './context/UserContext';

// Importing all pages 
import Home from './pages/Home';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Chat from './pages/Chat';
import Assessment from './pages/Assessment';
import Books from './pages/Books';
import Community from './pages/Community';
import DailyChallenge from './pages/DailyChallenge'; 
import MoodTracker from './pages/MoodTracker';
import Resources from './pages/Resources';
import Results from './pages/Results';
import SOS from './pages/SOS'; // Naya SOS import

function ProtectedRoute({ children }) {
  const { userName } = useUser();
  if (!userName) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />

            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/assessment" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
            <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
            <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
            <Route path="/challenges" element={<ProtectedRoute><DailyChallenge /></ProtectedRoute>} />
            <Route path="/mood" element={<ProtectedRoute><MoodTracker /></ProtectedRoute>} />
            <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
            <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
            <Route path="/sos" element={<ProtectedRoute><SOS /></ProtectedRoute>} /> {/* Naya SOS Route */}
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </UserProvider>
    </LanguageProvider>
  );
}