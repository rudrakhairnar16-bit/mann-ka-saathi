import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

export default function Home() {
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();
  const { userName } = useUser();

  const handleStart = () => {
    if (userName) {
      navigate('/chat');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative' }}>

      {/* Language Toggle */}
      <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '10px' }}>
        {['hindi', 'english', 'hinglish'].map((lang) => (
          <button
            key={lang}
            onClick={() => toggleLanguage(lang)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              border: '2px solid #5B8DEF',
              backgroundColor: language === lang ? '#5B8DEF' : 'white',
              color: language === lang ? 'white' : '#5B8DEF',
              transition: 'all 0.3s'
            }}
          >
            {lang === 'hindi' ? 'हिंदी' : lang === 'english' ? 'Eng' : 'Hi-En'}
          </button>
        ))}
      </div>

      {/* Main Card (Spacing Improved) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '30px',
          padding: '50px 30px',
          maxWidth: '450px',
          width: '100%',
          boxShadow: '0 10px 40px rgba(91, 141, 239, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '30px'
        }}
      >
        {/* Logo */}
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          <img src="/src/assets/logo.png" alt="Logo" style={{ width: '160px', height: '160px', objectFit: 'contain' }} />
        </motion.div>

        <div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#2E3A45', fontFamily: 'Poppins, sans-serif', margin: '0 0 10px 0' }}>
            {t.appName || 'Mann Ka Saathi'}
          </h1>
          <p style={{ fontSize: '18px', color: '#5B8DEF', fontFamily: 'Nunito, sans-serif', fontWeight: '700', margin: 0 }}>
            {t.tagline || 'Dil Se Baat...'}
          </p>
        </div>

        <div style={{ width: '80px', height: '5px', backgroundColor: '#7CBF9E', borderRadius: '10px' }}/>

        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          style={{ width: '100%', backgroundColor: '#5B8DEF', color: 'white', padding: '18px', borderRadius: '16px', fontSize: '20px', fontWeight: '700', border: 'none', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', boxShadow: '0 6px 20px rgba(91, 141, 239, 0.4)' }}
        >
          {t.startButton || 'Start'} 💙
        </motion.button>
      </motion.div>
    </div>
  );
}