import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  // LocalStorage se naam check karega, nahi to empty rahega
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || '';
  });

  // Jab bhi naam change hoga, usko local storage mein save kar dega
  useEffect(() => {
    if (userName) {
      localStorage.setItem('userName', userName);
    } else {
      localStorage.removeItem('userName');
    }
  }, [userName]);

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}