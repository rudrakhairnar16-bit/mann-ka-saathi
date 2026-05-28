import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ChatBubble from '../components/ChatBubble';
import { keywords } from '../data/keywords';
import { botResponses } from '../data/responses';

export default function Chat() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { userName } = useUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto Scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Current Time
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Helper function: Name Replace
  const formatMessage = (msg) => {
    const nameToUse = userName || (language === 'hindi' ? 'दोस्त' : 'Dost');
    return msg
      .replace(/\[Name\]/gi, nameToUse)
      .replace(/\[नाम\]/gi, nameToUse);
  };

  // Welcome Message
  useEffect(() => {
    if (messages.length === 0) {
      const greetings = botResponses.greeting[language];
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      
      setMessages([{
        id: Date.now(),
        text: formatMessage(randomGreeting),
        sender: 'bot',
        timestamp: getCurrentTime()
      }]);
    }
  }, [language, userName]);

  // Main Logic: Bot Brain
  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    let detectedCategory = 'default';
    
    // 1. Sabse pehle Crisis check karo
    const isCrisis = keywords.crisis.some(word => lowerInput.includes(word));
    
    if (isCrisis) {
      detectedCategory = 'crisis';
    } else {
      // 2. Baki categories check karo
      const categories = ['depression', 'anxiety', 'sleep', 'anger', 'study', 'relationship'];
      for (let cat of categories) {
        if (keywords[cat].some(word => lowerInput.includes(word))) {
          detectedCategory = cat;
          break; 
        }
      }
    }
    
    // 3. Category ke hisaab se random response uthao
    const possibleResponses = botResponses[detectedCategory][language];
    const rawResponse = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
    return formatMessage(rawResponse);
  };

  // Send Message
  const handleSend = () => {
    if (!input.trim()) return;

    // User Message
    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: getCurrentTime()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsTyping(true);

    // Bot Reply
    setTimeout(() => {
      const replyText = getBotResponse(userInput);
      const botMessage = {
        id: Date.now() + 1,
        text: replyText,
        sender: 'bot',
        timestamp: getCurrentTime()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Quick Mood Buttons
  const moods = [
    { emoji: '😊', text: language === 'hindi' ? 'अच्छा' : language === 'english' ? 'Good' : 'Acha' },
    { emoji: '😔', text: language === 'hindi' ? 'उदास' : language === 'english' ? 'Sad' : 'Sad' },
    { emoji: '😟', text: language === 'hindi' ? 'चिंतित' : language === 'english' ? 'Anxious' : 'Tense' },
    { emoji: '😠', text: language === 'hindi' ? 'गुस्सा' : language === 'english' ? 'Angry' : 'Gussa' },
    { emoji: '😫', text: language === 'hindi' ? 'थका हुआ' : language === 'english' ? 'Tired' : 'Thaka' },
  ];

  return (
    <div style={{ height: '100vh', backgroundColor: '#F7F9FC', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#5B8DEF', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', color: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        
        {/* Change 1: Robot ki jagah Logo */}
        <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img src="/src/assets/logo.png" alt="Mann Ka Saathi Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', fontFamily: 'Poppins, sans-serif' }}>
            Mann Ka Saathi
          </h2>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>
            Online • Listening to you
          </p>
        </div>

        {/* Change 2: SOS ki jagah Assessment Button */}
        <button 
          onClick={() => navigate('/assessment')} 
          style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '12px', padding: '8px 12px', cursor: 'pointer', fontSize: '14px', color: 'white', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
        >
          Assessment
        </button>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.text}
            sender={msg.sender}
            timestamp={msg.timestamp}
          />
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}
          >
            <div style={{ backgroundColor: '#5B8DEF', padding: '14px 18px', borderRadius: '20px 20px 20px 6px', color: 'white' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3].map((dot) => (
                  <motion.div
                    key={dot}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.1 }}
                    style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'white' }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Mood Buttons */}
      <div style={{ display: 'flex', gap: '8px', padding: '12px 16px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {moods.map((mood, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.9 }}
            onClick={() => setInput(mood.text)}
            style={{
              border: 'none',
              backgroundColor: 'white',
              padding: '10px 14px',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              fontWeight: '600'
            }}
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
          style={{
            flex: 1,
            padding: '14px 18px',
            borderRadius: '25px',
            border: '2px solid #E5E7EB',
            outline: 'none',
            fontSize: '15px',
            fontFamily: 'Nunito, sans-serif'
          }}
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}
          disabled={!input.trim()}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: input.trim() ? '#5B8DEF' : '#E5E7EB',
            color: 'white',
            cursor: input.trim() ? 'pointer' : 'not-allowed',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(91,141,239,0.4)'
          }}
        >
          ➤
        </motion.button>
      </div>
    </div>
  );
}