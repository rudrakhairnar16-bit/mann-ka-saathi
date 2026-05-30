import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Journal() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const currentLang = language || 'english';

  // MULTILINGUAL UI TEXT
  const uiText = {
    hindi: {
      title: 'निजी डायरी ✍️',
      subtitle: 'आपके विचार सुरक्षित हैं। सिर्फ आप इन्हें पढ़ सकते हैं।',
      newEntryBtn: '+ नई एंट्री',
      cancelBtn: 'रद्द करें',
      titlePlaceholder: 'आज का शीर्षक...',
      contentPlaceholder: 'आज आप कैसा महसूस कर रहे हैं? सब लिख डालें...',
      saveBtn: 'सुरक्षित करें',
      noEntries: 'अभी कोई एंट्री नहीं है। अपनी पहली डायरी लिखें!',
      readBtn: 'पढ़ें',
      hideBtn: 'छुपाएं',
      deleteBtn: 'डिलीट',
      deleteConfirm: 'क्या आप सच में इस एंट्री को डिलीट करना चाहते हैं?'
    },
    english: {
      title: 'Private Journal ✍️',
      subtitle: 'Your thoughts are safe. Only you can read them.',
      newEntryBtn: '+ New Entry',
      cancelBtn: 'Cancel',
      titlePlaceholder: 'Title for today...',
      contentPlaceholder: 'How are you feeling today? Write it all out...',
      saveBtn: 'Save Entry',
      noEntries: 'No entries yet. Write your first journal entry!',
      readBtn: 'Read',
      hideBtn: 'Hide',
      deleteBtn: 'Delete',
      deleteConfirm: 'Are you sure you want to delete this entry?'
    },
    hinglish: {
      title: 'Private Journal ✍️',
      subtitle: 'Aapke thoughts safe hain. Sirf aap inhe padh sakte hain.',
      newEntryBtn: '+ New Entry',
      cancelBtn: 'Cancel',
      titlePlaceholder: 'Aaj ka title...',
      contentPlaceholder: 'Aaj aap kaisa feel kar rahe hain? Sab likh daalein...',
      saveBtn: 'Save Karein',
      noEntries: 'Abhi koi entry nahi hai. Apni pehli diary likhein!',
      readBtn: 'Padhein',
      hideBtn: 'Chupayein',
      deleteBtn: 'Delete',
      deleteConfirm: 'Kya aap sach mein is entry ko delete karna chahte hain?'
    }
  };

  const t = uiText[currentLang];

  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [entryTitle, setEntryTitle] = useState('');
  const [entryContent, setEntryContent] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  // Load Journal Entries from Local Storage
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('mannkasaathi_journal')) || [];
    setEntries(savedEntries);
  }, []);

  // Save New Entry
  const handleSaveEntry = () => {
    if (!entryTitle.trim() || !entryContent.trim()) return;

    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: entryTitle,
      content: entryContent
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('mannkasaathi_journal', JSON.stringify(updatedEntries));
    
    setEntryTitle('');
    setEntryContent('');
    setShowForm(false);
  };

  // Delete Entry
  const handleDeleteEntry = (id) => {
    if (window.confirm(t.deleteConfirm)) {
      const updatedEntries = entries.filter(entry => entry.id !== id);
      setEntries(updatedEntries);
      localStorage.setItem('mannkasaathi_journal', JSON.stringify(updatedEntries));
      if (expandedId === id) setExpandedId(null);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', padding: '20px', fontFamily: 'Nunito, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button onClick={() => navigate('/chat')} style={{ border: 'none', background: 'white', padding: '10px 15px', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', fontSize: '18px', color: '#5B8DEF' }}>
              ←
            </button>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#2E3A45', margin: 0, fontFamily: 'Poppins, sans-serif' }}>
                {t.title}
              </h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#718096' }}>
                🔒 {t.subtitle}
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setShowForm(!showForm)} 
            style={{ backgroundColor: showForm ? '#E53E3E' : '#5B8DEF', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: 'Nunito, sans-serif', transition: 'all 0.3s ease' }}
          >
            {showForm ? t.cancelBtn : t.newEntryBtn}
          </button>
        </div>

        {/* New Entry Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden', marginBottom: '30px' }}
            >
              <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input 
                  type="text" 
                  placeholder={t.titlePlaceholder}
                  value={entryTitle}
                  onChange={(e) => setEntryTitle(e.target.value)}
                  style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #EDF2F7', outline: 'none', fontSize: '16px', fontFamily: 'Poppins, sans-serif', fontWeight: '600', boxSizing: 'border-box' }}
                />
                <textarea 
                  placeholder={t.contentPlaceholder}
                  value={entryContent}
                  onChange={(e) => setEntryContent(e.target.value)}
                  style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #EDF2F7', outline: 'none', fontSize: '15px', fontFamily: 'Nunito, sans-serif', minHeight: '150px', resize: 'vertical', boxSizing: 'border-box', lineHeight: '1.6' }}
                />
                <button 
                  onClick={handleSaveEntry}
                  disabled={!entryTitle.trim() || !entryContent.trim()}
                  style={{ backgroundColor: (!entryTitle.trim() || !entryContent.trim()) ? '#CBD5E0' : '#7CBF9E', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: (!entryTitle.trim() || !entryContent.trim()) ? 'not-allowed' : 'pointer', fontSize: '16px', fontFamily: 'Poppins, sans-serif', transition: 'all 0.3s ease' }}
                >
                  {t.saveBtn}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Entries List */}
        {entries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: 'white', borderRadius: '24px', color: '#A0AEC0', fontSize: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            {t.noEntries}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <AnimatePresence>
              {entries.map((entry) => (
                <motion.div 
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '12px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, paddingRight: '10px' }}>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#2E3A45', fontWeight: '700', fontFamily: 'Poppins, sans-serif' }}>
                        {entry.title}
                      </h3>
                      <p style={{ margin: 0, fontSize: '12px', color: '#A0AEC0' }}>
                        {entry.date} • {entry.time}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => toggleExpand(entry.id)}
                        style={{ background: '#EDF2F7', border: 'none', color: '#4A5568', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                      >
                        {expandedId === entry.id ? t.hideBtn : t.readBtn}
                      </button>
                      <button 
                        onClick={() => handleDeleteEntry(entry.id)}
                        style={{ background: '#FFF5F5', border: 'none', color: '#E53E3E', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                      >
                        {t.deleteBtn}
                      </button>
                    </div>
                  </div>

                  {expandedId === entry.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ backgroundColor: '#F7F9FC', padding: '16px', borderRadius: '12px', marginTop: '8px', color: '#4A5568', fontSize: '15px', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                        {entry.content}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
}