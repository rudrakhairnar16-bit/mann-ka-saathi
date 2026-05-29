import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

export default function MoodTracker() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { userName } = useUser();
  
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [history, setHistory] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('mannkasaathi_moods')) || [];
    setHistory(savedHistory);
  }, []);

  // MULTILINGUAL MOODS LIST
  const moods = [
    { emoji: "✨", color: "#7CBF9E", label: { hindi: "बहुत अच्छा", english: "Great", hinglish: "Bahut Acha" } },
    { emoji: "😊", color: "#5FB8B8", label: { hindi: "खुश", english: "Happy", hinglish: "Khush" } },
    { emoji: "😌", color: "#4FD1C5", label: { hindi: "शांत", english: "Calm", hinglish: "Shaant" } },
    { emoji: "😐", color: "#A0AEC0", label: { hindi: "ठीक", english: "Okay", hinglish: "Theek" } },
    { emoji: "🥱", color: "#D6BCFA", label: { hindi: "थका हुआ", english: "Tired", hinglish: "Thaka Hua" } },
    { emoji: "🤔", color: "#90CDF4", label: { hindi: "उलझन", english: "Confused", hinglish: "Uljhan" } },
    { emoji: "🥺", color: "#9F7AEA", label: { hindi: "अकेला", english: "Lonely", hinglish: "Akela" } },
    { emoji: "😟", color: "#F6AD55", label: { hindi: "तनाव", english: "Tense", hinglish: "Tension" } },
    { emoji: "😔", color: "#ED8936", label: { hindi: "उदास", english: "Sad", hinglish: "Udaas" } },
    { emoji: "😠", color: "#FC8181", label: { hindi: "गुस्सा", english: "Angry", hinglish: "Gussa" } },
    { emoji: "😭", color: "#E53E3E", label: { hindi: "दुख", english: "Heartbroken", hinglish: "Dukh" } }
  ];

  // MULTILINGUAL UI TEXT
  const uiText = {
    hindi: {
      title: 'मूड ट्रैकर',
      greeting: `${userName}, आज कैसा महसूस कर रहे हैं?`,
      placeholder: 'कुछ लिखना चाहेंगे? (Optional)',
      saveBtn: 'मूड सेव करें',
      success: 'मूड सेव हो गया! ✨',
      journey: 'आपका सफर',
      empty: 'अभी कोई रिकॉर्ड नहीं है। अपना पहला मूड सेव करें!',
      clear: 'Clear',
      confirmClear: 'क्या आप सच में अपनी सारी मूड हिस्ट्री डिलीट करना चाहते हैं?'
    },
    english: {
      title: 'Mood Tracker',
      greeting: `${userName}, how are you feeling today?`,
      placeholder: 'Want to add a note? (Optional)',
      saveBtn: 'Save Mood',
      success: 'Mood saved! ✨',
      journey: 'Your Journey',
      empty: 'No records yet. Save your first mood!',
      clear: 'Clear',
      confirmClear: 'Are you sure you want to delete all your mood history?'
    },
    hinglish: {
      title: 'Mood Tracker',
      greeting: `${userName}, aaj kaisa feel kar rahe hain?`,
      placeholder: 'Kuch likhna chahenge? (Optional)',
      saveBtn: 'Save Mood',
      success: 'Mood save ho gaya! ✨',
      journey: 'Aapka Safar',
      empty: 'Abhi koi record nahi hai. Apna pehla mood save karein!',
      clear: 'Clear',
      confirmClear: 'Kya aap sach mein apni saari mood history delete karna chahte hain?'
    }
  };

  const currentLang = language || 'english';
  const t = uiText[currentLang];

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
    if(window.confirm(t.confirmClear)) {
      localStorage.removeItem('mannkasaathi_moods');
      setHistory([]);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Header */}
      <div style={{ width: '100%', maxWidth: '450px', display: 'flex', alignItems: 'center', marginBottom: '20px', marginTop: '10px' }}>
        <button onClick={() => navigate('/chat')} style={{ background: 'none', border: 'none', fontSize: '24px', color: '#5B8DEF', cursor: 'pointer' }}>
          ←
        </button>
        <h2 style={{ margin: '0 auto', fontSize: '20px', color: '#2E3A45', fontFamily: 'Poppins, sans-serif', fontWeight: '700' }}>
          {t.title}
        </h2>
        <div style={{ width: '24px' }}></div>
      </div>

      {/* Mood Entry Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: '450px', backgroundColor: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '24px' }}
      >
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#2E3A45', fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}>
          {t.greeting}
        </h3>
        
        {/* Mood Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
          {moods.map((m, idx) => {
            const isSelected = selectedMood?.label.english === m.label.english;
            return (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMood(m)}
                style={{
                  background: isSelected ? `${m.color}20` : '#F7F9FC',
                  border: isSelected ? `2px solid ${m.color}` : '2px solid transparent',
                  borderRadius: '16px',
                  padding: '14px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  width: 'calc(33.33% - 8px)',
                  boxSizing: 'border-box'
                }}
              >
                <span style={{ fontSize: '32px' }}>{m.emoji}</span>
                <span style={{ fontSize: '12px', color: '#4A5568', fontWeight: '700' }}>{m.label[currentLang]}</span>
              </motion.button>
            )
          })}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t.placeholder}
          style={{
            width: '100%',
            padding: '14px 16px',
            backgroundColor: '#F7F9FC',
            border: '2px solid #E2E8F0',
            borderRadius: '16px',
            fontSize: '15px',
            fontFamily: 'Nunito, sans-serif',
            minHeight: '100px',
            resize: 'none',
            outline: 'none',
            marginBottom: '20px',
            boxSizing: 'border-box'
          }}
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveMood}
          disabled={!selectedMood}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: selectedMood ? '#5B8DEF' : '#CBD5E0',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: selectedMood ? 'pointer' : 'not-allowed',
            fontFamily: 'Poppins, sans-serif',
            boxShadow: selectedMood ? '0 6px 16px rgba(91,141,239,0.3)' : 'none',
            transition: 'background-color 0.3s'
          }}
        >
          {t.saveBtn}
        </motion.button>

        <AnimatePresence>
          {showSuccess && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ color: '#7CBF9E', textAlign: 'center', margin: '16px 0 0 0', fontSize: '15px', fontWeight: '700' }}
            >
              {t.success}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* History Section */}
      <div style={{ width: '100%', maxWidth: '450px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#2E3A45', fontFamily: 'Poppins, sans-serif', fontWeight: '700' }}>
            {t.journey}
          </h3>
          {history.length > 0 && (
            <button onClick={clearHistory} style={{ background: 'rgba(252, 129, 129, 0.1)', border: 'none', color: '#FC8181', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: '700' }}>
              {t.clear}
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: 'white', borderRadius: '20px', color: '#A0AEC0', fontSize: '15px', fontWeight: '600' }}>
            {t.empty}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px', display: 'flex', alignItems: 'flex-start', gap: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}
              >
                <div style={{ fontSize: '36px', backgroundColor: `${item.mood.color}15`, padding: '12px', borderRadius: '16px' }}>
                  {item.mood.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '700', color: '#2E3A45', fontSize: '16px' }}>{item.mood.label[currentLang]}</span>
                    <span style={{ fontSize: '12px', color: '#A0AEC0', fontWeight: '600' }}>{item.date}, {item.time}</span>
                  </div>
                  {item.note && (
                    <p style={{ margin: 0, fontSize: '14px', color: '#4A5568', fontFamily: 'Nunito, sans-serif', backgroundColor: '#F7F9FC', padding: '12px', borderRadius: '12px', marginTop: '10px', fontStyle: 'italic' }}>
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