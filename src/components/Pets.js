import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Pets.css';
import BottomBar from './BottomBar';
import Header from './Header';
import missingIcon from '../assets/perdido.png';
import foundIcon from '../assets/achado.png';

const Pets = () => {
  
    return (
      <div className="pets-container">
        <Header text="Pets" hasBackButton={false} />

        <div className="content">
          <div className="buttons-pets">
            <button className="petspage-missing-button">
              <img src={missingIcon} alt="Perdidos" />
            </button>
            <button className="petspage-found-button">
              <img src={foundIcon} alt="Achados" />
            </button>
          </div>
        </div>
        
      <BottomBar></BottomBar>
      </div>
    );
  }

export default Pets;