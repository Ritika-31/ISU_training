import React from 'react';
import Dashboard from './Dashboard';
import CounterApp from './CounterApp';
import SearchBar from './SearchBar';
import SecretMessage from './SecretMessage';
import TodoList from './TodoList';
import AutoFocusForm from './AutoFocusForm';

function App() {
  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '800px', margin: '0 auto', color: '#1a1a1a' }}>
      <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '50px' }}>📘 React Fundamentals: Homework</h1>
      
      <Dashboard />
      <CounterApp />
      <SearchBar />
      <SecretMessage />
      <TodoList />
      <AutoFocusForm />
      
    </div>
  );
}

export default App;
