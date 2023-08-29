'use client';
import React, { useEffect, useState } from 'react';
import { Login } from '@trivia/login';
import { socket } from '@trivia/ws-utils';

export const Profile = () => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Listen for 'connect' event from the server
    socket.on('connect', () => {
      setUserId(socket.id);
    });

    return () => {
      // Clean up the event listener when the component unmounts
      socket.off('connect');
    };
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      <p>User ID: {userId}</p>
      <Login/>
    </div>
  );
};
