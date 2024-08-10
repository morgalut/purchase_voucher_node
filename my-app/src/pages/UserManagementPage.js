import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUserBalance } from '../services/api';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getAllUsers();
    setUsers(response.data);
  };

  const handleUpdateBalance = async (id) => {
    await updateUserBalance(id, editingUser.balance);
    fetchUsers();
    setEditingUser(null);
  };

  return (
    <div>
      <h1>User Management</h1>

      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - Balance: ${user.balance}
            <button onClick={() => setEditingUser(user)}>Edit Balance</button>
          </li>
        ))}
      </ul>

      {editingUser && (
        <div>
          <h2>Edit User Balance</h2>
          <input
            type="number"
            placeholder="Balance"
            value={editingUser.balance}
            onChange={(e) => setEditingUser({ ...editingUser, balance: e.target.value })}
          />
          <button onClick={() => handleUpdateBalance(editingUser._id)}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
