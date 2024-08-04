import React from 'react';
import './ChatMessage.css'; // Ensure the CSS file is imported

function ChatMessage({ message }) {
  console.log('ChatMessage props:', message); // Log message props
  if (!message) {
    return null; // If message is undefined or null, return nothing
  }

  return (
    <div className={`chat-message ${message.type}`}>
      <p className="chat-message-text">
        <strong>{message.user}:</strong> {message.text}
      </p>
    </div>
  );
}

export default ChatMessage;

