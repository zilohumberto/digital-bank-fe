import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import AccountScreen from '../screens/Account/AccountList';
import MovementsScreen from '../screens/Account/Movements';
import TransactionScreen from '../screens/Transfer/Transaction';
import Success from '../screens/Transfer/TransferSuccess';
import AccountCreateScreen from '../screens/Account/AccountCreate';
import Profile from '../screens/User/Profle';


const MainNavigator = () => (
  <Routes>
    <Route path="/dashboard" element={<DashboardScreen/>} />
    <Route path="/accounts" element={<AccountScreen/>} />
    <Route path="/movements" element={<MovementsScreen/>} />
    <Route path="/account/transaction" element={<TransactionScreen/>} />
    <Route path="/account/create" element={<AccountCreateScreen/>} />
    <Route path="/account/transaction/success" element={<Success/>} />
    <Route path="/profile" element={<Profile/>} />
    <Route path="/" element={<WelcomeScreen/>} />
  </Routes>
);

export default MainNavigator;
