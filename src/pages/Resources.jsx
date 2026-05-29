import { useNavigate } from 'react-router-dom';

export default function Resources() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', backgroundColor: '#F7F9FC', minHeight: '100vh', fontFamily: 'Nunito, sans-serif' }}>
      <button onClick={() => navigate('/chat')} style={{ border: 'none', background: 'white', padding: '10px 15px', borderRadius: '12px', cursor: 'pointer', marginBottom: '20px' }}>← Back</button>
      
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#2E3A45', fontFamily: 'Poppins, sans-serif' }}>Self-Care Resources 📖</h1>
      <p style={{ color: '#888', marginBottom: '20px' }}>Apne mental well-being ke liye helpful articles aur tips padhein.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#5B8DEF' }}>5 Deep Breathing Exercises</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Stress aur anxiety ko kam karne ke aasan tarike...</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#5B8DEF' }}>How to manage Anxiety</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Overthinking ko rokne ke kuch practical steps...</p>
        </div>
      </div>
    </div>
  );
}