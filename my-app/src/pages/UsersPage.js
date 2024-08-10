import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../services/api';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState(''); // State for filtering users
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting users

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Function to handle user filtering
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Function to handle user sorting
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Filter and sort users
  const filteredUsers = users
    .filter(user => user.username.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.username.localeCompare(b.username);
      } else {
        return b.username.localeCompare(a.username);
      }
    });

  return (
    <div>
      <h1>All Users</h1>

      {/* Filter and Sort Options */}
      <div>
        <label>
          Filter by username:
          <input type="text" value={filter} onChange={handleFilterChange} />
        </label>

        <label>
          Sort by username:
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      {/* Displaying users */}
      <ul>
        {filteredUsers.map(user => (
          <li key={user._id}>
            <div>
              <strong>Username:</strong> {user.username}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Balance:</strong> {user.balance ? user.balance : 'N/A'}
            </div>
            <div>
              <strong>User Type:</strong> {user.userType}
            </div>
            <div>
              <strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}
            </div>
            <div>
              <strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
