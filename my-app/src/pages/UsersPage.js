// src/pages/UsersPage.js
import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../services/api';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
