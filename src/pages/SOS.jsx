import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function SOS() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const currentLang = language || 'english';

  // MULTILINGUAL UI TEXT
  const uiText = {
    hindi: { 
      title: 'आपातकालीन सहायता 🆘', 
      desc: 'आप अकेले नहीं हैं। कृपया तुरंत नीचे दिए गए नंबरों पर मदद मांगें।',
      back: '← वापस जाएं', 
      callBtn: 'कॉल करें' 
    },
    english: { 
      title: 'Emergency Help 🆘', 
      desc: 'You are not alone. Please reach out to these helplines immediately.',
      back: '← Go Back', 
      callBtn: 'Call Now' 
    },
    hinglish: { 
      title: 'Emergency Help 🆘', 
      desc: 'Tum akele nahi ho. Please turant in numbers par help lo.',
      back: '← Wapas Jao', 
      callBtn: 'Call Karo' 
    }
  };

  const t = uiText[currentLang];

  // HELPLINES DATA
  const helplines = [
    {
      id: 1,
      name: "Kiran Mental Health",
      desc: "Govt. of India 24x7 Toll-Free",
      number: "18005990019",
      display: "1800-599-0019"
    },
    {
      id: 2,
      name: "Vandrevala Foundation",
      desc: "24x7 Free Crisis Counseling",
      number: "9999666555",
      display: "9999-666-555"
    },
    {
      id: 3,
      name: "Aasra",
      desc: "Suicide Prevention Helpline",
      number: "9820466726",
      display: "9820-466-726"
    },
    {
      id: 4,
      name: "National Emergency",
      desc: "Police, Fire & Ambulance",
      number: "112",
      display: "112"
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFF5F5',
      padding: '20px',
      fontFamily: 'Nunito, sans-serif'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/chat')}
          style={{
            background: 'none',
            border: 'none',
            color: '#E53E3E',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            marginBottom: '20px',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {t.back}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 style={{
            fontSize: '28px',
            color: '#C53030',
            margin: '0 0 8px 0',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '700'
          }}>
            {t.title}
          </h1>
          <p style={{ color: '#E53E3E', opacity: 0.9, marginBottom: '30px', fontSize: '15px', lineHeight: '1.5' }}>
            {t.desc}
          </p>

          {/* Helplines List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {helplines.map((helpline, index) => (
              <motion.div 
                key={helpline.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '20px',
                  boxShadow: '0 4px 15px rgba(229, 62, 62, 0.08)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#2E3A45', fontWeight: '700', fontFamily: 'Poppins, sans-serif' }}>
                  {helpline.name}
                </h2>
                <p style={{ margin: '0 0 16px 0', fontSize: '13.5px', color: '#718096' }}>
                  {helpline.desc}
                </p>
                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  href={`tel:${helpline.number}`}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    backgroundColor: '#E53E3E',
                    color: 'white',
                    padding: '14px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '16px',
                    fontFamily: 'Poppins, sans-serif',
                    boxShadow: '0 4px 12px rgba(229, 62, 62, 0.2)'
                  }}
                >
                  📞 {t.callBtn} : {helpline.display}
                </motion.a>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}