import React from 'react';
import UserProfile from './UserProfile';

const Dashboard = () => {
  return (
    <div style={{ padding: '20px', border: '2px solid #333', borderRadius: '8px', marginBottom: '20px' }}>
      <h1>1. Functional Components & Props: Dashboard</h1>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {/* Passes True for Admin */}
        <UserProfile username="Alice" age={28} isAdmin={true} />
        
        {/* Relies on the default value (false) for isAdmin */}
        <UserProfile username="Bob" age={34} />
        
        {/* Explicitly passes false */}
        <UserProfile username="Charlie" age={22} isAdmin={false} />
      </div>
    </div>
  );
};

export default Dashboard;
