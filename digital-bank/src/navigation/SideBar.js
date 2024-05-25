import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Sidebar = ({ isAuthenticated, handleLogout }) => {
  const user = useSelector((state) => state.auth.user);
  const profile = user.profile;
  const logout = () => {
    handleLogout();
    window.location.href = '/';    
  };

  return (
    <div className="sidebar">
      <nav>
        <ul>
          {profile === 'admin' && 
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          }
          <li>
            <Link to="/accounts/">Mis cuentas</Link>
          </li>
          <li>
            <Link to="/profile">Perfil ({user.name})</Link>
          </li>
          <li>
            <Link onClick={logout}>Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;