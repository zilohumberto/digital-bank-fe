import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import WelcomeScreenGeneral from '../screens/Welcome/WelcomeScreenGeneral';

const AuthNavigator = () => (
  <Routes>
    
    <Route path="/login" element={<LoginScreen/>} />
    <Route path="/signup" element={<SignupScreen/>} />
    <Route path="/"  element={<WelcomeScreenGeneral/>} />
  </Routes>
);

export default AuthNavigator;
