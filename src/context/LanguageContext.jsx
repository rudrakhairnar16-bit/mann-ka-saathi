import { createContext, useState, useContext } from 'react';

const content = {
  hindi: {
    appName: 'मन का साथी',
    tagline: 'दिल से बात, Heart To Heart',
    startButton: 'बात करते हैं',
    welcomeMsg: 'नमस्ते! मैं हूं आपका मन का साथी! 🙏',
    askName: 'पहले अपना नाम बताइए? 😊',
    namePlaceholder: 'आपका नाम लिखें...',
    nameButton: 'आगे बढ़ें',
    nameError: 'कृपया अपना नाम लिखें!',
    howAreYou: 'आज कैसा महसूस हो रहा है?',
    good: 'अच्छा',
    okay: 'ठीक है',
    sad: 'उदास',
    anxious: 'चिंतित',
    angry: 'गुस्सा',
    tired: 'थका हुआ',
    safeMessage: 'यहाँ सब safe है 🔒',
    emergency: 'आपातकालीन सहायता 🆘',
  },
  english: {
    appName: 'Mann Ka Saathi',
    tagline: 'Dil Se Baat, Heart To Heart',
    startButton: 'Start Talking',
    welcomeMsg: 'Hello! I am your Mann Ka Saathi! 🙏',
    askName: 'First, please tell me your name? 😊',
    namePlaceholder: 'Write your name...',
    nameButton: 'Continue',
    nameError: 'Please enter your name!',
    howAreYou: 'How are you feeling today?',
    good: 'Good',
    okay: 'Okay',
    sad: 'Sad',
    anxious: 'Anxious',
    angry: 'Angry',
    tired: 'Tired',
    safeMessage: 'Everything is safe here 🔒',
    emergency: 'Emergency Help 🆘',
  },
  hinglish: {
    appName: 'Mann Ka Saathi',
    tagline: 'Dil Se Baat, Heart To Heart',
    startButton: 'Baat Karte Hain',
    welcomeMsg: 'Hello! Main hun aapka Mann Ka Saathi! 🙏',
    askName: 'Pehle aapka naam bataiye? 😊',
    namePlaceholder: 'Aapka naam likho...',
    nameButton: 'Aage Badho',
    nameError: 'Please apna naam likho!',
    howAreYou: 'Aaj kaisa feel ho raha hai?',
    good: 'Acha hai',
    okay: 'Theek hun',
    sad: 'Sad hun',
    anxious: 'Tense hun',
    angry: 'Gussa hun',
    tired: 'Thaka hun',
    safeMessage: 'Yahan sab safe hai 🔒',
    emergency: 'Emergency Help 🆘',
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('hinglish');

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  const t = content[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}