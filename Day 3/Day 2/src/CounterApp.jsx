import React, { useState } from 'react';

const CounterApp = () => {
  const [count, setCount] = useState(0);

  // Challenge logic: Prevent count from going below zero
  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #333', borderRadius: '8px', marginBottom: '20px' }}>
      <h1>2. useState: Counter App</h1>
      <h2>Current Count: {count}</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => setCount(count + 1)} style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>Increment</button>
        <button onClick={handleDecrement} style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>Decrement</button>
        <button onClick={() => setCount(0)} style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none' }}>Reset</button>
      </div>
    </div>
  );
};

export default CounterApp;
