import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ChatBubble from '../components/ChatBubble';

export default function Chat() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { userName } = useUser();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Welcome Message
  useEffect(() => {
    const welcomeMessages = {
      hindi: `नमस्ते ${userName}! 🙏\n\nमैं हूं आपका मन का साथी!\n\nआज कैसा महसूस हो रहा है? 🤗`,
      english: `Hello ${userName}! 🙏\n\nI am your Mann Ka Saathi!\n\nHow are you feeling today? 🤗`,
      hinglish: `Hey ${userName}! 🙏\n\nMain hun tumhara Mann Ka Saathi!\n\nAaj kaisa feel ho raha hai? 🤗`
    };

    setTimeout(() => {
      setMessages([
        {
          id: 1,
          text: welcomeMessages[language] || welcomeMessages.english,
          sender: 'bot',
          timestamp: getCurrentTime()
        }
      ]);
    }, 1000);
  }, [language, userName]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: getCurrentTime()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botReplies = {
        hindi: [
          `समझ सकता हूं ${userName}... 🤗`,
          'थोड़ा और बताओ...',
          'मैं सुन रहा हूं 🙏',
          'आप अकेले नहीं हैं 💙'
        ],
        english: [
          `I understand ${userName}... 🤗`,
          'Tell me a little more...',
          'I am listening 🙏',
          'You are not alone 💙'
        ],
        hinglish: [
          `Samajh sakta hun ${userName}... 🤗`,
          'Thoda aur batao yaar...',
          'Main sun raha hun 🙏',
          'Tum akele nahi ho 💙'
        ]
      };

      const langReplies = botReplies[language] || botReplies.english;
      const randomReply = langReplies[Math.floor(Math.random() * langReplies.length)];

      const botMessage = {
        id: Date.now() + 1,
        text: randomReply,
        sender: 'bot',
        timestamp: getCurrentTime()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  // Logout Logic: Clear Data & Redirect to Home/Onboarding
  const handleLogout = () => {
    localStorage.removeItem('mannkasaathi_user');
    navigate('/'); 
  };

  const moods = [
    { emoji: '😊', text: language === 'hindi' ? 'अच्छा' : language === 'english' ? 'Good' : 'Acha' },
    { emoji: '😔', text: language === 'hindi' ? 'उदास' : language === 'english' ? 'Sad' : 'Sad' },
    { emoji: '😰', text: language === 'hindi' ? 'चिंतित' : language === 'english' ? 'Anxious' : 'Tense' },
    { emoji: '😤', text: language === 'hindi' ? 'गुस्सा' : language === 'english' ? 'Angry' : 'Gussa' },
    { emoji: '😴', text: language === 'hindi' ? 'थका हुआ' : language === 'english' ? 'Tired' : 'Thaka' },
  ];

  return (
    <div style={{ height: '100vh', backgroundColor: '#E2E8F0', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      
      {/* Sidebar Overlay & Menu */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsSidebarOpen(false)}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              style={{ position: 'absolute', top: 0, left: 0, width: '280px', height: '100%', backgroundColor: 'white', zIndex: 50, boxShadow: '4px 0 15px rgba(0,0,0,0.1)', padding: '20px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ margin: 0, color: '#5B8DEF', fontSize: '20px', fontFamily: 'Poppins, sans-serif' }}>Menu</h2>
                <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#A0AEC0' }}>✕</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                <button onClick={() => navigate('/mood')} style={{ textAlign: 'left', padding: '12px', border: 'none', backgroundColor: '#E2E8F0', borderRadius: '12px', color: '#2E3A45', fontWeight: '600', cursor: 'pointer' }}>😊 Mood Tracker</button>
                <button onClick={() => navigate('/assessment')} style={{ textAlign: 'left', padding: '12px', border: 'none', backgroundColor: '#E2E8F0', borderRadius: '12px', color: '#2E3A45', fontWeight: '600', cursor: 'pointer' }}>📝 Assessment</button>
                <button onClick={() => navigate('/books')} style={{ textAlign: 'left', padding: '12px', border: 'none', backgroundColor: '#E2E8F0', borderRadius: '12px', color: '#2E3A45', fontWeight: '600', cursor: 'pointer' }}>📚 Books</button>
                <button onClick={() => navigate('/community')} style={{ textAlign: 'left', padding: '12px', border: 'none', backgroundColor: '#E2E8F0', borderRadius: '12px', color: '#2E3A45', fontWeight: '600', cursor: 'pointer' }}>🌍 Community</button>
                <button onClick={() => navigate('/challenges')} style={{ textAlign: 'left', padding: '12px', border: 'none', backgroundColor: '#E2E8F0', borderRadius: '12px', color: '#2E3A45', fontWeight: '600', cursor: 'pointer' }}>🎯 Daily Challenges</button>
                <button onClick={() => navigate('/resources')} style={{ textAlign: 'left', padding: '12px', border: 'none', backgroundColor: '#E2E8F0', borderRadius: '12px', color: '#2E3A45', fontWeight: '600', cursor: 'pointer' }}>📖 Resources</button>
                
                <button onClick={() => navigate('/journal')} style={{ textAlign: 'left', padding: '12px', border: 'none', backgroundColor: '#E2E8F0', borderRadius: '12px', color: '#2E3A45', fontWeight: '600', cursor: 'pointer' }}>✍️ Private Journal</button>
                <button onClick={() => navigate('/analytics')} style={{ textAlign: 'left', padding: '12px', border: 'none', backgroundColor: '#E2E8F0', borderRadius: '12px', color: '#2E3A45', fontWeight: '600', cursor: 'pointer' }}>📊 Visual Analytics</button>
                
                <button onClick={() => navigate('/sos')} style={{ textAlign: 'left', padding: '12px', border: 'none', backgroundColor: '#FFF5F5', borderRadius: '12px', color: '#E53E3E', fontWeight: '700', cursor: 'pointer' }}>🆘 SOS Emergency</button>
              </div>

              <button onClick={handleLogout} style={{ width: '100%', padding: '12px', backgroundColor: '#E53E3E', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', marginTop: '20px' }}>
                🚪 Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={{ backgroundColor: '#5B8DEF', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', color: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <button onClick={() => setIsSidebarOpen(true)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '28px', cursor: 'pointer', padding: '0 8px 0 0' }}>
          ☰
        </button>
        
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
          🫶
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', fontFamily: 'Poppins, sans-serif' }}>
            Mann Ka Saathi
          </h2>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>
            🟢 Online • Listening to you
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg.text} sender={msg.sender} timestamp={msg.timestamp} />
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
            <div style={{ backgroundColor: '#4A76D2', padding: '14px 18px', borderRadius: '20px 20px 20px 6px', color: 'white' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1,2,3].map((dot) => (
                  <motion.div key={dot} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.1 }} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'white' }} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Mood Buttons */}
      <div style={{ display: 'flex', gap: '8px', padding: '12px 16px', overflowX: 'auto' }}>
        {moods.map((mood, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.9 }}
            onClick={() => setInput(mood.text)}
            style={{ border: 'none', backgroundColor: 'white', padding: '10px 14px', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', fontWeight: '600' }}
          >
            <span>{mood.emoji}</span>
            <span>{mood.text}</span>
          </motion.button>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ padding: '16px', backgroundColor: 'white', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={language === 'hindi' ? 'अपनी बात लिखें...' : language === 'english' ? 'Type your thoughts...' : 'Apni baat likho...'}
          style={{ flex: 1, padding: '14px 18px', borderRadius: '25px', border: '2px solid #E5E7EB', outline: 'none', fontSize: '15px', fontFamily: 'Nunito, sans-serif' }}
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}
          style={{ width: '50px', height: '50px', borderRadius: '50%', border: 'none', backgroundColor: '#5B8DEF', color: 'white', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(91,141,239,0.4)' }}
        >
          ➤
        </motion.button>
      </div>

    </div>
  );
}