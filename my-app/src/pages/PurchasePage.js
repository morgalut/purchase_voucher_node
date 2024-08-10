import React, { useState, useEffect } from 'react';
import { getAllVouchers, purchaseVoucher, getPurchasedVouchers } from '../services/api';

const PurchasePage = () => {
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
    console.log('Fetching purchased vouchers for userId:', id);
    const response = await getPurchasedVouchers(id);
    setPurchasedVouchers(response.data);
  };
  

  const handlePurchase = async (voucherId) => {
    await purchaseVoucher(userId, voucherId);
    fetchPurchasedVouchers(userId);
  };

  return (
    <div>
      <h1>Purchase Vouchers</h1>

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

export default PurchasePage;
