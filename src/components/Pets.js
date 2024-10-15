import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Pets.css';
import BottomBar from './BottomBar';
import Header from './Header';
import missingIcon from '../assets/perdido.png';
import foundIcon from '../assets/achado.png';
import addIcon from '../assets/add.png';
import fakeUser from '../mock/user.json';

const Pets = () => {
  const navigate = useNavigate();
  const [user] = useState(fakeUser);

  const handleMissingClick = () => {
    navigate(`/Perdidos`);
  };

  const handleFoundClick = () => {
    navigate(`/Achados`);
  };

  const handleAddAnimalClick = () => {
    navigate(`/AddAnimal`);
  };

  return (
    <div className="pets-container">
      <Header text="Pets" hasBackButton={false} />

      <div className="content">
        <div className="buttons-container">
          <div className="buttons-pets">
            <div className="button">
              <div
                className="petspage-found-button"
                onClick={handleFoundClick}
              >
                <img src={foundIcon} alt="Achados" />
              </div>
              <p>Animais Encontrados</p>
            </div>

            <div className="button">
              <div
                className="petspage-missing-button"
                onClick={handleMissingClick}
              >
                <img src={missingIcon} alt="Perdidos" />
              </div>
              <p>Animais Perdidos</p>
            </div>

            <div className="button">
              <div className="add-animal-button" onClick={handleAddAnimalClick}>
                <img src={addIcon} alt="Adicionar Animal" />
              </div>
              <p>Adicionar Animal</p>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h3>Como Funciona?</h3>
          <p>
            • Animais Encontrados: Veja animais que foram encontrados por outras pessoas.
          </p>
          <p>
            • Animais Perdidos: Encontre animais que estão perdidos e ajude a reencontrar seus donos.
          </p>
          <p>
            • Adicionar Animal: Informe sobre um animal que você encontrou ou perdeu.
          </p>
        </div>
      </div>

      <BottomBar user={user} />
    </div>
  );
};

export default Pets;
