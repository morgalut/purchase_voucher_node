import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.PP_API_URL}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} ({user.username}) - {user.userType}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListPage;
