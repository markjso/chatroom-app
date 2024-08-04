import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to the Chatroom App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/chat">Go to Chat Room</Link>
          </li>
          <li>
            <Link to="/profile">Go to User Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
