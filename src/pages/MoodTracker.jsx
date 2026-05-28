import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function MoodTracker() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [history, setHistory] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('mannkasaathi_moods')) || [];
    setHistory(savedHistory);
  }, []);

  // EXPANDED MOODS LIST
  const moods = [
    { emoji: "✨", label: "Bahut Acha", color: "#7CBF9E" },
    { emoji: "😊", label: "Khush", color: "#5FB8B8" },
    { emoji: "😌", label: "Shaant", color: "#4FD1C5" },
    { emoji: "😐", label: "Theek", color: "#A0AEC0" },
    { emoji: "🥱", label: "Thaka Hua", color: "#D6BCFA" },
    { emoji: "🤔", label: "Uljhan", color: "#90CDF4" },
    { emoji: "🥺", label: "Akela", color: "#9F7AEA" },
    { emoji: "😟", label: "Tension", color: "#F6AD55" },
    { emoji: "😔", label: "Udaas", color: "#ED8936" },
    { emoji: "😠", label: "Gussa", color: "#FC8181" },
    { emoji: "😭", label: "Dukh", color: "#E53E3E" }
  ];

  const handleSaveMood = () => {
    if (!selectedMood) return;

    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mood: selectedMood,
      note: note.trim()
    };

    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('mannkasaathi_moods', JSON.stringify(updatedHistory));
    
    setSelectedMood(null);
    setNote('');
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const clearHistory = () => {
    if(window.confirm("Kya aap sach mein apni saari mood history delete karna chahte hain?")) {
      localStorage.removeItem('mannkasaathi_moods');
      setHistory([]);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Header */}
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', alignItems: 'center', marginBottom: '20px', marginTop: '10px' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', fontSize: '24px', color: '#5B8DEF', cursor: 'pointer' }}>
          ←
        </button>
        <h2 style={{ margin: '0 auto', fontSize: '18px', color: '#2E3A45', fontFamily: 'Poppins, sans-serif' }}>
          Mood Tracker
        </h2>
        <div style={{ width: '24px' }}></div>
      </div>

      {/* Mood Entry Card */}
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#2E3A45', fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}>
          Aaj kaisa feel kar rahe hain?
        </h3>
        
        {/* UPDATED MOOD GRID (flexWrap & Grid Style) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
          {moods.map((m, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(m)}
              style={{
                background: selectedMood?.label === m.label ? `${m.color}20` : 'transparent',
                border: selectedMood?.label === m.label ? `2px solid ${m.color}` : '2px solid transparent',
                borderRadius: '16px',
                padding: '12px 8px',
                fontSize: '28px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
                width: 'calc(33.33% - 8px)', /* 3 emojis per row setup */
                boxSizing: 'border-box'
              }}
            >
              <span>{m.emoji}</span>
              <span style={{ fontSize: '11px', color: '#4A5568', fontWeight: '600' }}>{m.label}</span>
            </motion.button>
          ))}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Kuch likhna chahenge? (Optional)"
          style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: '#F7F9FC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            fontSize: '14px',
            fontFamily: 'Nunito, sans-serif',
            minHeight: '80px',
            resize: 'none',
            outline: 'none',
            marginBottom: '16px',
            boxSizing: 'border-box'
          }}
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveMood}
          disabled={!selectedMood}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: selectedMood ? '#5B8DEF' : '#CBD5E0',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: selectedMood ? 'pointer' : 'not-allowed',
            fontFamily: 'Poppins, sans-serif',
            boxShadow: selectedMood ? '0 4px 12px rgba(91,141,239,0.3)' : 'none'
          }}
        >
          Save Mood
        </motion.button>

        <AnimatePresence>
          {showSuccess && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ color: '#7CBF9E', textAlign: 'center', margin: '12px 0 0 0', fontSize: '14px', fontWeight: '600' }}
            >
              Mood save ho gaya! ✨
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* History Section */}
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', color: '#2E3A45', fontFamily: 'Poppins, sans-serif' }}>
            Aapka Safar
          </h3>
          {history.length > 0 && (
            <button onClick={clearHistory} style={{ background: 'none', border: 'none', color: '#FC8181', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}>
              Clear
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', backgroundColor: 'white', borderRadius: '16px', color: '#A0AEC0', fontSize: '14px' }}>
            Abhi koi record nahi hai. Apna pehla mood save karein!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ backgroundColor: 'white', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'flex-start', gap: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}
              >
                <div style={{ fontSize: '32px', backgroundColor: `${item.mood.color}15`, padding: '10px', borderRadius: '12px' }}>
                  {item.mood.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600', color: '#2E3A45', fontSize: '15px' }}>{item.mood.label}</span>
                    <span style={{ fontSize: '12px', color: '#A0AEC0' }}>{item.date}, {item.time}</span>
                  </div>
                  {item.note && (
                    <p style={{ margin: 0, fontSize: '14px', color: '#4A5568', fontFamily: 'Nunito, sans-serif', backgroundColor: '#F7F9FC', padding: '8px', borderRadius: '8px', marginTop: '8px' }}>
                      "{item.note}"
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}