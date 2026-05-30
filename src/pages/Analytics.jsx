import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

export default function Analytics() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { userName } = useUser();

  const [todaysAffirmation, setTodaysAffirmation] = useState('');
  const [chartData, setChartData] = useState([]);

  // 1. Multilingual Daily Affirmations
  const affirmations = {
    hindi: [
      "आप जितना सोचते हैं, उससे कहीं ज्यादा मजबूत हैं। 💪",
      "हर नया दिन एक नई शुरुआत है। आज का दिन आपका है! 🌅",
      "छोटी-छोटी जीत भी बहुत बड़ी होती है। खुद पर गर्व करें। 🏆"
    ],
    english: [
      "You are stronger than you think you are. 💪",
      "Every new day is a fresh start. Today is yours! 🌅",
      "Small victories are still victories. Be proud of yourself. 🏆"
    ],
    hinglish: [
      "Aap jitna sochte hain, usse kahin zyada mazboot hain. 💪",
      "Har naya din ek nayi shuruaat hai. Aaj ka din aapka hai! 🌅",
      "Chhoti chhoti jeet bhi bohot badi hoti hai. Khud par garv karein. 🏆"
    ]
  };

  // 2. Mood to Number Converter (For Graph)
  const moodScoreMap = {
    "Bahut Acha": 10, "Khush": 9, "Shaant": 8, "Theek": 6, 
    "Thaka Hua": 5, "Uljhan": 4, "Akela": 3, "Tension": 3, 
    "Udaas": 2, "Gussa": 2, "Dukh": 1
  };

  useEffect(() => {
    // Roz ek naya affirmation
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const list = affirmations[language] || affirmations.hinglish;
    setTodaysAffirmation(list[dayOfYear % list.length]);

    // LocalStorage se Mood Data lana
    const savedHistory = JSON.parse(localStorage.getItem('mannkasaathi_moods')) || [];
    const recentMoods = savedHistory.slice(0, 7).reverse(); // Pichle 7 din
    
    const formattedData = recentMoods.map((entry) => ({
      date: entry.date.split(',')[0],
      moodScore: moodScoreMap[entry.mood.label] || 5,
      moodEmoji: entry.mood.emoji,
      label: entry.mood.label
    }));

    setChartData(formattedData);
  }, [language]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <p style={{ margin: 0, fontWeight: '700', color: '#2E3A45' }}>{data.date}</p>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#5B8DEF' }}>
            {data.moodEmoji} {data.label} (Score: {data.moodScore})
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', padding: '20px', fontFamily: 'Nunito, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
        <button onClick={() => navigate('/chat')} style={{ background: 'none', border: 'none', fontSize: '24px', color: '#5B8DEF', cursor: 'pointer' }}>←</button>
        <h2 style={{ margin: '0 auto', fontSize: '20px', color: '#2E3A45' }}>
          {language === 'hindi' ? 'आपकी प्रोग्रेस' : 'Your Progress'} 📈
        </h2>
      </div>

      {/* Daily Affirmation Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'linear-gradient(135deg, #6EE7B7 0%, #3B82F6 100%)', borderRadius: '24px', padding: '25px', marginBottom: '30px', color: 'white', textAlign: 'center' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>✨ Daily Affirmation</h3>
        <p style={{ fontSize: '22px', fontWeight: 'bold', fontStyle: 'italic', margin: 0 }}>"{todaysAffirmation}"</p>
      </motion.div>

      {/* Visual Analytics Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '25px 20px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontSize: '16px', color: '#2E3A45', marginBottom: '20px', textAlign: 'center' }}>📊 Mood Journey</h3>
        
        {chartData.length > 0 ? (
          <div style={{ width: '100%', height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" vertical={false} />
                <XAxis dataKey="date" stroke="#A0AEC0" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#A0AEC0" fontSize={12} domain={[0, 10]} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="moodScore" stroke="#5B8DEF" strokeWidth={4} dot={{ r: 6, fill: '#5B8DEF', strokeWidth: 2, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#A0AEC0', fontSize: '14px' }}>
            Track your mood to see the graph!
          </div>
        )}
      </motion.div>
    </div>
  );
}