import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function DailyChallenge() {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const [challenge, setChallenge] = useState(null);

  const challengesList = [
    { title: "Mindful Breathing", desc: "Aaj 5 minute aaram se baith kar sirf apni saanson par dhyan dein.", icon: "🌬️" },
    { title: "Digital Detox", desc: "Sone se 1 ghanta pehle apna phone side rakh dein aur screen nahi dekhein.", icon: "📱" },
    { title: "Gratitude Journal", desc: "Aaj aisi 3 cheezon ke baare mein likhein jiske liye aap shukraguzar hain.", icon: "✍️" },
    { title: "Connect With a Friend", desc: "Apne kisi purane dost ko message ya call karein aur haal-chaal puchein.", icon: "🤝" },
    { title: "Nature Walk", desc: "Bahar nikalkar 10 minute walk karein aur aas-paas ki cheezon ko observe karein.", icon: "🌿" }
  ];

  useEffect(() => {
    // 1. Aaj ka din nikalo (1 se 365)
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // 2. Index calculate karo taaki har din change ho
    const dailyIndex = dayOfYear % challengesList.length;
    setChallenge(challengesList[dailyIndex]);
    
    // 3. Check karo ki kya aaj ka task complete hai
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
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', fontSize: '24px', color: '#5B8DEF', cursor: 'pointer' }}>
          ←
        </button>
        <h2 style={{ margin: '0 auto', fontSize: '18px', color: '#2E3A45', fontFamily: 'Poppins, sans-serif' }}>
          Aaj Ka Challenge
        </h2>
        <div style={{ width: '24px' }}></div>
      </div>

      {/* Challenge Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: '400px', backgroundColor: 'white', borderRadius: '24px', padding: '30px 20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', marginBottom: '30px' }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>
          {challenge.icon}
        </div>
        
        <h1 style={{ fontSize: '22px', color: '#2E3A45', fontFamily: 'Poppins, sans-serif', marginBottom: '12px' }}>
          {challenge.title}
        </h1>
        
        <p style={{ margin: '0 0 24px 0', fontSize: '15px', color: '#4A5568', fontFamily: 'Nunito, sans-serif', lineHeight: '1.6' }}>
          {challenge.desc}
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
              style={{ width: '100%', padding: '16px', backgroundColor: '#5B8DEF', color: 'white', borderRadius: '16px', fontSize: '16px', fontWeight: '600', border: 'none', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', boxShadow: '0 4px 12px rgba(91,141,239,0.3)' }}
            >
              Maine Yeh Kar Liya! ✅
            </motion.button>
          ) : (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ width: '100%', padding: '16px', backgroundColor: '#E6FFFA', border: '2px solid #7CBF9E', color: '#2F855A', borderRadius: '16px', fontSize: '16px', fontWeight: '600', fontFamily: 'Poppins, sans-serif' }}
            >
              Kamaal Kar Diya! 🎉
              <div style={{ fontSize: '12px', marginTop: '4px', fontWeight: 'normal' }}>Aaj ka task poora hua.</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}