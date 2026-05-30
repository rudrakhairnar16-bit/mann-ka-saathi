import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

export default function CommunityChat() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { userName } = useUser();

  const currentLang = language || 'english';

  // MULTILINGUAL UI TEXT
  const uiText = {
    hindi: {
      title: 'मन का साथी यूनिवर्स 🌍',
      subtitle: 'सुरक्षित स्थान • हज़ारों लोग जुड़े हैं',
      placeholder: 'यूनिवर्स में अपना संदेश भेजें...',
      adminName: '🛡️ कम्युनिटी एडमिन',
      welcomeMsg: 'Mann Ka Saathi Universe में आपका स्वागत है! यह एक सुरक्षित और जजमेंट-फ्री जगह है। यहाँ आप अपनी बात खुलकर कह सकते हैं। ✨'
    },
    english: {
      title: 'Mann Ka Saathi Universe 🌍',
      subtitle: 'Safe Space • Thousands Connected',
      placeholder: 'Send a message to the universe...',
      adminName: '🛡️ Community Admin',
      welcomeMsg: 'Welcome to the Mann Ka Saathi Universe! This is a safe, judgment-free zone. Feel free to share your thoughts. ✨'
    },
    hinglish: {
      title: 'Mann Ka Saathi Universe 🌍',
      subtitle: 'Safe Space • Hazaaron log jude hain',
      placeholder: 'Universe mein message bhejein...',
      adminName: '🛡️ Community Admin',
      welcomeMsg: 'Mann Ka Saathi Universe mein aapka swagat hai! Yeh ek safe, judgment-free jagah hai. Yahan aap khulkar baat kar sakte hain. ✨'
    }
  };

  const t = uiText[currentLang];

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: t.adminName,
      text: t.welcomeMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: false,
      isAdmin: true
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Auto Scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // SIMULATED LIVE USERS LOGIC
  useEffect(() => {
    const dummyNames = ['Aman', 'Priya', 'Kabir', 'Sneha', 'Rohan', 'Ananya', 'Vikram', 'Neha'];
    const dummyMessages = [
      "Aaj ka din thoda exhausting tha, par I am trying to stay positive. 🌻",
      "Hello everyone! Hope you all are taking care of your mental health.",
      "Just finished my deep breathing exercise. Feeling much better! ✨",
      "Agar koi akela feel kar raha hai, toh yaad rakhna hum sab yahan hain. 💙",
      "Sending good vibes to this beautiful universe! 🌍",
      "Sometimes it's okay not to be okay. Take your time guys.",
      "Daily challenge complete kar liya maine! ✅",
      "Is community mein aakar sach mein shanti milti hai."
    ];

    // Random interval function to simulate live chat
    const interval = setInterval(() => {
      const randomName = dummyNames[Math.floor(Math.random() * dummyNames.length)];
      const randomMsg = dummyMessages[Math.floor(Math.random() * dummyMessages.length)];
      
      const newSimulatedMsg = {
        id: Date.now(),
        sender: randomName,
        text: randomMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
        isAdmin: false
      };

      setMessages(prev => [...prev, newSimulatedMsg]);
    }, Math.floor(Math.random() * 8000) + 5000); // Random delay between 5 to 13 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle Send Message
  const handleSend = () => {
    if (!input.trim()) return;

    const myMessage = {
      id: Date.now(),
      sender: userName || 'Me',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      isAdmin: false
    };

    setMessages(prev => [...prev, myMessage]);
    setInput('');
  };

  return (
    <div style={{ height: '100vh', backgroundColor: '#F0F4F8', display: 'flex', flexDirection: 'column', fontFamily: 'Nunito, sans-serif' }}>
      
      {/* Header */}
      <div style={{ backgroundColor: '#5B8DEF', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '15px', color: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', zIndex: 10 }}>
        <button onClick={() => navigate('/community')} style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer', padding: 0 }}>
          ←
        </button>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', fontFamily: 'Poppins, sans-serif' }}>
            {t.title}
          </h2>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>
            🟢 {t.subtitle}
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.isMe ? 'flex-end' : 'flex-start',
                width: '100%'
              }}
            >
              <div style={{
                maxWidth: '75%',
                backgroundColor: msg.isMe ? '#7CBF9E' : msg.isAdmin ? '#FFE4E6' : 'white',
                color: msg.isMe ? 'white' : '#2E3A45',
                padding: '12px 16px',
                borderRadius: msg.isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                {/* Sender Name */}
                <div style={{ 
                  fontSize: '11px', 
                  fontWeight: '700', 
                  color: msg.isMe ? '#E6FFFA' : msg.isAdmin ? '#E53E3E' : '#5B8DEF', 
                  marginBottom: '4px' 
                }}>
                  {msg.isMe ? 'You' : msg.sender}
                </div>
                
                {/* Message Text */}
                <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.5' }}>
                  {msg.text}
                </p>
                
                {/* Timestamp */}
                <div style={{ fontSize: '10px', marginTop: '6px', textAlign: 'right', opacity: msg.isMe ? 0.8 : 0.5 }}>
                  {msg.time}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '16px', backgroundColor: 'white', boxShadow: '0 -2px 15px rgba(0,0,0,0.03)', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t.placeholder}
          style={{
            flex: 1,
            padding: '14px 20px',
            borderRadius: '24px',
            border: '2px solid #EDF2F7',
            outline: 'none',
            fontSize: '15px',
            fontFamily: 'Nunito, sans-serif',
            backgroundColor: '#F7F9FC'
          }}
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#5B8DEF',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(91,141,239,0.3)'
          }}
        >
          ➤
        </motion.button>
      </div>
    </div>
  );
}