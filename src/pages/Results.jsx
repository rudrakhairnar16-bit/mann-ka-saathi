import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { adviceData } from '../data/advice'; // Naya advice database import kiya

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.finalScore || 0;

  // Score Logic & Category
  let resultData = {};
  let category = 'mild';

  if (score <= 4) {
    category = 'mild';
    resultData = {
      title: "Aap Theek Hain! 🌟",
      color: "#7CBF9E",
      message: "Thodi si tension hai, jo ki bilkul normal hai. Aap isko aaram se manage kar sakte hain.",
    };
  } else if (score <= 8) {
    category = 'moderate';
    resultData = {
      title: "Thoda Stress Hai 🌤️",
      color: "#F6AD55",
      message: "Lagta hai aapke dimaag mein kaafi kuch chal raha hai. Aapko thode support ki zaroorat hai.",
    };
  } else {
    category = 'severe';
    resultData = {
      title: "Dhyan Rakhne Ki Zaroorat Hai ❤️",
      color: "#FC8181",
      message: "Aap abhi kaafi bhaari waqt se guzar rahe hain. Akele sab kuch sehna zaroori nahi hai.",
    };
  }

  // Pick random advice from the category
  const possibleAdvice = adviceData[category];
  const randomAdvice = possibleAdvice[Math.floor(Math.random() * possibleAdvice.length)];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Header */}
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', alignItems: 'center', marginBottom: '30px', marginTop: '10px' }}>
        <button onClick={() => navigate('/chat')} style={{ background: 'none', border: 'none', fontSize: '24px', color: '#5B8DEF', cursor: 'pointer' }}>
          ←
        </button>
        <h2 style={{ margin: '0 auto', fontSize: '18px', color: '#2E3A45', fontFamily: 'Poppins, sans-serif' }}>
          Aapka Result
        </h2>
      </div>

      {/* Result Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '400px', backgroundColor: 'white', borderRadius: '24px', padding: '30px 20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', marginBottom: '30px', borderTop: `6px solid ${resultData.color}` }}
      >
        <h1 style={{ fontSize: '24px', color: resultData.color, fontFamily: 'Poppins, sans-serif', marginBottom: '16px' }}>
          {resultData.title}
        </h1>
        
        <div style={{ backgroundColor: '#F7F9FC', padding: '16px', borderRadius: '16px', marginBottom: '20px' }}>
          <p style={{ margin: 0, fontSize: '15px', color: '#2E3A45', fontFamily: 'Nunito, sans-serif', lineHeight: '1.6' }}>
            {resultData.message}
          </p>
        </div>

        {/* Personalized Advice Section */}
        <div style={{ textAlign: 'left', backgroundColor: `${resultData.color}15`, padding: '16px', borderRadius: '16px', borderLeft: `4px solid ${resultData.color}` }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#2E3A45', fontFamily: 'Poppins, sans-serif' }}>
            Aapke Liye Ek Tip 💡
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#4A5568', fontFamily: 'Nunito, sans-serif', lineHeight: '1.5' }}>
            {randomAdvice}
          </p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/chat')}
          style={{ width: '100%', padding: '16px', backgroundColor: '#5B8DEF', color: 'white', borderRadius: '16px', fontSize: '16px', fontWeight: '600', border: 'none', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', boxShadow: '0 4px 12px rgba(91,141,239,0.3)' }}
        >
          Phir Se Baat Karein
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/resources')}
          style={{ width: '100%', padding: '16px', backgroundColor: 'white', color: '#5B8DEF', border: '2px solid #5B8DEF', borderRadius: '16px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}
        >
          Resources & Helplines
        </motion.button>
      </div>

    </div>
  );
}