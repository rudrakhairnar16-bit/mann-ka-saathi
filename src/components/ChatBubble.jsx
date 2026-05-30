import { motion } from 'framer-motion';

export default function ChatBubble({ message, sender, timestamp }) {
  const isBot = sender === 'bot';
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      whileHover={{ scale: 1.02 }}
      style={{ display: 'flex', justifyContent: isBot ? 'flex-start' : 'flex-end', marginBottom: '10px' }}
    >
      <div style={{ 
        maxWidth: '75%', padding: '12px', 
        backgroundColor: isBot ? '#3182CE' : '#2F855A', 
        color: 'white', 
        borderRadius: isBot ? '15px 15px 15px 0' : '15px 15px 0 15px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.2)' 
      }}>
        <div style={{ fontSize: '10px', opacity: 0.8 }}>{isBot ? '🫶 Saathi' : '😊 You'}</div>
        <p style={{ margin: '5px 0' }}>{message}</p>
        <div style={{ fontSize: '9px', textAlign: 'right', opacity: 0.7 }}>{timestamp}</div>
      </div>
    </motion.div>
  );
}