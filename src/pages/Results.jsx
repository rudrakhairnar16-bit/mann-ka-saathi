import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

export default function Results() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { userName } = useUser();

  const text = {
    hindi: {
      title: 'आपका परिणाम 📊',
      greeting: `नमस्ते ${userName || 'दोस्त'}, यहाँ आपका विश्लेषण है:`,
      status: 'हल्का तनाव',
      desc: 'चिंता की कोई बात नहीं है। थोड़ा आराम करें और खुद को समय दें।',
      tip1: 'गहरी सांस लेने का व्यायाम करें।',
      tip2: 'अपनी पसंद का संगीत सुनें।',
      home: 'होम पर वापस जाएं'
    },
    english: {
      title: 'Your Results 📊',
      greeting: `Hello ${userName || 'Friend'}, here is your analysis:`,
      status: 'Mild Stress',
      desc: 'Nothing to worry about. Take some rest and give yourself time.',
      tip1: 'Practice deep breathing exercises.',
      tip2: 'Listen to your favorite music.',
      home: 'Back to Home'
    },
    hinglish: {
      title: 'Tumhara Result 📊',
      greeting: `Hey ${userName || 'Yaar'}, yahan tumhara analysis hai:`,
      status: 'Halka Stress',
      desc: 'Tension ki koi baat nahi. Thoda aaram karo aur khud ko time do.',
      tip1: 'Deep breathing exercise karo.',
      tip2: 'Apna favorite music suno.',
      home: 'Home Par Wapas Jao'
    }
  };

  const tx = text[language] || text.hinglish;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F7F9FC',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Nunito, sans-serif'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '24px',
          boxShadow: '0 10px 30px rgba(91, 141, 239, 0.1)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
          marginTop: '40px'
        }}
      >
        <div style={{ fontSize: '60px', marginBottom: '10px' }}>🧘‍♂️</div>
        <h1 style={{ fontSize: '24px', color: '#2E3A45', fontFamily: 'Poppins, sans-serif', margin: '0 0 10px 0' }}>
          {tx.title}
        </h1>
        <p style={{ color: '#666', fontSize: '15px', marginBottom: '20px' }}>
          {tx.greeting}
        </p>

        {/* Score Card */}
        <div style={{
          backgroundColor: '#FFF5F5',
          border: '2px solid #FEB2B2',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#C53030', margin: '0 0 8px 0', fontSize: '22px' }}>{tx.status}</h2>
          <p style={{ color: '#E53E3E', fontSize: '14px', margin: 0 }}>{tx.desc}</p>
        </div>

        {/* Actionable Tips */}
        <div style={{ textAlign: 'left', marginBottom: '30px' }}>
          <p style={{ fontWeight: 'bold', color: '#2E3A45', marginBottom: '10px' }}>💡 Tips:</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
            <span>✅</span> {tx.tip1}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#666' }}>
            <span>✅</span> {tx.tip2}
          </div>
        </div>

        {/* Home Button */}
        <button
          onClick={() => navigate('/')}
          style={{
            width: '100%',
            backgroundColor: '#5B8DEF',
            color: 'white',
            padding: '14px',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          {tx.home}
        </button>
      </motion.div>
    </div>
  );
}