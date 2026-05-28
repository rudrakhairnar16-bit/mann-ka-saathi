import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ChatBubble from '../components/ChatBubble';

export default function Assessment() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  // Data se liye gaye questions (Chat style)
  const questions = [
    "Ek simple sawaal poochna tha... Pichhle 2 hafte mein kitni baar aisa feel hua ki kuch acha nahi lag raha?",
    "Kya aapko apne manpasand kaamo mein interest kam lag raha hai?",
    "Kya aapko neend aane mein ya sote rehne mein dikkat ho rahi hai?",
    "Kya aapko lagta hai ki aap overthinking kar rahe hain aur dimag shant nahi ho raha?"
  ];

  // Scoring Logic: Option A=0, B=1, C=2, D=3
  const options = [
    { text: "Bilkul Nahi", points: 0, emoji: "🟢" },
    { text: "Kabhi Kabhi", points: 1, emoji: "🟡" },
    { text: "Aksar", points: 2, emoji: "🟠" },
    { text: "Har Waqt", points: 3, emoji: "🔴" }
  ];

  const handleAnswer = (points) => {
    const newScore = score + points;
    
    if (currentQ < questions.length - 1) {
      setScore(newScore);
      setCurrentQ(currentQ + 1);
    } else {
      navigate('/results', { state: { finalScore: newScore } });
    }
  };

  return (
    <div style={{ height: '100vh', backgroundColor: '#F7F9FC', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header with Progress Bar */}
      <div style={{ backgroundColor: '#5B8DEF', padding: '16px 20px', color: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <button onClick={() => navigate('/chat')} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>
            ←
          </button>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', fontFamily: 'Poppins, sans-serif' }}>
            Mann Ka Checkup
          </h2>
        </div>
        
        {/* Progress Bar Container */}
        <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.3)', height: '6px', borderRadius: '10px' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            style={{ height: '100%', backgroundColor: 'white', borderRadius: '10px' }}
          />
        </div>
        <div style={{ textAlign: 'right', fontSize: '12px', marginTop: '4px', opacity: 0.9 }}>
          Saathi Question {currentQ + 1}/{questions.length}
        </div>
      </div>

      {/* Chat Style Question Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ChatBubble 
              message={questions[currentQ]} 
              sender="bot" 
              timestamp="Just now" 
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Answer Options Area */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderTop: '1px solid #E5E7EB', boxShadow: '0 -4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {options.map((opt, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleAnswer(opt.points)}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#F7F9FC',
                border: '1px solid #E5E7EB',
                borderRadius: '16px',
                color: '#2E3A45',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'Nunito, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '18px' }}>{opt.emoji}</span>
              {opt.text}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}