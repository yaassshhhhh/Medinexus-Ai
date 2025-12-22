import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('aToken');
    setAToken('');
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 shadow">
      <div className="flex items-center gap-3">
        <img src={assets.admin_logo} alt="logo" className="h-10" />
        <p>{aToken ? 'Admin' : ''}</p>
      </div>

      {aToken && (
        <button onClick={logout} className="bg-primary text-white px-4 py-1 rounded">
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
