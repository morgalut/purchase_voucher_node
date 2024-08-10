import React, { useState, useEffect } from 'react';
import { getAllVouchers, getPurchasedVouchers } from '../services/api';

const ProfilePage = () => {
  const [vouchers, setVouchers] = useState([]);
  const [purchasedVouchers, setPurchasedVouchers] = useState([]);
  const [userId] = useState(''); // Set this dynamically or from authentication

  useEffect(() => {
    fetchVouchers();
    fetchPurchasedVouchers(userId);
  }, [userId]);

  const fetchVouchers = async () => {
    const response = await getAllVouchers();
    setVouchers(response.data);
  };

  const fetchPurchasedVouchers = async (id) => {
    const response = await getPurchasedVouchers(id);
    setPurchasedVouchers(response.data);
  };

  return (
    <div>
      <h1>Profile</h1>

      <div>
        <h2>Available Vouchers</h2>
        <ul>
          {vouchers.map((voucher) => (
            <li key={voucher._id}>
              {voucher.company} - {voucher.amount} units @ ${voucher.cost} each
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Your Purchased Vouchers</h2>
        <ul>
          {purchasedVouchers.map((pv) => (
            <li key={pv._id}>
              {pv.voucherId.company} - {pv.voucherId.amount} units
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
