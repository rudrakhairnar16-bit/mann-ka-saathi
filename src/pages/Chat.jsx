import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatBubble from '../components/ChatBubble';

export default function Chat() {
  const { language } = useLanguage();
  const { userName, setUserName } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Chat States
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const welcomeMessages = {
      hindi: `नमस्ते ${userName}! 🙏\n\nमैं हूं आपका मन का साथी!\n\nआज कैसा महसूस हो रहा है? 🤗`,
      english: `Hello ${userName}! 🙏\n\nI am your Mann Ka Saathi!\n\nHow are you feeling today? 🤗`,
      hinglish: `Hey ${userName}! 🙏\n\nMain hun tumhara Mann Ka Saathi!\n\nAaj kaisa feel ho raha hai? 🤗`
    };
    if (messages.length === 0) {
      setTimeout(() => {
        setMessages([{ id: 1, text: welcomeMessages[language] || welcomeMessages.english, sender: 'bot', timestamp: getCurrentTime() }]);
      }, 1000);
    }
  }, [language, userName]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { id: Date.now(), text: input, sender: 'user', timestamp: getCurrentTime() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botReplies = {
        hindi: [`समझ सकता हूं ${userName}... 🤗`, 'थोड़ा और बताओ...', 'मैं सुन रहा हूं 🙏'],
        english: [`I understand ${userName}... 🤗`, 'Tell me a little more...', 'I am listening 🙏'],
        hinglish: [`Samajh sakta hun ${userName}... 🤗`, 'Thoda aur batao yaar...', 'Main sun raha hun 🙏']
      };
      const langReplies = botReplies[language] || botReplies.english;
      const randomReply = langReplies[Math.floor(Math.random() * langReplies.length)];
      setMessages(prev => [...prev, { id: Date.now() + 1, text: randomReply, sender: 'bot', timestamp: getCurrentTime() }]);
      setIsTyping(false);
    }, 2000);
  };

  const handleLogout = () => {
    setUserName('');
    navigate('/');
  };

  const moods = [
    { emoji: '😊', text: language === 'hindi' ? 'अच्छा' : language === 'english' ? 'Good' : 'Acha' },
    { emoji: '😔', text: language === 'hindi' ? 'उदास' : language === 'english' ? 'Sad' : 'Sad' },
    { emoji: '😰', text: language === 'hindi' ? 'चिंतित' : language === 'english' ? 'Anxious' : 'Tense' },
  ];

  const sidebarLinks = [
    { name: 'Home', icon: '🏠', path: '/' },
    { name: 'Chat', icon: '💬', path: '/chat' },
    { name: 'Mood Tracker', icon: '📊', path: '/mood' },
    { name: 'Assessment', icon: '📝', path: '/assessment' },
    { name: 'Books', icon: '📚', path: '/books' },
    { name: 'Community', icon: '🌍', path: '/community' },
    { name: 'Daily Challenges', icon: '🎯', path: '/challenges' },
    { name: 'Resources', icon: '📖', path: '/resources' },
    { name: 'SOS', icon: '🆘', path: '/sos' }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F7F9FC', position: 'relative', overflow: 'hidden' }}>
      
      {/* HAMBURGER SIDEBAR OVERLAY */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 40 }}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '280px', backgroundColor: 'white', padding: '20px', display: 'flex', flexDirection: 'column', boxShadow: '2px 0 15px rgba(0,0,0,0.1)', zIndex: 50 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src="/src/assets/logo.png" alt="Logo" style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
                  <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#2E3A45', fontFamily: 'Poppins, sans-serif' }}>Saathi</h2>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#888' }}>✖</button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, overflowY: 'auto' }}>
                {sidebarLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <button
                      key={link.name}
                      onClick={() => {
                        setIsSidebarOpen(false);
                        navigate(link.path);
                      }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                        backgroundColor: isActive ? '#5B8DEF' : 'transparent', color: isActive ? 'white' : '#4B5563', fontWeight: isActive ? '700' : '600',
                        fontSize: '15px', fontFamily: 'Nunito, sans-serif', transition: 'all 0.2s', textAlign: 'left'
                      }}
                    >
                      <span style={{ fontSize: '20px' }}>{link.icon}</span>
                      {link.name}
                    </button>
                  )
                })}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid #E5E7EB' }}>
                <div style={{ padding: '12px', backgroundColor: '#F0F4F8', borderRadius: '12px', textAlign: 'center', marginBottom: '10px' }}>
                  <p style={{ margin: '0 0 2px 0', fontSize: '12px', color: '#888' }}>Logged in as</p>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#2E3A45' }}>{userName}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '2px solid #E53E3E', backgroundColor: 'transparent', color: '#E53E3E', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CHAT AREA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        {/* Header with Hamburger Button */}
        <div style={{ backgroundColor: '#5B8DEF', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', color: 'white' }}>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
          >
            ☰
          </button>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', fontFamily: 'Poppins, sans-serif' }}>Chat Support</h2>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>🟢 Online • Listening to you</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg.text} sender={msg.sender} timestamp={msg.timestamp} />
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
              <div style={{ backgroundColor: '#5B8DEF', padding: '14px 18px', borderRadius: '20px 20px 20px 6px', color: 'white' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3].map((dot) => (
                    <motion.div key={dot} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.1 }} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'white' }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Mood Buttons */}
        <div style={{ display: 'flex', gap: '8px', padding: '12px 20px', overflowX: 'auto', backgroundColor: 'transparent' }}>
          {moods.map((mood, index) => (
            <button key={index} onClick={() => setInput(mood.text)} style={{ border: 'none', backgroundColor: 'white', padding: '10px 14px', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', fontWeight: '600' }}>
              <span>{mood.emoji}</span><span>{mood.text}</span>
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div style={{ padding: '20px', backgroundColor: 'white', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Type your thoughts..." style={{ flex: 1, padding: '16px 20px', borderRadius: '25px', border: '2px solid #E5E7EB', outline: 'none', fontSize: '15px', fontFamily: 'Nunito, sans-serif' }} />
          <button onClick={handleSend} style={{ width: '55px', height: '55px', borderRadius: '50%', border: 'none', backgroundColor: '#5B8DEF', color: 'white', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(91,141,239,0.4)' }}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}