import React, { useState, useEffect, useCallback } from 'react';
import { getAllVouchers, purchaseVoucher, getUserById } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const PurchasePage = () => {
  const [vouchers, setVouchers] = useState([]);
  const [userId, setUserId] = useState('');
  const [balance, setBalance] = useState(0);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    }
    return null;
  };

  const fetchVouchers = useCallback(async () => {
    try {
      const response = await getAllVouchers();
      setVouchers(response.data);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
    }
  }, []);

  const fetchUserBalance = useCallback(async () => {
    try {
      const response = await getUserById(userId);
      setBalance(response.data.balance || 0);
    } catch (error) {
      console.error('Error fetching user balance:', error);
    }
  }, [userId]);

  useEffect(() => {
    const id = getUserIdFromToken();
    if (id) {
      setUserId(id);
      fetchUserBalance();
    }
    fetchVouchers();
  }, [fetchVouchers, fetchUserBalance]);

  const handlePurchase = async (voucherId) => {
    try {
      const response = await purchaseVoucher(userId, voucherId);
      setBalance(prevBalance => prevBalance - response.data.voucherCost);
      // Optionally update UI or show a success message
    } catch (error) {
      console.error('Error purchasing voucher:', error);
    }
  };

  return (
    <div>
      <h1>Purchase Vouchers</h1>
      <p>Current Balance: ${balance}</p>

      <div>
        <h2>Available Vouchers</h2>
        <ul>
          {vouchers.map((voucher) => (
            <li key={voucher._id}>
              {voucher.company} - {voucher.amount} units @ ${voucher.cost} each
              <button onClick={() => handlePurchase(voucher._id)}>Purchase</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PurchasePage;
