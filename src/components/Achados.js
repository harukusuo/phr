import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../styles/Achados.css';

import petsData from '../mock/found.json';

const Achados = ({ pets }) => {
    const handleClaimClick = async (pet) => {
      const message = `Olá, eu sou o dono do pet ${pet.name || 'encontrado'}. Por favor, entre em contato comigo.`;
      try {
        await fetch('/api/sendMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: `${pet.ownerName} ${pet.ownerSobrenome}`,
            message,
          }),
        });
        console.log(`Mensagem enviada para o anunciante do pet ${pet.name}`);
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    };

    return (
        <div className="achados-container">
            <Header text="Animais Encontrados" hasBackButton={true} />

            <div className="pets-grid">
                {petsData.map((pet, index) => (
                    <div key={index} className="pet-card">
                        <img src={pet.animalPicture} alt={pet.name} className="pet-image" />
                        <div className="pet-info">
                            <h3>{pet.name} - {pet.type}</h3>
                            <p><strong>Descrição:</strong> {pet.descricao}</p>
                            <p><strong>Local:</strong> {pet.local}, {pet.city}</p>
                            <p><strong>Anunciante:</strong> {pet.ownerName} {pet.ownerSobrenome}</p>
                        </div>
                        <button className="claim-button" onClick={() => handleClaimClick(pet)}>É meu!</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achados;
