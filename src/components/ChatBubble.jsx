import { motion } from 'framer-motion';

export default function ChatBubble({ message, sender, timestamp }) {
  const isBot = sender === 'bot';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        marginBottom: '16px',
        width: '100%'
      }}
    >
      <div style={{
        maxWidth: '80%',
        backgroundColor: isBot ? '#5B8DEF' : '#7CBF9E',
        color: 'white',
        padding: '14px 18px',
        borderRadius: isBot ? '20px 20px 20px 6px' : '20px 20px 6px 20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        position: 'relative'
      }}>
        {/* Sender Label */}
        <div style={{
          fontSize: '11px',
          opacity: 0.8,
          marginBottom: '4px',
          fontWeight: '600'
        }}>
          {isBot ? '🤖 Saathi' : '👤 You'}
        </div>
        
        {/* Message */}
        <p style={{
          margin: 0,
          fontSize: '15px',
          lineHeight: '1.5',
          fontFamily: 'Nunito, sans-serif'
        }}>
          {message}
        </p>
        
        {/* Time */}
        <div style={{
          fontSize: '10px',
          opacity: 0.7,
          marginTop: '6px',
          textAlign: 'right'
        }}>
          {timestamp}
        </div>
      </div>
    </motion.div>
  );
}