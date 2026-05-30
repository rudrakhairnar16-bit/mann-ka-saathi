import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Books() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [expandedId, setExpandedId] = useState(null);

  const uiText = {
    hindi: { title: 'सुझाई गई किताबें', subtitle: 'मानसिक शांति और विकास के लिए', readMore: 'सारांश पढ़ें ↓', readLess: 'कम करें ↑' },
    english: { title: 'Recommended Books', subtitle: 'Curated for your well-being', readMore: 'Read Summary ↓', readLess: 'Show Less ↑' },
    hinglish: { title: 'Recommended Books', subtitle: 'Mental well-being ke liye best books', readMore: 'Summary Padhein ↓', readLess: 'Kam Karein ↑' }
  };

  const currentLang = language || 'english';
  const t = uiText[currentLang];

  // Open Library ke reliable ISBN image links use kiye gaye hain jo block nahi hote
  const booksList = [
    {
      id: 1,
      imageUrl: 'https://covers.openlibrary.org/b/isbn/9780062457714-L.jpg',
      title: 'The Subtle Art of Not Giving a F*ck',
      author: 'Mark Manson',
      category: { hindi: 'सेल्फ-हेल्प', english: 'Self-Help', hinglish: 'Self-Help' },
      description: { hindi: 'सच्ची खुशी का तरीका।', english: 'A realistic approach to life.', hinglish: 'Life jeene ka real tarika.' },
      summary: { hindi: 'यह किताब सिखाती है कि हर समय पॉजिटिव रहने के बजाय, अपनी कमियों को स्वीकार करना जरूरी है।', english: 'Teaches you to accept flaws and focus only on what truly matters.', hinglish: 'Ye book sikhata hai ki apni limits ko accept karna aur important cheezon par focus karna zaruri hai.' }
    },
    {
      id: 2,
      imageUrl: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
      title: 'Atomic Habits',
      author: 'James Clear',
      category: { hindi: 'उत्पादकता', english: 'Productivity', hinglish: 'Productivity' },
      description: { hindi: 'अच्छी आदतें बनाने का तरीका।', english: 'Proven way to build habits.', hinglish: 'Achhi habits banane ka tarika.' },
      summary: { hindi: 'छोटे-छोटे बदलाव कैसे जीवन में बड़े परिणाम लाते हैं, यह किताब इसी का विज्ञान है।', english: 'Shows how tiny daily changes lead to remarkable long-term results.', hinglish: 'Chote-chote daily changes kaise long-term mein bada impact laate hain.' }
    },
    {
      id: 3,
      imageUrl: 'https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg',
      title: 'Ikigai',
      author: 'Héctor García',
      category: { hindi: 'जीवन दर्शन', english: 'Philosophy', hinglish: 'Philosophy' },
      description: { hindi: 'खुशहाल जीवन का रहस्य।', english: 'Secret to a happy life.', hinglish: 'Khushhaal life ka secret.' },
      summary: { hindi: 'जापानी दर्शन जो हमें जीने का उद्देश्य और खुशी ढूँढना सिखाता है।', english: 'Explores the Japanese concept of finding purpose in daily life.', hinglish: 'Ye Japanese concept sikhata hai ki life mein apna purpose kaise dhundhein.' }
    },
    {
      id: 4,
      imageUrl: 'https://covers.openlibrary.org/b/isbn/9781577314806-L.jpg',
      title: 'The Power of Now',
      author: 'Eckhart Tolle',
      category: { hindi: 'माइंडफुलनेस', english: 'Mindfulness', hinglish: 'Mindfulness' },
      description: { hindi: 'वर्तमान में जीना सीखें।', english: 'Living in the present.', hinglish: 'Present mein jeena seekhein.' },
      summary: { hindi: 'तनाव से मुक्ति के लिए वर्तमान क्षण में पूरी तरह उपस्थित रहना ही एकमात्र उपाय है।', english: 'Finding peace by letting go of past and future to live in the Now.', hinglish: 'Stress se bachne ke liye present moment mein jeena zaroori hai.' }
    },
    {
      id: 5,
      imageUrl: 'https://covers.openlibrary.org/b/isbn/9780807014295-L.jpg',
      title: 'Man\'s Search for Meaning',
      author: 'Viktor E. Frankl',
      category: { hindi: 'मनोविज्ञान', english: 'Psychology', hinglish: 'Psychology' },
      description: { hindi: 'जीवन का उद्देश्य ढूँढना।', english: 'Finding life purpose.', hinglish: 'Life ka purpose dhundhna.' },
      summary: { hindi: 'अत्यंत कठिन परिस्थितियों में भी जीवित रहने और उद्देश्य पाने की सच्ची प्रेरक कहानी।', english: 'A powerful story about finding hope and meaning in suffering.', hinglish: 'Har mushkil mein jeene ki ek wajah dhundhne ki prerak kahani.' }
    },
    {
      id: 6,
      imageUrl: 'https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg',
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      category: { hindi: 'आत्म-सुधार', english: 'Self-Improvement', hinglish: 'Self-Improvement' },
      description: { hindi: 'फैसलों का विज्ञान।', english: 'Science of decisions.', hinglish: 'Decisions ka logic.' },
      summary: { hindi: 'हमारा दिमाग कैसे सोचता है और हम बेहतर निर्णय कैसे ले सकते हैं, इसका विस्तृत वर्णन।', english: 'Explains the two systems of thinking and how to make better choices.', hinglish: 'Hamara dimaag decision kaise leta hai, iske do systems ka logic.' }
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', padding: '20px', fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <button onClick={() => navigate('/chat')} style={{ background: 'none', border: 'none', fontSize: '24px', color: '#5B8DEF', cursor: 'pointer', marginBottom: '20px' }}>←</button>
        <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: '700', color: '#2E3A45' }}>{t.title}</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>{t.subtitle}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {booksList.map((book) => (
            <div key={book.id} style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ width: '100%', height: '220px', backgroundColor: '#EDF2F7', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img 
                  src={book.imageUrl} 
                  alt={book.title} 
                  style={{ height: '100%', width: '100%', objectFit: 'contain', padding: '10px' }} 
                  onError={(e) => { 
                    e.target.onerror = null; // Infinite loop ko rokne ke liye
                    e.target.src = 'https://placehold.co/400x600/EDF2F7/5B8DEF?text=Cover+Unavailable' // Naya, zyada reliable placeholder
                  }} 
                />
              </div>

              <span style={{ fontSize: '12px', color: '#5B8DEF', fontWeight: '700', textTransform: 'uppercase' }}>{book.category[currentLang]}</span>
              <h3 style={{ margin: '8px 0', fontSize: '18px', fontWeight: '700', color: '#2E3A45' }}>{book.title}</h3>
              <p style={{ fontSize: '14px', color: '#A0AEC0', fontStyle: 'italic' }}>by {book.author}</p>
              <p style={{ fontSize: '14px', color: '#4A5568', margin: '16px 0', lineHeight: '1.5' }}>{book.description[currentLang]}</p>
              
              <div style={{ flex: 1 }}></div>

              <AnimatePresence>
                {expandedId === book.id && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                    <p style={{ fontSize: '13.5px', padding: '12px', backgroundColor: '#F7F9FC', borderRadius: '12px', marginBottom: '16px', lineHeight: '1.6', color: '#2E3A45' }}>
                      {book.summary[currentLang]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                onClick={() => setExpandedId(expandedId === book.id ? null : book.id)} 
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  borderRadius: '12px', 
                  border: 'none', 
                  backgroundColor: expandedId === book.id ? '#EDF2F7' : '#5B8DEF', 
                  color: expandedId === book.id ? '#4A5568' : 'white', 
                  fontWeight: '700', 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: expandedId === book.id ? 'none' : '0 4px 10px rgba(91, 141, 239, 0.3)'
                }}
              >
                {expandedId === book.id ? t.readLess : t.readMore}
              </button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}