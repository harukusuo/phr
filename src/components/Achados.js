import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../styles/Achados.css';

import petsData from '../mock/found.json';

const Achados = () => {
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
                            <p><strong>Responsável:</strong> {pet.ownerName} {pet.ownerSobrenome}</p>
                        </div>
                        <button className="claim-button">É meu!</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achados;
