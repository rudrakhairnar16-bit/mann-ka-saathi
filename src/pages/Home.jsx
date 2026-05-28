import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#F7F9FC',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative'
    }}>

      {/* Language Toggle */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        display: 'flex',
        gap: '8px'
      }}>
        {['hindi', 'english', 'hinglish'].map((lang) => (
          <button
            key={lang}
            onClick={() => toggleLanguage(lang)}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '600',
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

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '30px',
          padding: '40px 30px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 10px 40px rgba(91, 141, 239, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '20px'
        }}
      >

        {/* Logo */}
          <motion.div
           animate={{ scale: [1, 1.08, 1] }}
             transition={{ duration: 2.5, repeat: Infinity }}
             >
             <img
               src="/src/assets/logo.png"
                alt="Mann Ka Saathi Logo"
               style={{
               width: '150px',
               height: '150px',
                objectFit: 'contain'
               }}
               />
</motion.div>
        {/* App Name */}
        <div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#2E3A45',
            fontFamily: 'Poppins, sans-serif',
            marginBottom: '8px'
          }}>
            {t.appName}
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#5B8DEF',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: '600'
          }}>
            {t.tagline}
          </p>
        </div>

        {/* Divider */}
        <div style={{
          width: '60px',
          height: '4px',
          backgroundColor: '#7CBF9E',
          borderRadius: '10px'
        }}/>

        {/* How It Works */}
        <div style={{
          display: 'flex',
          gap: '12px',
          width: '100%'
        }}>
          {[
            { icon: '💬', text: language === 'hindi' ? 'बात करें' : 'Baat Karo' },
            { icon: '🔍', text: language === 'hindi' ? 'समझें' : 'Samjho' },
            { icon: '💡', text: language === 'hindi' ? 'बेहतर बनें' : 'Better Bano' },
          ].map((item, index) => (
            <div key={index} style={{
              flex: 1,
              backgroundColor: '#F7F9FC',
              borderRadius: '16px',
              padding: '12px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{ fontSize: '24px' }}>{item.icon}</span>
              <span style={{
                fontSize: '12px',
                color: '#2E3A45',
                fontWeight: '600'
              }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/onboarding')}
          style={{
            width: '100%',
            backgroundColor: '#5B8DEF',
            color: 'white',
            padding: '16px',
            borderRadius: '16px',
            fontSize: '18px',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif',
            boxShadow: '0 6px 20px rgba(91, 141, 239, 0.4)'
          }}
        >
          {t.startButton} ❤️
        </motion.button>

        {/* Safe Message */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#888',
          fontSize: '14px'
        }}>
          <span>🔒</span>
          <span>{t.safeMessage}</span>
        </div>

        {/* Emergency Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/resources')}
          style={{
            width: '100%',
            backgroundColor: '#FFF5F5',
            color: '#E53E3E',
            padding: '14px',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: '600',
            border: '2px solid #FED7D7',
            cursor: 'pointer'
          }}
        >
          {t.emergency}
        </motion.button>

      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '16px',
          color: '#aaa',
          fontSize: '12px'
        }}
      >
        Made with ❤️ for everyone
      </motion.p>

    </div>
  );
}