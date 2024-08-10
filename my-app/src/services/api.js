// C:\Users\Mor\Desktop\last\my-app\src\services\api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002', // Directly set the API base URL here
});

export const getAllUsers = async () => {
  return await api.get('/users');
};

export const createUser = async (userData) => {
  return await api.post('/users', userData);
};

export const updateUserBalance = async (id, balance) => {
  return await api.put(`/users/${id}/balance`, { balance });
};

export const getAllVouchers = async () => {
  try {
    const response = await api.get('/vouchers');
    return response;
  } catch (error) {
    console.error('Error fetching vouchers:', error);
    throw error;
  }
};

export const createVoucher = async (voucherData) => {
  return await api.post('/vouchers', voucherData);
};

export const updateVoucher = async (id, amount, cost, company) => {
  return await api.put(`/vouchers/${id}`, { amount, cost, company });
};

export const deleteVoucher = async (id) => {
  try {
    await axios.delete(`http://localhost:3002/vouchers/${id}`);
  } catch (error) {
    throw error;
  }
};



export const getPurchasedVouchers = async (userId) => {
  try {
    const response = await api.get(`/purchases/${userId}`);
    return response;
  } catch (error) {
    console.error('Error fetching purchased vouchers:', error);
    throw error;
  }
};

// Add this function to fetch user data by ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};
export const purchaseVoucher = async (userId, voucherId) => {
  try {
    const response = await api.post('/purchase', { userId, voucherId });
    return response;
  } catch (error) {
    console.error('Error purchasing voucher:', error);
    throw error;
  }
};
