import React, { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ padding: '20px', border: '2px solid #333', borderRadius: '8px', marginBottom: '20px' }}>
      <h1>3. Event Handling: Search Bar</h1>
      <input 
        type="text" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} 
        placeholder="Search for items..." 
        style={{ padding: '10px', width: '100%', maxWidth: '300px', fontSize: '16px', marginBottom: '15px' }}
      />
      <div style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        <strong>SEARCHING FOR: </strong>
        <span style={{ color: 'blue' }}>{searchQuery.toUpperCase()}</span>
      </div>
    </div>
  );
};

export default SearchBar;
