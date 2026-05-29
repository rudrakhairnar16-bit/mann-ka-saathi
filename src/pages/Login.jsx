import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';

export default function Login() {
  const [nameInput, setNameInput] = useState('');
  const { setUserName } = useUser();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    setUserName(nameInput);
    navigate('/'); // Login ke baad Home page par bhejega
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ backgroundColor: 'white', padding: '40px 30px', borderRadius: '30px', maxWidth: '400px', width: '100%', boxShadow: '0 10px 40px rgba(91, 141, 239, 0.15)', textAlign: 'center' }}
      >
        <img src="/src/assets/logo.png" alt="Logo" style={{ width: '100px', height: '100px', objectFit: 'contain', marginBottom: '20px' }} />
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#2E3A45', marginBottom: '10px', fontFamily: 'Poppins, sans-serif' }}>Welcome to Mann Ka Saathi</h2>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '25px' }}>Apna naam batayein taaki hum aapse jud sakein.</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Enter your name..." 
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            style={{ padding: '14px 18px', borderRadius: '15px', border: '2px solid #E5E7EB', outline: 'none', fontSize: '16px' }}
          />
          <button type="submit" style={{ backgroundColor: '#5B8DEF', color: 'white', padding: '14px', borderRadius: '15px', border: 'none', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 5px 15px rgba(91, 141, 239, 0.3)' }}>
            Continue 💙
          </button>
        </form>
      </motion.div>
    </div>
  );
}