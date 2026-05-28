import { createContext, useState, useContext } from 'react';

// Create Context
const UserContext = createContext();

// Provider
export function UserProvider({ children }) {
  const [userName, setUserName] = useState('');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [currentProblem, setCurrentProblem] = useState('');
  const [assessmentResults, setAssessmentResults] = useState(null);

  const saveUserName = (name) => {
    setUserName(name);
    localStorage.setItem('mannkasaathi_name', name);
  };

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('mannkasaathi_onboarded', 'true');
  };

  return (
    <UserContext.Provider value={{
      userName,
      saveUserName,
      hasCompletedOnboarding,
      completeOnboarding,
      currentProblem,
      setCurrentProblem,
      assessmentResults,
      setAssessmentResults,
    }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom Hook
export function useUser() {
  return useContext(UserContext);
}
