import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ChatMessage from './ChatMessage';
import UserList from './UserList';
import './ChatRoom.css';

const socket = io('http://localhost:3000');

function ChatRoom() {
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem('messages')) || []
  );
  const [messageText, setMessageText] = useState('');
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([
    'User1',
    'User2',
    'User3', // Dummy users
    'User4',
  ]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('users', (usersList) => {
      setUsers(usersList);
    });

    return () => {
      socket.off('message');
      socket.off('users');
    };
  }, []);

  // const joinChatRoom = (userDetails) => {
  //   setUser(userDetails);
  //   socket.emit('join', userDetails);
  // };

  // const leaveChatRoom = () => {
  //   socket.emit('leave', user);
  //   setUser(null);
  // };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const message = { user, text: messageText };
      socket.emit('message', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessageText('');
    }
  };

  return (
    <div className="chat-room">
      <div className="message-list">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </div>
      <div className="user-list">
        <UserList users={users} />
      </div>
      <div className="message-input">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
