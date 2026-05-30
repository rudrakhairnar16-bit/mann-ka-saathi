import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Resources() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Tabs aur expand state
  const [activeTab, setActiveTab] = useState('exercises'); 
  const [expandedId, setExpandedId] = useState(null);

  const currentLang = language || 'english';

  // MULTILINGUAL UI TEXT
  const uiText = {
    hindi: {
      title: 'सेल्फ-केयर संसाधन 📖',
      subtitle: 'अपने मानसिक स्वास्थ्य के लिए लेख पढ़ें या ऑडियो सुनें।',
      tabExercises: 'व्यायाम और गाइड',
      tabPodcasts: 'पॉडकास्ट (YouTube)',
      readMore: 'स्टेप्स पढ़ें ↓',
      readLess: 'स्टेप्स छुपाएं ↑',
      listenBtn: 'YouTube पर सुनें ▶'
    },
    english: {
      title: 'Self-Care Resources 📖',
      subtitle: 'Read articles or listen to audio for your mental well-being.',
      tabExercises: 'Exercises & Guides',
      tabPodcasts: 'Podcasts (YouTube)',
      readMore: 'Read Steps ↓',
      readLess: 'Hide Steps ↑',
      listenBtn: 'Listen on YouTube ▶'
    },
    hinglish: {
      title: 'Self-Care Resources 📖',
      subtitle: 'Apne mental well-being ke liye guides padhein ya audio sunein.',
      tabExercises: 'Exercises & Guides',
      tabPodcasts: 'Podcasts (YouTube)',
      readMore: 'Steps Padhein ↓',
      readLess: 'Steps Chupayein ↑',
      listenBtn: 'YouTube Par Sunein ▶'
    }
  };

  const t = uiText[currentLang];

  // 5 EXERCISES / GUIDES WITH STEPS
  const exercises = [
    {
      id: 1,
      icon: "🫁",
      title: { hindi: "4-7-8 श्वास तकनीक", english: "4-7-8 Breathing Technique", hinglish: "4-7-8 Breathing Technique" },
      desc: { hindi: "तनाव और चिंता को तुरंत कम करने के लिए गहरी सांस लेने का व्यायाम।", english: "A deep breathing exercise to quickly reduce stress and anxiety.", hinglish: "Stress aur anxiety ko turant kam karne ke liye deep breathing exercise." },
      steps: {
        hindi: ["आराम से बैठ जाएं और अपनी आँखें बंद करें।", "4 सेकंड तक नाक से गहरी सांस लें।", "7 सेकंड तक अपनी सांस को रोक कर रखें।", "8 सेकंड तक मुंह से धीरे-धीरे सांस छोड़ें।", "इस चक्र को 4 बार दोहराएं।"],
        english: ["Sit comfortably and close your eyes.", "Inhale deeply through your nose for 4 seconds.", "Hold your breath for 7 seconds.", "Exhale slowly through your mouth for 8 seconds.", "Repeat this cycle 4 times."],
        hinglish: ["Aaram se baith jayein aur aankhein band karein.", "4 seconds tak naak se gehri saans lein.", "7 seconds tak saans rok kar rakhein.", "8 seconds tak muh se dheere-dheere saans chodein.", "Is cycle ko 4 baar repeat karein."]
      }
    },
    {
      id: 2,
      icon: "🧘‍♂️",
      title: { hindi: "5-4-3-2-1 ग्राउंडिंग तकनीक", english: "5-4-3-2-1 Grounding Technique", hinglish: "5-4-3-2-1 Grounding Rule" },
      desc: { hindi: "पैनिक अटैक और ओवरथिंकिंग को रोकने का बहुत ही असरदार तरीका।", english: "A highly effective method to stop panic attacks and overthinking.", hinglish: "Panic attacks aur overthinking ko rokne ka bahut asardar tarika." },
      steps: {
        hindi: ["अपने आस-पास की 5 चीज़ें देखें और उनके नाम लें।", "4 चीज़ें जिन्हें आप छू सकते हैं (जैसे कुर्सी, कपड़े)।", "3 आवाज़ें जो आप सुन सकते हैं (हवा, पंखा, गाड़ियां)।", "2 चीज़ें जिन्हें आप सूंघ सकते हैं।", "1 अच्छी चीज़ जिसके बारे में आप सोच सकते हैं या चख सकते हैं।"],
        english: ["Name 5 things you can see around you.", "Name 4 things you can physically feel (e.g., chair, clothes).", "Name 3 things you can hear (e.g., wind, fan, traffic).", "Name 2 things you can smell.", "Name 1 good thing you can taste or think about."],
        hinglish: ["Aas-paas ki 5 cheezein dekhein aur unka naam lein.", "4 cheezein jo aap chhu sakte hain (jaise kapde, table).", "3 aawazein jo aap sun sakte hain (fan, birds, traffic).", "2 cheezein jo aap sungh (smell) sakte hain.", "1 achhi cheez jiske baare mein aap soch ya taste kar sakte hain."]
      }
    },
    {
      id: 3,
      icon: "🛌",
      title: { hindi: "अच्छी नींद के लिए टिप्स", english: "Tips for Better Sleep", hinglish: "Achhi Neend Ke Tips" },
      desc: { hindi: "रात को बेहतर और गहरी नींद पाने के लिए 5 आसान उपाय।", english: "5 simple steps to get better and deeper sleep at night.", hinglish: "Raat ko better aur deep sleep paane ke liye 5 asaan tips." },
      steps: {
        hindi: ["सोने से 1 घंटा पहले फोन या टीवी बंद कर दें।", "कमरे में पूरी तरह से अंधेरा और शांति रखें।", "सोने से पहले कैफीन (चाय/कॉफी) न पिएं।", "हल्का और सुपाच्य रात का खाना खाएं।", "सोने से पहले एक अच्छी किताब पढ़ें या हल्का संगीत सुनें।"],
        english: ["Turn off your phone or TV 1 hour before sleeping.", "Keep the room completely dark and quiet.", "Avoid caffeine (tea/coffee) before bedtime.", "Eat a light and easily digestible dinner.", "Read a good book or listen to calm music before sleeping."],
        hinglish: ["Sone se 1 ghanta pehle phone ya TV band kar dein.", "Room mein poori tarah andhera aur shanti rakhein.", "Sone se pehle chai ya coffee avoid karein.", "Raat ko halka (light) khana khayein.", "Sone se pehle koi book padhein ya shant music sunein."]
      }
    },
    {
      id: 4,
      icon: "✍️",
      title: { hindi: "ज्यादा सोचने (Overthinking) से कैसे बचें", english: "How to Stop Overthinking", hinglish: "Overthinking Ko Kaise Rokein" },
      desc: { hindi: "अपने विचारों को शांत करने और वर्तमान में जीने के लिए गाइड।", english: "A guide to calm your thoughts and live in the present moment.", hinglish: "Apne thoughts ko shant karne aur present mein jeene ki guide." },
      steps: {
        hindi: ["एक डायरी लें और अपने सभी विचार उसमें लिख डालें।", "पहचानें कि क्या चीज़ आपके कंट्रोल में है और क्या नहीं।", "जो कंट्रोल में नहीं है, उसे जाने देने का अभ्यास करें।", "खुद को किसी छोटे काम में व्यस्त करें (जैसे सफाई करना)।", "वर्तमान क्षण (Now) पर ध्यान केंद्रित करें।"],
        english: ["Take a diary and write down all your thoughts (Brain Dump).", "Identify what is in your control and what isn't.", "Practice letting go of things outside your control.", "Distract yourself with a small task (like cleaning).", "Focus entirely on the present moment (Now)."],
        hinglish: ["Ek diary lein aur apne saare thoughts usme likh daalein.", "Identify karein ki kya aapke control mein hai aur kya nahi.", "Jo control mein nahi hai, uski chinta chhodne ki koshish karein.", "Khud ko kisi physical activity ya chhote kaam mein busy karein.", "Sirf aaj aur abhi (Present) par focus karein."]
      }
    },
    {
      id: 5,
      icon: "💪",
      title: { hindi: "मांसपेशियों को आराम (PMR)", english: "Progressive Muscle Relaxation", hinglish: "Body Muscle Relaxation" },
      desc: { hindi: "शरीर के तनाव और थकावट को दूर करने की वैज्ञानिक तकनीक।", english: "A scientific technique to release physical tension and fatigue.", hinglish: "Body ki tension aur thakawat door karne ki scientific technique." },
      steps: {
        hindi: ["आरामदायक स्थिति में लेट जाएं।", "अपने पैरों की उंगलियों को 5 सेकंड के लिए कस लें, फिर ढीला छोड़ें।", "धीरे-धीरे शरीर के ऊपरी हिस्से (पैरों, पेट, हाथों) की ओर बढ़ें।", "हर हिस्से को 5 सेकंड कसें और फिर रिलैक्स करें।", "अंत में चेहरे की मांसपेशियों को सिकोड़ें और ढीला छोड़ दें।"],
        english: ["Lie down in a comfortable position.", "Tense your toes tightly for 5 seconds, then release.", "Slowly move up your body (legs, stomach, hands).", "Tense each muscle group for 5 seconds and then relax.", "Finally, scrunch your facial muscles and let them go loose."],
        hinglish: ["Ek comfortable position mein let jayein.", "Apne pairo ki ungliyo ko 5 second ke liye tight karein, fir dheela chhodein.", "Dheere-dheere body ke upar (legs, stomach, arms) ki taraf badhein.", "Har part ko 5 second tight karein aur fir completely relax karein.", "End mein face muscles ko tight karke dheela chhod dein."]
      }
    }
  ];

  // 5 PODCASTS WITH YOUTUBE LINKS
  const podcasts = [
    {
      id: 101, // Different ID series
      icon: "🎧",
      title: { hindi: "10 मिनट का सुबह का ध्यान", english: "10 Min Morning Meditation", hinglish: "10 Min Morning Meditation" },
      desc: { hindi: "दिन की शुरुआत सकारात्मक ऊर्जा के साथ करें।", english: "Start your day with positive energy.", hinglish: "Din ki shuruwat positive energy ke sath karein." },
      link: "https://www.youtube.com/watch?v=ZToicYcHIOU"
    },
    {
      id: 102,
      icon: "😌",
      title: { hindi: "चिंता मुक्त (Anxiety Relief) ऑडियो", english: "Anxiety Relief Audio", hinglish: "Anxiety Relief Audio" },
      desc: { hindi: "जब घबराहट महसूस हो, तब इसे सुनें।", english: "Listen to this when feeling anxious.", hinglish: "Jab ghabrahat feel ho, tab isko sunein." },
      link: "https://www.youtube.com/watch?v=O-6f5wQXSu8"
    },
    {
      id: 103,
      icon: "🌙",
      title: { hindi: "स्लीप स्टोरी: शांत जंगल", english: "Sleep Story: The Quiet Forest", hinglish: "Sleep Story: Shaant Jungle" },
      desc: { hindi: "सुकून भरी नींद सुलाने के लिए कहानी।", english: "A relaxing story for a peaceful sleep.", hinglish: "Sukoon bhari neend ke liye relaxing kahani." },
      link: "https://www.youtube.com/watch?v=Wsy2L9VvX90"
    },
    {
      id: 104,
      icon: "✨",
      title: { hindi: "सकारात्मक विचार (Affirmations)", english: "Daily Positive Affirmations", hinglish: "Daily Positive Affirmations" },
      desc: { hindi: "आत्मविश्वास को बढ़ाने के लिए शक्तिशाली विचार।", english: "Powerful phrases to boost self-confidence.", hinglish: "Self-confidence badhane ke liye powerful thoughts." },
      link: "https://www.youtube.com/watch?v=Zssjem3EkMc"
    },
    {
      id: 105,
      icon: "🎵",
      title: { hindi: "एकाग्रता (Focus) के लिए संगीत", english: "Deep Focus Binaural Beats", hinglish: "Deep Focus Music" },
      desc: { hindi: "पढ़ाई या काम करते समय ध्यान केंद्रित करने के लिए।", english: "Background music to help you concentrate.", hinglish: "Padhai ya kaam karte waqt focus karne ke liye music." },
      link: "https://www.youtube.com/watch?v=WPni755-Krg"
    }
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleOpenLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const currentData = activeTab === 'exercises' ? exercises : podcasts;

  return (
    <div style={{ padding: '20px', backgroundColor: '#F7F9FC', minHeight: '100vh', fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginTop: '10px' }}>
          <button onClick={() => navigate('/chat')} style={{ background: 'none', border: 'none', fontSize: '24px', color: '#5B8DEF', cursor: 'pointer' }}>
            ←
          </button>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#2E3A45', fontFamily: 'Poppins, sans-serif' }}>
              {t.title}
            </h1>
            <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '13px' }}>
              {t.subtitle}
            </p>
          </div>
          <div style={{ width: '24px' }}></div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', backgroundColor: '#E2E8F0', borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
          <button
            onClick={() => { setActiveTab('exercises'); setExpandedId(null); }}
            style={{
              flex: 1, padding: '10px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer',
              backgroundColor: activeTab === 'exercises' ? 'white' : 'transparent',
              color: activeTab === 'exercises' ? '#5B8DEF' : '#4A5568',
              boxShadow: activeTab === 'exercises' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.3s ease', fontFamily: 'Poppins, sans-serif'
            }}
          >
            {t.tabExercises}
          </button>
          <button
            onClick={() => { setActiveTab('podcasts'); setExpandedId(null); }}
            style={{
              flex: 1, padding: '10px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer',
              backgroundColor: activeTab === 'podcasts' ? 'white' : 'transparent',
              color: activeTab === 'podcasts' ? '#5B8DEF' : '#4A5568',
              boxShadow: activeTab === 'podcasts' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.3s ease', fontFamily: 'Poppins, sans-serif'
            }}
          >
            {t.tabPodcasts}
          </button>
        </div>

        {/* Content List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <AnimatePresence mode="wait">
            {currentData.map((item, index) => (
              <motion.div
                key={`${activeTab}-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                style={{ 
                  backgroundColor: 'white', padding: '20px', borderRadius: '16px', 
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ fontSize: '32px', backgroundColor: '#F0F4F8', padding: '12px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 6px 0', color: '#2E3A45', fontSize: '16px', fontWeight: '700', fontFamily: 'Poppins, sans-serif' }}>
                      {item.title[currentLang]}
                    </h3>
                    <p style={{ margin: '0 0 12px 0', fontSize: '13.5px', color: '#666', lineHeight: '1.5' }}>
                      {item.desc[currentLang]}
                    </p>
                  </div>
                </div>

                {/* Exercises Steps Logic */}
                {activeTab === 'exercises' && (
                  <>
                    <AnimatePresence>
                      {expandedId === item.id && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                          <div style={{ backgroundColor: '#F7F9FC', padding: '16px', borderRadius: '12px', marginTop: '4px' }}>
                            <ol style={{ margin: 0, paddingLeft: '20px', color: '#4A5568', fontSize: '14px', lineHeight: '1.8' }}>
                              {item.steps[currentLang].map((step, i) => (
                                <li key={i} style={{ marginBottom: '6px' }}>{step}</li>
                              ))}
                            </ol>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <button 
                      onClick={() => toggleExpand(item.id)} 
                      style={{ 
                        width: '100%', padding: '12px', borderRadius: '12px', border: 'none', 
                        backgroundColor: expandedId === item.id ? '#EDF2F7' : '#5B8DEF', 
                        color: expandedId === item.id ? '#4A5568' : 'white', 
                        fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s ease',
                        boxShadow: expandedId === item.id ? 'none' : '0 4px 10px rgba(91, 141, 239, 0.3)'
                      }}
                    >
                      {expandedId === item.id ? t.readLess : t.readMore}
                    </button>
                  </>
                )}

                {/* Podcast Link Logic */}
                {activeTab === 'podcasts' && (
                  <button 
                    onClick={() => handleOpenLink(item.link)} 
                    style={{ 
                      width: '100%', padding: '12px', borderRadius: '12px', border: 'none', 
                      backgroundColor: '#FF0000', color: 'white', fontWeight: '700', 
                      cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
                      boxShadow: '0 4px 10px rgba(255, 0, 0, 0.2)'
                    }}
                  >
                    {t.listenBtn}
                  </button>
                )}

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
      </div>
    </div>
  );
}