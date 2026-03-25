import React from 'react';

const TodoList = () => {
  const initialTodos = [
    { id: 1, text: 'Review Functional Components' },
    { id: 2, text: 'Practice useState' },
    { id: 3, text: 'Study Event Handlers' },
    { id: 4, text: 'Learn Context API' }
  ];

  return (
    <div style={{ padding: '20px', border: '2px solid #333', borderRadius: '8px', marginBottom: '20px' }}>
      <h1>5. Lists & Keys: Todo List</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {initialTodos.map((todo) => (
          <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginBottom: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px', border: '1px solid #ddd' }}>
            <span>{todo.text}</span>
            <button style={{ padding: '5px 10px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
