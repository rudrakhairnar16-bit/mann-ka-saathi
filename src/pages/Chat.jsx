import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ChatBubble from '../components/ChatBubble';
import { GoogleGenerativeAI } from '@google/generative-ai';

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

  // --- GEMINI 2.5 FLASH API LOGIC ---
  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    const userMessage = {
      id: Date.now(),
      text: userText,
      sender: 'user',
      timestamp: getCurrentTime()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("Gemini API Key missing! .env.local file check karein.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      
      // Using the Gemini 2.5 Flash model as requested
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: `You are "Mann Ka Saathi", a highly empathetic, warm, and non-judgmental mental health companion. The user's name is ${userName}. The user prefers to chat in ${language} (Hindi, English, or Hinglish). Your goal is to listen, validate their feelings, and offer gentle support. Keep responses concise (1 to 3 short sentences), conversational, and use appropriate emojis. Do not give medical diagnoses.`
      });

      // THE FIX: Ensure history ALWAYS starts with a 'user' message to avoid API crash & maintain context
      const firstUserIndex = messages.findIndex(m => m.sender === 'user');
      const validHistory = firstUserIndex !== -1 ? messages.slice(firstUserIndex) : [];

      const formattedHistory = validHistory.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      // Start Chat Session with properly formatted History
      const chatSession = model.startChat({
        history: formattedHistory
      });

      // Send User Message to Gemini
      const result = await chatSession.sendMessage(userText);
      const responseText = result.response.text();

      const botMessage = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'bot',
        timestamp: getCurrentTime()
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: language === 'hindi' ? "माफ़ी चाहूंगा, अभी नेटवर्क में कुछ दिक्कत लग रही है। क्या आप अपनी बात फिर से कह सकते हैं? 🙏" : "I'm sorry, there seems to be a network issue. Could you please repeat that? 🙏",
        sender: 'bot',
        timestamp: getCurrentTime()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mannkasaathi_user');
    window.location.href = '/'; // Hard refresh for proper logout
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
            <div style={{ backgroundColor: '#2E3A45', padding: '14px 18px', borderRadius: '20px 20px 20px 6px', color: 'white' }}>
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