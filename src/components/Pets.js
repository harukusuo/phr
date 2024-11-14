import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Pets.css';
import Header from './Header';
import missingIcon from '../assets/perdido.png';
import foundIcon from '../assets/achado.png';
import addIcon from '../assets/add.png';
import fakeUser from '../mock/user.json';
import FAQModal from './FAQModal';

const Pets = () => {
  const navigate = useNavigate();
  const [user] = useState(fakeUser);
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

  const handleMissingClick = () => {
    navigate(`/Perdidos`);
  };

  const handleFoundClick = () => {
    navigate(`/Achados`);
  };

  const handleAddAnimalClick = () => {
    navigate(`/AddAnimal`);
  };

  const handleHelpClick = () => {
    setIsFAQModalOpen(true);
  };

  const handleFAQModalClose = () => {
    setIsFAQModalOpen(false);
  };

  return (
    <div className="pets-container">
      <Header text="Pets" hasBackButton={false} />
      <div className="pets-content">
        <div className="buttons-container">
          <div className="buttons-pets">
            <div className="pets-button">
              <div
                className="petspage-found-button"
                onClick={handleFoundClick}
              >
                <img src={foundIcon} alt="Achados" />
              </div>
              <p>Animais Encontrados</p>
            </div>

            <div className="pets-button">
              <div
                className="petspage-missing-button"
                onClick={handleMissingClick}
              >
                <img src={missingIcon} alt="Perdidos" />
              </div>
              <p>Animais Perdidos</p>
            </div>

            <div className="pets-button">
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
      <FAQModal isOpen={isFAQModalOpen} onClose={handleFAQModalClose} />
    </div>
  );
};

export default Pets;
