import React, { useState } from 'react';

const SecretMessage = () => {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div style={{ padding: '20px', border: '2px solid #333', borderRadius: '8px', marginBottom: '20px' }}>
      <h1>4. Conditional Rendering: Secret Message</h1>
      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '18px' }}>
        <input 
          type="checkbox" 
          checked={showSecret} 
          onChange={(e) => setShowSecret(e.target.checked)} 
          style={{ width: '20px', height: '20px', marginRight: '10px' }}
        />
        Reveal Secret Message
      </label>
      
      {/* Only renders this div if showSecret is true */}
      {showSecret && (
        <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#e0ffe0', border: '1px solid #00cc00', borderRadius: '5px' }}>
          🕵️‍♂️ <strong>Top Secret:</strong> React state makes adding interactivity very easy! 🤫
        </div>
      )}
    </div>
  );
};

export default SecretMessage;
