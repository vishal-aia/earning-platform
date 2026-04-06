// frontend/src/App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [balance, setBalance] = useState(0);

  const handleSpin = async () => {
    // API Call to Backend
    const response = await fetch('http://localhost:5000/api/spin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'USER_ID_HERE' })
    });
    const data = await response.json();
    setBalance(data.newBalance);
    alert(`You won: ₹${data.reward}`);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ background: '#4f46e5', color: 'white', padding: '10px', borderRadius: '10px' }}>
        <h1>Earning App</h1>
        <h2>Wallet: ₹{balance}</h2>
      </header>

      <div style={{ marginTop: '50px' }}>
        <button onClick={handleSpin} style={{ padding: '15px 30px', fontSize: '20px', borderRadius: '50px', border: 'none', background: 'gold', cursor: 'pointer' }}>
          🎡 Spin Wheel
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <p>Daily Task: Watch Video (Ads)</p>
        <button onClick={() => window.open('YOUR_ADSTERRA_LINK')}>Earn ₹0.50</button>
      </div>
    </div>
  );
}

export default App;
