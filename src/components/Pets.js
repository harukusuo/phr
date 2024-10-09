import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Pets.css';
import BottomBar from './BottomBar';
import Header from './Header';
import missingIcon from '../assets/perdido.png';
import foundIcon from '../assets/achado.png';
import fakeUser from '../mock/user.json'

const Pets = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(fakeUser);
  
  const handleMissingClick = () => {
    navigate(`/Perdidos`);
};

const handleFoundClick = () => {
  navigate(`/Achados`);
};

    return (
      <div className="pets-container">
        <Header text="Pets" hasBackButton={false} />

            

        <div className="content">
          <div className="buttons-pets">
          <div
                className={`petspage-missing-button`}
                onClick={() => {
                    handleMissingClick();
                }}
            >
              <img src={missingIcon} alt="Perdidos" />
            </div>

            <div
                className={`petspage-found-button`}
                onClick={() => {
                    handleFoundClick();
                }}
            >
              <img src={foundIcon} alt="Achados" />
            </div>
          </div>
        </div>
        
        <BottomBar user={user}/>
      </div>
    );
  }

export default Pets;