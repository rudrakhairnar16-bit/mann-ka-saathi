import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

export default function Onboarding() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { saveUserName, completeOnboarding } = useUser();

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const text = {
    hindi: {
      welcome: 'स्वागत है!',
      welcomeDesc: 'मैं हूं आपका मन का साथी! यहाँ आप बिना किसी डर के अपनी बात कह सकते हैं। 🤗',
      next: 'आगे बढ़ें →',
      howWorks: 'कैसे काम करता है?',
      privacy: 'आपकी Privacy हमारी जिम्मेदारी',
      understood: 'समझ गया! आगे बढ़ें →',
      askName: 'आपका नाम बताइए?',
      nameDesc: 'हम आपको नाम से बुलाएंगे 🤗',
      namePlaceholder: 'आपका नाम...',
      nameButton: 'आगे बढ़ें 🚀',
      nameRequired: '* नाम देना जरूरी है',
      back: '← वापस जाएं',
      noLogin: 'कोई Login नहीं',
      noData: 'डेटा बेचा नहीं जाएगा',
      anonymous: 'पूरी तरह गुप्त',
      noJudge: 'Judge नहीं किया जाएगा',
      step1Title: 'बात करें',
      step1Desc: 'अपने मन की बात खुलकर बोलें',
      step2Title: 'समझें',
      step2Desc: 'हम आपकी भावनाओं को समझेंगे',
      step3Title: 'बेहतर बनें',
      step3Desc: 'व्यक्तिगत सलाह पाएं',
    },
    english: {
      welcome: 'Welcome!',
      welcomeDesc: 'I am your Mann Ka Saathi! Here you can speak your heart without any fear! 🤗',
      next: 'Continue →',
      howWorks: 'How Does It Work?',
      privacy: 'Your Privacy Is Our Responsibility!',
      understood: 'Got It! Continue →',
      askName: 'What Is Your Name?',
      nameDesc: 'We will call you by your name 🤗',
      namePlaceholder: 'Your name...',
      nameButton: 'Continue 🚀',
      nameRequired: '* Name is required',
      back: '← Go Back',
      noLogin: 'No Login Required',
      noData: 'Data Will Never Be Sold',
      anonymous: 'Completely Anonymous',
      noJudge: 'No Judgment Here',
      step1Title: 'Talk',
      step1Desc: 'Speak your heart freely',
      step2Title: 'Understand',
      step2Desc: 'We will understand your feelings',
      step3Title: 'Get Better',
      step3Desc: 'Get personalized advice',
    },
    hinglish: {
      welcome: 'Swagat Hai!',
      welcomeDesc: 'Main hun tumhara Mann Ka Saathi! Yahan tum bina kisi darr ke apni baat keh sakte ho! 🤗',
      next: 'Aage Badho →',
      howWorks: 'Kaise Kaam Karta Hai?',
      privacy: 'Tumhari Privacy Hamari Zimmedari!',
      understood: 'Samajh Gaya! Aage Badho →',
      askName: 'Apna Naam Batao Yaar?',
      nameDesc: 'Hum tumhe naam se bulayenge 🤗',
      namePlaceholder: 'Tera naam...',
      nameButton: 'Chalte Hain 🚀',
      nameRequired: '* Naam dena zaroori hai',
      back: '← Wapas Jao',
      noLogin: 'Koi Login Nahi',
      noData: 'Data Kabhi Nahi Bechenge',
      anonymous: 'Bilkul Anonymous',
      noJudge: 'Koi Judgment Nahi',
      step1Title: 'Baat Karo',
      step1Desc: 'Apne mann ki baat khulke bolo',
      step2Title: 'Samjho',
      step2Desc: 'Hum tumhari feelings samjhenge',
      step3Title: 'Better Bano',
      step3Desc: 'Personalized advice pao',
    }
  };

  const tx = text[language];

  const handleNameSubmit = () => {
    if (name.trim().length < 2) {
      setNameError(t.nameError);
      return;
    }
    saveUserName(name.trim());
    completeOnboarding();
    navigate('/chat');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F7F9FC',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>

      {/* Progress Dots */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '30px'
      }}>
        {[1, 2, 3, 4].map((dot) => (
          <div key={dot} style={{
            width: dot === step ? '24px' : '8px',
            height: '8px',
            borderRadius: '10px',
            backgroundColor: dot <= step
              ? '#5B8DEF'
              : '#D0D9F0',
            transition: 'all 0.3s'
          }} />
        ))}
      </div>

      {/* Card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '30px',
        padding: '40px 30px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 10px 40px rgba(91, 141, 239, 0.15)'
      }}>
        <AnimatePresence mode="wait">

          {/* STEP 1 - Welcome */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '80px' }}>🙏</div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#2E3A45',
                fontFamily: 'Poppins, sans-serif'
              }}>
                {tx.welcome}
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#666',
                lineHeight: '1.6',
                fontFamily: 'Nunito, sans-serif'
              }}>
                {tx.welcomeDesc}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(2)}
                style={{
                  width: '100%',
                  backgroundColor: '#5B8DEF',
                  color: 'white',
                  padding: '16px',
                  borderRadius: '16px',
                  fontSize: '16px',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                {tx.next}
              </motion.button>
            </motion.div>
          )}

          {/* STEP 2 - How It Works */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                textAlign: 'center'
              }}
            >
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#2E3A45',
                fontFamily: 'Poppins, sans-serif'
              }}>
                {tx.howWorks}
              </h2>
              {[
                { icon: '💬', title: tx.step1Title, desc: tx.step1Desc },
                { icon: '🔍', title: tx.step2Title, desc: tx.step2Desc },
                { icon: '💡', title: tx.step3Title, desc: tx.step3Desc },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  backgroundColor: '#F7F9FC',
                  padding: '16px',
                  borderRadius: '16px',
                  width: '100%',
                  textAlign: 'left'
                }}>
                  <span style={{ fontSize: '36px' }}>{item.icon}</span>
                  <div>
                    <p style={{
                      fontWeight: '700',
                      color: '#2E3A45',
                      marginBottom: '4px'
                    }}>
                      {item.title}
                    </p>
                    <p style={{
                      fontSize: '13px',
                      color: '#666'
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(3)}
                style={{
                  width: '100%',
                  backgroundColor: '#5B8DEF',
                  color: 'white',
                  padding: '16px',
                  borderRadius: '16px',
                  fontSize: '16px',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                {tx.next}
              </motion.button>
            </motion.div>
          )}

          {/* STEP 3 - Privacy */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '70px' }}>🔒</div>
              <h2 style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#2E3A45',
                fontFamily: 'Poppins, sans-serif'
              }}>
                {tx.privacy}
              </h2>
              {[
                { icon: '✅', text: tx.noLogin },
                { icon: '✅', text: tx.noData },
                { icon: '✅', text: tx.anonymous },
                { icon: '✅', text: tx.noJudge },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: '#F0FFF4',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  width: '100%',
                  textAlign: 'left',
                  border: '1px solid #7CBF9E'
                }}>
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <span style={{
                    fontWeight: '600',
                    color: '#2E3A45',
                    fontFamily: 'Nunito, sans-serif'
                  }}>
                    {item.text}
                  </span>
                </div>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(4)}
                style={{
                  width: '100%',
                  backgroundColor: '#5B8DEF',
                  color: 'white',
                  padding: '16px',
                  borderRadius: '16px',
                  fontSize: '16px',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                {tx.understood}
              </motion.button>
            </motion.div>
          )}

          {/* STEP 4 - Name Input */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '70px' }}>😊</div>
              <div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#2E3A45',
                  fontFamily: 'Poppins, sans-serif',
                  marginBottom: '8px'
                }}>
                  {tx.askName}
                </h2>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  {tx.nameDesc}
                </p>
              </div>

              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError('');
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                placeholder={tx.namePlaceholder}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '16px',
                  border: nameError
                    ? '2px solid #E53E3E'
                    : '2px solid #5B8DEF',
                  fontSize: '18px',
                  fontFamily: 'Nunito, sans-serif',
                  outline: 'none',
                  textAlign: 'center',
                  backgroundColor: 'white',
                  color: '#2E3A45',
                  boxSizing: 'border-box'
                }}
                autoFocus
              />

              {nameError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    color: '#E53E3E',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  ⚠️ {nameError}
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNameSubmit}
                style={{
                  width: '100%',
                  backgroundColor: name.trim().length >= 2
                    ? '#5B8DEF'
                    : '#B0C4EF',
                  color: 'white',
                  padding: '16px',
                  borderRadius: '16px',
                  fontSize: '18px',
                  fontWeight: '700',
                  border: 'none',
                  cursor: name.trim().length >= 2
                    ? 'pointer'
                    : 'not-allowed',
                  fontFamily: 'Poppins, sans-serif',
                  transition: 'all 0.3s'
                }}
              >
                {tx.nameButton}
              </motion.button>

              <p style={{
                fontSize: '12px',
                color: '#aaa'
              }}>
                {tx.nameRequired}
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Back Button */}
      {step > 1 && (
        <button
          onClick={() => setStep(step - 1)}
          style={{
            marginTop: '16px',
            background: 'none',
            border: 'none',
            color: '#5B8DEF',
            fontSize: '14px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {tx.back}
        </button>
      )}

    </div>
  );
}