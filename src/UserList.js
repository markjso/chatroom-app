import React from 'react';

function UserList({ users }) {
  return (
    <div className="user-list">
      <h3>Users</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
