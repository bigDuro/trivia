'use client';
import { useState } from 'react';
import { socket } from '@trivia/ws-utils';

export const Login = () => {
  const [userName, setUserName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleLogin = () => {
    // Emit an event to register the logged-in user
    setLoggedIn(true);
    socket.emit('registerUser', userName);
    console.log('Logged in as:', userName);
  };

  return (
    !loggedIn ?
      <div>
        <input
          type="text"
          value={userName}
          onChange={handleUserNameChange}
        />

        <button onClick={handleLogin}>
          Create User Name
        </button>
      </div> : 
      <>
        User Name: {userName}
      </>

  );
};

