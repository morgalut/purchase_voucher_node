import React, { useState, useEffect, useCallback } from 'react';
import { getUserById, getPurchasedVouchers } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const ProfilePage = () => {
  const [userId, setUserId] = useState('');
  const [purchasedVouchers, setPurchasedVouchers] = useState([]);
  const [balance, setBalance] = useState(0);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    }
    return null;
  };

  const fetchUserData = useCallback(async () => {
    try {
      const id = getUserIdFromToken();
      if (id) {
        setUserId(id);
        const userResponse = await getUserById(id);
        setBalance(userResponse.data.balance || 0);

        const purchasesResponse = await getPurchasedVouchers(id);
        setPurchasedVouchers(purchasesResponse.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <div>
      <h1>User Profile</h1>
      <p>Balance: ${balance}</p>

      <div>
        <h2>Purchased Vouchers</h2>
        <ul>
          {purchasedVouchers.length > 0 ? (
            purchasedVouchers.map((purchase) => (
              <li key={purchase._id}>
                {purchase.voucherId.company} - {purchase.voucherId.amount} units @ ${purchase.voucherId.cost} each
              </li>
            ))
          ) : (
            <p>N/A</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
