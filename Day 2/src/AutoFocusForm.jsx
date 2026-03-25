import React, { useRef, useEffect } from 'react';

const AutoFocusForm = () => {
  const firstInputRef = useRef(null);

  // useEffect with an empty dependency array [] runs exactly once when the component initially mounts
  useEffect(() => {
    firstInputRef.current.focus();
  }, []);

  return (
    <div style={{ padding: '20px', border: '2px solid #333', borderRadius: '8px', marginBottom: '20px' }}>
      <h1>6. useRef: Auto-Focus Form</h1>
      <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>First Name (Auto-focused)</label>
          <input 
            ref={firstInputRef} 
            type="text" 
            placeholder="I focus instantly upon page load!" 
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Last Name</label>
          <input 
            type="text" 
            placeholder="I am just a normal input." 
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>
      </form>
    </div>
  );
};

export default AutoFocusForm;
