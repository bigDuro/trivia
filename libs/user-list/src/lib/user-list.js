'use client';
import { useEffect, useState } from 'react';
import { socket } from '@trivia/ws-utils';

export const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Function to update the user list
    const updateUserList = (userList) => {
      setUsers(userList);
    };

    // Get the initial user list on component load
    // socket.emit('getUsers');

    // Listen for user updates from the server
    socket.on('userConnected', updateUserList);
    socket.on('userDisconnected', updateUserList);

    return () => {
      // Clean up the event listeners when the component unmounts
      socket.off('userConnected', updateUserList);
      socket.off('userDisconnected', updateUserList);
    };
  }, []);

  return (
    <div>
      <h2>Connected Users:</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.userName}</li>
        ))}
      </ul>
    </div>
  );
};
