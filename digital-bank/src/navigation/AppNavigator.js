import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import Sidebar from './SideBar';
import SidebarCommon from './SideBarCommon'
import { useSelector } from 'react-redux';

const AppNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      {isAuthenticated && <Sidebar isAuthenticated={isAuthenticated} handleLogout={() =>  console.log("logout") } /> }
      {!isAuthenticated && <SidebarCommon /> }
      <Routes>
        <Route path="*" element={isAuthenticated ? <MainNavigator /> : <AuthNavigator />} />
      </Routes>
    </Router>
  );
};

export default AppNavigator;
