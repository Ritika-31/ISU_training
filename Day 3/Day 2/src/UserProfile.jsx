import React from 'react';

const UserProfile = ({ username, age, isAdmin = false }) => {
  return (
    <div className="user-profile" style={{ border: '1px solid #ccc', margin: '10px', padding: '15px', borderRadius: '8px', minWidth: '150px' }}>
      <h2 style={{ marginTop: 0 }}>{username}</h2>
      <p>Age: {age}</p>
      {/* Conditionally render a badge if isAdmin is true */}
      {isAdmin && <span style={{ backgroundColor: 'gold', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px' }}>Admin Badge 🛡️</span>}
    </div>
  );
};

export default UserProfile;
