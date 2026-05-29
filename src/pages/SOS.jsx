import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Resources() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const text = {
    hindi: { 
      title: 'आपातकालीन सहायता 🆘', 
      desc: 'आप अकेले नहीं हैं। कृपया तुरंत मदद लें।',
      back: '← वापस जाएं', 
      call: 'कॉल करें' 
    },
    english: { 
      title: 'Emergency Help 🆘', 
      desc: 'You are not alone. Please reach out for help immediately.',
      back: '← Go Back', 
      call: 'Call Now' 
    },
    hinglish: { 
      title: 'Emergency Help 🆘', 
      desc: 'Tum akele nahi ho. Please turant help lo.',
      back: '← Wapas Jao', 
      call: 'Call Karo' 
    }
  };

  const tx = text[language] || text.hinglish;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFF5F5',
      padding: '20px',
      fontFamily: 'Nunito, sans-serif'
    }}>
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        style={{
          background: 'none',
          border: 'none',
          color: '#E53E3E',
          fontSize: '16px',
          fontWeight: '700',
          cursor: 'pointer',
          marginBottom: '20px',
          padding: '0'
        }}
      >
        {tx.back}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={{
          fontSize: '28px',
          color: '#C53030',
          marginBottom: '8px',
          fontFamily: 'Poppins, sans-serif'
        }}>
          {tx.title}
        </h1>
        <p style={{ color: '#E53E3E', opacity: 0.8, marginBottom: '30px' }}>
          {tx.desc}
        </p>

        {/* Helpline 1 */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '20px',
          boxShadow: '0 4px 15px rgba(229, 62, 62, 0.1)',
          marginBottom: '16px'
        }}>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#2E3A45' }}>
            Kiran Mental Health
          </h2>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#666' }}>
            Govt. of India 24x7 Toll-Free
          </p>
          <a 
            href="tel:18005990019"
            style={{
              display: 'block',
              textAlign: 'center',
              backgroundColor: '#E53E3E',
              color: 'white',
              padding: '14px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '16px'
            }}
          >
            📞 1800-599-0019
          </a>
        </div>

        {/* Helpline 2 */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '20px',
          boxShadow: '0 4px 15px rgba(229, 62, 62, 0.1)'
        }}>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#2E3A45' }}>
            Vandrevala Foundation
          </h2>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#666' }}>
            24x7 Free Crisis Counseling
          </p>
          <a 
            href="tel:9999666555"
            style={{
              display: 'block',
              textAlign: 'center',
              backgroundColor: '#E53E3E',
              color: 'white',
              padding: '14px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '16px'
            }}
          >
            📞 9999-666-555
          </a>
        </div>
      </motion.div>
    </div>
  );
}