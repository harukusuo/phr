import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles//SideBar.css';

const SideBar = ({ user }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sideBar">
      <h1 className="sideBar-title">Olá, {user.name}!</h1>
      <nav className="sideBar-nav">
        <button onClick={() => handleNavigation('/homepage')}>Home</button>
        <button onClick={() => handleNavigation('/search')}>Buscar</button>
        <button onClick={() => handleNavigation('/pets')}>Pets</button>
        <button onClick={() => handleNavigation('/chats')}>Chats</button>
        <button onClick={() => handleNavigation(`/profile/${user._id}`)}>Meu Perfil</button>
        <button className="logout-button" onClick={() => handleNavigation('/')}>Sair</button>
      </nav>
    </div>
  );
};

export default SideBar;
