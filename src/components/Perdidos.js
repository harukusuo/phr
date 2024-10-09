import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../styles/Perdidos.css';

import petsData from '../mock/missing.json';

const Perdidos = () => {
    return (
        <div className="perdidos-container">
            <Header text="Animais Perdidos" hasBackButton={true} />

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
                        <button className="found-button">Encontrei!</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Perdidos;
