import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Books() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [expandedId, setExpandedId] = useState(null);

  // MULTILINGUAL UI TEXT
  const uiText = {
    hindi: {
      title: 'सुझाई गई किताबें',
      subtitle: 'आपके मानसिक स्वास्थ्य और विकास के लिए बेहतरीन किताबें।',
      readMore: 'सारांश पढ़ें ↓',
      readLess: 'कम करें ↑'
    },
    english: {
      title: 'Recommended Books',
      subtitle: 'Curated resources for your mental well-being and growth.',
      readMore: 'Read Summary ↓',
      readLess: 'Show Less ↑'
    },
    hinglish: {
      title: 'Recommended Books',
      subtitle: 'Aapke mental well-being aur growth ke liye best books.',
      readMore: 'Summary Padhein ↓',
      readLess: 'Kam Karein ↑'
    }
  };

  const currentLang = language || 'english';
  const t = uiText[currentLang];

  // 6 BOOKS WITH SUMMARIES & NEW IMAGE URLs
  const booksList = [
    {
      id: 1,
      imageUrl: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY466_.jpg', 
      title: 'The Subtle Art of Not Giving a F*ck',
      author: 'Mark Manson',
      category: { hindi: 'सेल्फ-हेल्प', english: 'Self-Help', hinglish: 'Self-Help' },
      description: {
        hindi: 'एक अच्छी जिंदगी जीने का अलग और सच्चा तरीका।',
        english: 'A counterintuitive approach to living a good life.',
        hinglish: 'Ek achhi life jeene ka practical aur sachha tarika.'
      },
      summary: {
        hindi: 'यह किताब सिखाती है कि हर समय "पॉजिटिव" रहने के बजाय, हमें अपनी कमियों को स्वीकार करना चाहिए। हमें यह चुनना होगा कि किन चीज़ों पर सच में ध्यान देना है और किन फालतू चीज़ों को छोड़ना है।',
        english: 'This book argues that life\'s struggles give it meaning. It teaches you how to pick your battles, accept your flaws, and focus only on what truly matters to you.',
        hinglish: 'Ye book sikhata hai ki har waqt "positive" rehna zaruri nahi. Humein apni limits accept karni chahiye aur sirf unhi cheezon par focus karna chahiye jo sach mein important hain.'
      }
    },
    {
      id: 2,
      imageUrl: 'https://m.media-amazon.com/images/I/81bGKUa1e0L._SY466_.jpg',
      title: 'Atomic Habits',
      author: 'James Clear',
      category: { hindi: 'उत्पादकता', english: 'Productivity', hinglish: 'Productivity' },
      description: {
        hindi: 'अच्छी आदतें बनाने और बुरी आदतें छोड़ने का आसान तरीका।',
        english: 'An easy & proven way to build good habits & break bad ones.',
        hinglish: 'Achhi habits banane aur buri aadat chhodne ka asaan tarika.'
      },
      summary: {
        hindi: 'यह किताब छोटे बदलावों की ताकत पर जोर देती है। लेखक बताते हैं कि कैसे रोज़ाना केवल 1% बेहतर बनकर आप लंबे समय में बहुत बड़े और सकारात्मक परिणाम हासिल कर सकते हैं।',
        english: 'Atomic Habits offers a framework for improving every day. James Clear reveals how small, tiny changes in your daily routine can compound into remarkable, life-altering results.',
        hinglish: 'Ye book batati hai ki chote-chote daily changes kaise long-term mein bada impact laate hain. Isme good habits banane ke practical steps diye gaye hain.'
      }
    },
    {
      id: 3,
      imageUrl: 'https://m.media-amazon.com/images/I/81l3rZK4lnL._SY466_.jpg',
      title: 'Ikigai',
      author: 'Héctor García & Francesc Miralles',
      category: { hindi: 'जीवन दर्शन', english: 'Philosophy', hinglish: 'Philosophy' },
      description: {
        hindi: 'लंबी और खुशहाल जिंदगी जीने का जापानी रहस्य।',
        english: 'The Japanese secret to a long and happy life.',
        hinglish: 'Lambi aur khushhaal zindagi jeene ka Japanese secret.'
      },
      summary: {
        hindi: 'इकीगाई का मतलब है "आपके जीने का कारण"। यह किताब जापानी लोगों के उस रहस्य को उजागर करती है जिससे वे लंबी, खुशहाल और तनावमुक्त जिंदगी जीते हैं।',
        english: 'Ikigai translates to "a reason for being." This book explores the mindset of the world\'s longest-living people, providing insights on finding joy, purpose, and mindfulness.',
        hinglish: 'Ikigai ka matlab hai "jeene ki wajah". Ye book un Japanese logon ke lifestyle ko explore karti hai jo duniya mein sabse lambi aur khush life jeete hain.'
      }
    },
    {
      id: 4,
      imageUrl: 'https://m.media-amazon.com/images/I/813uPE2rQvL._SY466_.jpg',
      title: 'The Power of Now',
      author: 'Eckhart Tolle',
      category: { hindi: 'माइंडफुलनेस', english: 'Mindfulness', hinglish: 'Mindfulness' },
      description: {
        hindi: 'अतीत और भविष्य की चिंता छोड़ वर्तमान में जीना।',
        english: 'A guide to spiritual enlightenment and living in the present.',
        hinglish: 'Past aur future ki chinta chhod kar present mein jeena.'
      },
      summary: {
        hindi: 'यह किताब हमें सिखाती है कि चिंता और तनाव हमेशा अतीत या भविष्य के बारे में सोचने से आते हैं। सच्ची शांति केवल "वर्तमान क्षण" (Now) में जीने से ही मिल सकती है।',
        english: 'The author shows how stress and anxiety are created by dwelling on the past or worrying about the future. True peace is found only by fully living in the present moment.',
        hinglish: 'Ye book humein sikhata hai ki overthinking past ya future ki hoti hai. Sacchi shanti aur khushi sirf present moment (Aaj aur Abhi) mein jeene se milti hai.'
      }
    },
    {
      id: 5,
      imageUrl: 'https://m.media-amazon.com/images/I/61157OAepWL._SY466_.jpg',
      title: 'Man\'s Search for Meaning',
      author: 'Viktor E. Frankl',
      category: { hindi: 'मनोविज्ञान', english: 'Psychology', hinglish: 'Psychology' },
      description: {
        hindi: 'सबसे गहरे दुख में भी जीवन का उद्देश्य ढूँढना।',
        english: 'Finding purpose and meaning even in the deepest suffering.',
        hinglish: 'Sabse bure waqt mein bhi life ka purpose dhundhna.'
      },
      summary: {
        hindi: 'एक मनोवैज्ञानिक की यह सच्ची कहानी बताती है कि इंसान किसी भी मुश्किल को सह सकता है, बशर्ते उसके पास जीने का कोई मजबूत कारण या उद्देश्य हो।',
        english: 'Based on his survival in a concentration camp, Frankl argues that we cannot avoid suffering, but we can choose how to cope with it, find meaning in it, and move forward.',
        hinglish: 'Ye ek sacchi kahani hai jo sikhata hai ki insaan har dukh seh sakta hai, agar uske paas jeene ki koi wajah (purpose) ho. Ye ummeed na chhodne ki best book hai.'
      }
    },
    {
      id: 6,
      imageUrl: 'https://m.media-amazon.com/images/I/61fW85Q6Q1L._SY466_.jpg',
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      category: { hindi: 'आत्म-सुधार', english: 'Self-Improvement', hinglish: 'Self-Improvement' },
      description: {
        hindi: 'हमारा दिमाग फैसले कैसे लेता है, इसका विज्ञान।',
        english: 'Understanding the two systems that drive how we think.',
        hinglish: 'Hamara dimaag decisions kaise leta hai, iska logic.'
      },
      summary: {
        hindi: 'यह किताब समझाती है कि हमारा दिमाग दो तरह से काम करता है: एक तेज़ और भावनात्मक, दूसरा धीमा और तार्किक। यह हमें अपने ही दिमाग के धोखों से बचना सिखाती है।',
        english: 'The book explores the two systems of human thinking: System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and logical. It helps us make better decisions.',
        hinglish: 'Is book mein bataya gaya hai ki hamara dimaag do tareeqo se sochta hai: Emotional (Fast) aur Logical (Slow). Ye humein better aur sahi decisions lena sikhata hai.'
      }
    }
  ];

  const toggleSummary = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', padding: '20px', fontFamily: 'Nunito, sans-serif' }}>
      
      {/* Header */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', marginBottom: '30px', marginTop: '10px' }}>
        <button onClick={() => navigate('/chat')} style={{ background: 'none', border: 'none', fontSize: '24px', color: '#5B8DEF', cursor: 'pointer' }}>
          ←
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '24px', color: '#2E3A45', fontFamily: 'Poppins, sans-serif', fontWeight: '700' }}>
            {t.title}
          </h2>
          <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>
            {t.subtitle}
          </p>
        </div>
        <div style={{ width: '24px' }}></div>
      </div>

      {/* Books Grid */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {booksList.map((book) => (
          <motion.div 
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              backgroundColor: 'white', 
              borderRadius: '20px', 
              padding: '20px', 
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Book Image */}
            <div style={{ width: '100%', height: '220px', backgroundColor: '#EDF2F7', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <img 
                 src={book.imageUrl} 
                 alt={book.title} 
                 style={{ height: '100%', width: '100%', objectFit: 'contain', padding: '10px' }} 
                 onError={(e) => { e.target.src = 'https://via.placeholder.com/200x300?text=Book+Cover' }} 
               />
            </div>

            {/* Category & Title */}
            <span style={{ fontSize: '12px', color: '#5B8DEF', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.5px' }}>
              {book.category[currentLang]}
            </span>
            <h3 style={{ margin: '8px 0 4px 0', fontSize: '18px', color: '#2E3A45', fontFamily: 'Poppins, sans-serif', fontWeight: '700' }}>
              {book.title}
            </h3>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#A0AEC0', fontStyle: 'italic' }}>
              by {book.author}
            </p>

            {/* Short Description */}
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#4A5568', lineHeight: '1.5' }}>
              {book.description[currentLang]}
            </p>

            {/* Spacer to push buttons to the bottom */}
            <div style={{ flex: 1 }}></div>

            {/* Expandable Summary */}
            <AnimatePresence>
              {expandedId === book.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{ margin: '0 0 16px 0', fontSize: '13.5px', color: '#2E3A45', backgroundColor: '#F7F9FC', padding: '12px', borderRadius: '12px', lineHeight: '1.6' }}>
                    {book.summary[currentLang]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Single Action Button (Full Width) */}
            <button 
              onClick={() => toggleSummary(book.id)}
              style={{ 
                width: '100%',
                backgroundColor: expandedId === book.id ? '#EDF2F7' : '#5B8DEF', 
                color: expandedId === book.id ? '#4A5568' : 'white', 
                padding: '12px', 
                border: 'none', 
                borderRadius: '12px', 
                fontSize: '14px', 
                fontWeight: '700', 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: expandedId === book.id ? 'none' : '0 4px 10px rgba(91, 141, 239, 0.3)'
              }}
            >
              {expandedId === book.id ? t.readLess : t.readMore}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}