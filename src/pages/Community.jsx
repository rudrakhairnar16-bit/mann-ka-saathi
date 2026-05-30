import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Community() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const currentLang = language || 'english';

  // MULTILINGUAL UI TEXT
  const uiText = {
    hindi: {
      title: 'कम्युनिटी सपोर्ट 🌍',
      joinBtn: 'ज्वाइन करें',
      enterChatBtn: 'चैट में जाएं',
      notifTitle: 'नोटिफिकेशन्स',
      notifMood: '✨ आज का मूड सेव किया? अपना सफर रिकॉर्ड करें!',
      notifChallenge: '🎯 आपका आज का डेली चैलेंज वेट कर रहा है!'
    },
    english: {
      title: 'Community Support 🌍',
      joinBtn: 'Join',
      enterChatBtn: 'Enter Chat',
      notifTitle: 'Notifications',
      notifMood: '✨ Did you save your mood today? Record your journey!',
      notifChallenge: '🎯 Your daily challenge is waiting for you!'
    },
    hinglish: {
      title: 'Community Support 🌍',
      joinBtn: 'Join',
      enterChatBtn: 'Enter Chat',
      notifTitle: 'Notifications',
      notifMood: '✨ Aaj ka mood save kiya? Apna safar record karein!',
      notifChallenge: '🎯 Aapka aaj ka Daily Challenge wait kar raha hai!'
    }
  };

  const t = uiText[currentLang];

  // SINGLE GLOBAL COMMUNITY
  const globalCommunity = { 
    id: 1, 
    title: { hindi: 'मन का साथी यूनिवर्स', english: 'Mann Ka Saathi Universe', hinglish: 'Mann Ka Saathi Universe' }, 
    status: { hindi: 'ग्लोबल सेफ स्पेस', english: 'Global Safe Space', hinglish: 'Global Safe Space' }, 
    icon: '🌍' 
  };

  const [joinedGroups, setJoinedGroups] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Load Joined Status from Local Storage
  useEffect(() => {
    const savedJoined = JSON.parse(localStorage.getItem('mannkasaathi_joined_groups')) || [];
    setJoinedGroups(savedJoined);
  }, []);

  // Handle Joining / Entering Chat
  const handleAction = (id) => {
    if (joinedGroups.includes(id)) {
      navigate('/community-chat'); 
    } else {
      const updatedJoined = [...joinedGroups, id];
      setJoinedGroups(updatedJoined);
      localStorage.setItem('mannkasaathi_joined_groups', JSON.stringify(updatedJoined));
    }
  };

  const isJoined = joinedGroups.includes(globalCommunity.id);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', padding: '20px', fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button onClick={() => navigate('/chat')} style={{ border: 'none', background: 'white', padding: '10px 15px', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', fontSize: '18px', color: '#5B8DEF' }}>
              ←
            </button>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#2E3A45', margin: 0, fontFamily: 'Poppins, sans-serif' }}>
              {t.title}
            </h1>
          </div>

          {/* Notification Bell */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ background: 'white', border: 'none', fontSize: '20px', padding: '10px', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
            >
              🔔
              <span style={{ position: 'absolute', top: '5px', right: '5px', width: '8px', height: '8px', backgroundColor: '#E53E3E', borderRadius: '50%' }}></span>
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  style={{ position: 'absolute', top: '50px', right: '0', width: '280px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '16px', zIndex: 100 }}
                >
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#A0AEC0', borderBottom: '1px solid #EDF2F7', paddingBottom: '8px', fontFamily: 'Poppins, sans-serif' }}>
                    {t.notifTitle}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div onClick={() => navigate('/mood')} style={{ padding: '10px', backgroundColor: '#F7F9FC', borderRadius: '10px', fontSize: '13px', color: '#4A5568', cursor: 'pointer' }}>
                      {t.notifMood}
                    </div>
                    <div onClick={() => navigate('/challenges')} style={{ padding: '10px', backgroundColor: '#F7F9FC', borderRadius: '10px', fontSize: '13px', color: '#4A5568', cursor: 'pointer' }}>
                      {t.notifChallenge}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Single Global Community Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ backgroundColor: 'white', padding: '24px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', alignItems: 'center' }}
        >
          <div style={{ fontSize: '48px', backgroundColor: '#F0F4F8', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '24px' }}>
            {globalCommunity.icon}
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#2E3A45', fontWeight: '700', fontFamily: 'Poppins, sans-serif' }}>
              {globalCommunity.title[currentLang]}
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#718096', fontWeight: '600' }}>
              {globalCommunity.status[currentLang]}
            </p>
          </div>

          <button 
            onClick={() => handleAction(globalCommunity.id)}
            style={{ 
              width: '100%',
              backgroundColor: isJoined ? '#EDF2F7' : '#5B8DEF', 
              color: isJoined ? '#4A5568' : 'white', 
              border: 'none', 
              padding: '16px', 
              borderRadius: '16px', 
              fontSize: '16px',
              fontWeight: '700', 
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'Poppins, sans-serif',
              boxShadow: isJoined ? 'none' : '0 4px 15px rgba(91, 141, 239, 0.3)'
            }}
          >
            {isJoined ? t.enterChatBtn : t.joinBtn}
          </button>
        </motion.div>
        
      </div>
    </div>
  );
}