import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VoucherManagementPage from './pages/VoucherManagementPage';
import UserManagementPage from './pages/UserManagementPage';
import PurchasePage from './pages/PurchasePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import UserListPage from './pages/UserListPage';
import UsersPage from './pages/UsersPage';
import Navbar from './components/Navbar'; // Import the Navbar component

function App() {
  return (
    <Router>
      <Navbar /> {/* Include the Navbar */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vouchers" element={<VoucherManagementPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/userlist" element={<UserListPage />} />
        <Route path="/userspage" element={<UsersPage />} />
        <Route path="/voucher-management" element={<VoucherManagementPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
