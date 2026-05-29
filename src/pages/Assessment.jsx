import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ChatBubble from '../components/ChatBubble';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

export default function Assessment() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { userName } = useUser();
  
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  // Dynamic Question Data - Expanded to cover more emotional states
  const assessmentData = [
    {
      id: 1,
      // General feeling of sadness/hopelessness
      question: {
        hindi: `${userName}, एक छोटा सा सवाल... पिछले 2 हफ़्ते में कितनी बार ऐसा लगा कि कुछ अच्छा नहीं लग रहा या उदासी महसूस हुई?`,
        english: `Hey ${userName}, a quick question... Over the last 2 weeks, how often have you felt down, depressed, or hopeless?`,
        hinglish: `Ek simple sawaal poochna tha ${userName}... Pichhle 2 hafte mein kitni baar aisa feel hua ki kuch acha nahi lag raha?`
      }
    },
    {
      id: 2,
      // Loss of interest (Anhedonia)
      question: {
        hindi: 'क्या आपको अपने मनपसंद कामों में या रोज़मर्रा की चीज़ों में दिलचस्पी कम लग रही है?',
        english: 'Do you feel you have little interest or pleasure in doing things you usually enjoy?',
        hinglish: 'Kya aapko apne manpasand kaamo mein interest kam lag raha hai?'
      }
    },
    {
      id: 3,
      // Sleep disturbances
      question: {
        hindi: 'क्या आपको नींद आने में परेशानी हो रही है, या क्या आप बहुत ज़्यादा सो रहे हैं?',
        english: 'Are you having trouble falling asleep, staying asleep, or perhaps sleeping too much?',
        hinglish: 'Kya aapko neend aane mein ya sote rehne mein dikkat ho rahi hai?'
      }
    },
    {
      id: 4,
      // Anxiety/Overthinking
      question: {
        hindi: 'क्या आपको लगता है कि आप बहुत ज्यादा सोच (Overthinking) रहे हैं और आपका दिमाग शांत नहीं हो रहा?',
        english: 'Do you feel like you are overthinking and your mind just won’t calm down?',
        hinglish: 'Kya aapko lagta hai ki aap overthinking kar rahe hain aur dimag shant nahi ho raha?'
      }
    },
    {
      id: 5,
      // Energy levels/Fatigue
      question: {
        hindi: 'क्या आप बिना ज्यादा काम किए भी थका हुआ महसूस करते हैं?',
        english: 'Do you feel tired or have little energy, even without doing much physical work?',
        hinglish: 'Kya aap bina zyada kaam kiye bhi thaka hua feel karte hain?'
      }
    },
    {
      id: 6,
      // Concentration issues
      question: {
        hindi: 'क्या आपको पढ़ाई, काम या टीवी देखने जैसी चीज़ों में ध्यान लगाने (Concentration) में दिक्कत हो रही है?',
        english: 'Are you having trouble concentrating on things like reading, working, or watching TV?',
        hinglish: 'Kya aapko kisi kaam mein focus karne ya concentrate karne mein dikkat aa rahi hai?'
      }
    },
    {
      id: 7,
      // Feelings of worthlessness or guilt
      question: {
        hindi: 'क्या आपको कभी ऐसा लगता है कि आप किसी लायक नहीं हैं या आपने खुद को या अपने परिवार को निराश किया है?',
        english: 'Do you ever feel bad about yourself — or that you are a failure or have let yourself or your family down?',
        hinglish: 'Kya kabhi aisa lagta hai ki aap kisi kaam ke nahi hain ya aapne apni family ko disappoint kiya hai?'
      }
    }
  ];

  // Dynamic Options Data
  const options = [
    { points: 0, emoji: "🟢", text: { hindi: "बिल्कुल नहीं", english: "Not at all", hinglish: "Bilkul Nahi" } },
    { points: 1, emoji: "🟡", text: { hindi: "कभी-कभी", english: "Several days", hinglish: "Kabhi Kabhi" } },
    { points: 2, emoji: "🟠", text: { hindi: "अक्सर", english: "More than half the days", hinglish: "Aksar" } },
    { points: 3, emoji: "🔴", text: { hindi: "हर वक़्त", english: "Nearly every day", hinglish: "Har Waqt" } }
  ];

  // UI Header Text translation
  const uiText = {
    hindi: { title: 'मन का चेकअप', progress: 'सवाल' },
    english: { title: 'Mind Checkup', progress: 'Question' },
    hinglish: { title: 'Mann Ka Checkup', progress: 'Saathi Question' }
  };
  
  const currentLang = language || 'english';
  const t = uiText[currentLang];

  const handleAnswer = (points) => {
    const newScore = score + points;
    
    if (currentQ < assessmentData.length - 1) {
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
            {t.title}
          </h2>
        </div>
        
        {/* Progress Bar Container */}
        <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.3)', height: '6px', borderRadius: '10px' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentQ + 1) / assessmentData.length) * 100}%` }}
            transition={{ duration: 0.4 }}
            style={{ height: '100%', backgroundColor: 'white', borderRadius: '10px' }}
          />
        </div>
        <div style={{ textAlign: 'right', fontSize: '12px', marginTop: '4px', opacity: 0.9 }}>
          {t.progress} {currentQ + 1}/{assessmentData.length}
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
              message={assessmentData[currentQ].question[currentLang]} 
              sender="bot" 
              timestamp={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
              {opt.text[currentLang]}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}