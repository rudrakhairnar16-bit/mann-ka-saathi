import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

export default function DailyChallenge() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { userName } = useUser();
  
  const [isCompleted, setIsCompleted] = useState(false);
  const [challenge, setChallenge] = useState(null);

  const currentLang = language || 'english';

  // MULTILINGUAL UI TEXT
  const uiText = {
    hindi: {
      title: `${userName} का चैलेंज`,
      completeBtn: 'मैंने यह कर लिया! ✅',
      successTitle: 'कमाल कर दिया! 🎉',
      successDesc: 'आज का टास्क पूरा हुआ।'
    },
    english: {
      title: `${userName}'s Challenge`,
      completeBtn: 'I Did This! ✅',
      successTitle: 'Awesome Job! 🎉',
      successDesc: 'Today\'s task is complete.'
    },
    hinglish: {
      title: `${userName} Ka Challenge`,
      completeBtn: 'Maine Yeh Kar Liya! ✅',
      successTitle: 'Kamaal Kar Diya! 🎉',
      successDesc: 'Aaj ka task poora hua.'
    }
  };

  const t = uiText[currentLang];

  // MULTILINGUAL CHALLENGES LIST
  const challengesList = [
    {
      icon: "🌬️",
      title: { hindi: "माइंडफुल ब्रीदिंग", english: "Mindful Breathing", hinglish: "Mindful Breathing" },
      desc: {
        hindi: "आज 5 मिनट आराम से बैठकर सिर्फ अपनी साँसों पर ध्यान दें।",
        english: "Sit quietly for 5 minutes today and just focus on your breathing.",
        hinglish: "Aaj 5 minute aaram se baith kar sirf apni saanson par dhyan dein."
      }
    },
    {
      icon: "📱",
      title: { hindi: "डिजिटल डिटॉक्स", english: "Digital Detox", hinglish: "Digital Detox" },
      desc: {
        hindi: "सोने से 1 घंटा पहले अपना फोन साइड रख दें और स्क्रीन न देखें।",
        english: "Put your phone away 1 hour before sleeping and avoid screens.",
        hinglish: "Sone se 1 ghanta pehle apna phone side rakh dein aur screen nahi dekhein."
      }
    },
    {
      icon: "✍️",
      title: { hindi: "आभार डायरी", english: "Gratitude Journal", hinglish: "Gratitude Journal" },
      desc: {
        hindi: "आज ऐसी 3 चीज़ों के बारे में लिखें जिनके लिए आप शुक्रगुज़ार हैं।",
        english: "Write down 3 things you are grateful for today.",
        hinglish: "Aaj aisi 3 cheezon ke baare mein likhein jiske liye aap shukraguzar hain."
      }
    },
    {
      icon: "🤝",
      title: { hindi: "दोस्त से बात करें", english: "Connect With a Friend", hinglish: "Connect With a Friend" },
      desc: {
        hindi: "अपने किसी पुराने दोस्त को मैसेज या कॉल करें और हाल-चाल पूछें।",
        english: "Message or call an old friend and ask how they are doing.",
        hinglish: "Apne kisi purane dost ko message ya call karein aur haal-chaal puchein."
      }
    },
    {
      icon: "🌿",
      title: { hindi: "नेचर वॉक", english: "Nature Walk", hinglish: "Nature Walk" },
      desc: {
        hindi: "बाहर निकलकर 10 मिनट वॉक करें और आस-पास की चीज़ों को ऑब्ज़र्व करें।",
        english: "Take a 10-minute walk outside and observe your surroundings.",
        hinglish: "Bahar nikalkar 10 minute walk karein aur aas-paas ki cheezon ko observe karein."
      }
    },
    {
      icon: "💧",
      title: { hindi: "खुद को हाइड्रेट करें", english: "Hydration Focus", hinglish: "Hydrate Yourself" },
      desc: {
        hindi: "आज जानबूझकर हर एक-दो घंटे में एक गिलास पानी पिएं।",
        english: "Make a conscious effort to drink a glass of water every 1-2 hours today.",
        hinglish: "Aaj consciously har ek-do ghante mein ek glass pani piyein."
      }
    }
  ];

  useEffect(() => {
    // 1. Calculate current day of the year (1 to 365)
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // 2. Calculate index so challenge changes daily
    const dailyIndex = dayOfYear % challengesList.length;
    setChallenge(challengesList[dailyIndex]);
    
    // 3. Check if today's task is already completed
    const completedToday = localStorage.getItem('mannkasaathi_daily_done');
    if (completedToday === new Date().toDateString()) {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    setIsCompleted(true);
    localStorage.setItem('mannkasaathi_daily_done', new Date().toDateString());
  };

  if (!challenge) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Header */}
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', alignItems: 'center', marginBottom: '30px', marginTop: '10px' }}>
        <button onClick={() => navigate('/chat')} style={{ background: 'none', border: 'none', fontSize: '24px', color: '#5B8DEF', cursor: 'pointer' }}>
          ←
        </button>
        <h2 style={{ margin: '0 auto', fontSize: '18px', color: '#2E3A45', fontFamily: 'Poppins, sans-serif', fontWeight: '700' }}>
          {t.title}
        </h2>
        <div style={{ width: '24px' }}></div>
      </div>

      {/* Challenge Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: '400px', backgroundColor: 'white', borderRadius: '24px', padding: '30px 20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', marginBottom: '30px' }}
      >
        <div style={{ fontSize: '56px', marginBottom: '16px' }}>
          {challenge.icon}
        </div>
        
        <h1 style={{ fontSize: '22px', color: '#2E3A45', fontFamily: 'Poppins, sans-serif', marginBottom: '12px', fontWeight: '700' }}>
          {challenge.title[currentLang]}
        </h1>
        
        <p style={{ margin: '0 0 28px 0', fontSize: '15px', color: '#4A5568', fontFamily: 'Nunito, sans-serif', lineHeight: '1.6' }}>
          {challenge.desc[currentLang]}
        </p>

        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.button
              key="incomplete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleComplete}
              style={{ 
                width: '100%', 
                padding: '16px', 
                backgroundColor: '#5B8DEF', 
                color: 'white', 
                borderRadius: '16px', 
                fontSize: '16px', 
                fontWeight: '700', 
                border: 'none', 
                cursor: 'pointer', 
                fontFamily: 'Poppins, sans-serif', 
                boxShadow: '0 4px 12px rgba(91,141,239,0.3)' 
              }}
            >
              {t.completeBtn}
            </motion.button>
          ) : (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ 
                width: '100%', 
                padding: '16px', 
                backgroundColor: '#F0FFF4', 
                border: '2px solid #7CBF9E', 
                color: '#2F855A', 
                borderRadius: '16px', 
                fontSize: '16px', 
                fontWeight: '700', 
                fontFamily: 'Poppins, sans-serif' 
              }}
            >
              {t.successTitle}
              <div style={{ fontSize: '13px', marginTop: '4px', fontWeight: 'normal', color: '#4A5568' }}>
                {t.successDesc}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}