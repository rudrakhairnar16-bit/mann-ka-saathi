import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Community() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Pre-defined groups
  const [forums, setForums] = useState([
    { id: 1, title: language === 'hindi' ? 'चिंता समर्थन (Anxiety)' : 'Anxiety Support', members: '1.2k', icon: '🫂' },
    { id: 2, title: language === 'hindi' ? 'तनाव प्रबंधन (Stress)' : 'Stress Management', members: '850', icon: '🧘‍♀️' },
    { id: 3, title: language === 'hindi' ? 'सकारात्मक सोच' : 'Positive Thinking', members: '2.1k', icon: '✨' }
  ]);

  // New Group States
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newGroup = {
      id: Date.now(),
      title: newTitle,
      members: '1',
      icon: '💬'
    };

    setForums([newGroup, ...forums]);
    setNewTitle('');
    setShowForm(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', padding: '20px', fontFamily: 'Nunito, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={() => navigate(-1)} style={{ border: 'none', background: 'white', padding: '10px 15px', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>←</button>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#2E3A45', margin: 0, fontFamily: 'Poppins, sans-serif' }}>
            {language === 'hindi' ? 'कम्युनिटी सपोर्ट' : 'Community Support'} 🌍
          </h1>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          style={{ backgroundColor: '#5B8DEF', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}
        >
          {showForm ? 'Cancel' : '+ New Group'}
        </button>
      </div>

      {/* Create Group Form */}
      {showForm && (
        <motion.form 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          onSubmit={handleCreateGroup}
          style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px', marginBottom: '25px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', display: 'flex', gap: '10px' }}
        >
          <input 
            type="text" 
            placeholder="Enter group name/topic..." 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '2px solid #E5E7EB', outline: 'none' }}
          />
          <button type="submit" style={{ backgroundColor: '#7CBF9E', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Create</button>
        </motion.form>
      )}

      {/* Forums List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {forums.map((forum, index) => (
          <motion.div key={forum.id} style={{ backgroundColor: 'white', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '26px', backgroundColor: '#F0F4F8', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>{forum.icon}</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#2E3A45', fontWeight: '700' }}>{forum.title}</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#888' }}>{forum.members} members</p>
            </div>
            <button style={{ backgroundColor: '#7CBF9E', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '20px', fontWeight: '700', cursor: 'pointer' }}>Join</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}