import React from 'react';
import '../styles/PetCard.css';

const PetCard = ({ pet, type, onActionClick, showDetails }) => {
    const isLost = type === 'perdido';
    const buttonText = isLost ? 'Encontrei!' : 'É meu!';

    return (
        <div className="pet-card">
            <div className="pet-image-container">
                <img src={pet.picture} alt={pet.name} className="pet-image" />
            </div>
            <div className="pet-info">
                <h3>{pet.name} - {pet.type}</h3>
                <p><strong>Local:</strong> {pet.location}, {pet.city}</p>
                {showDetails && (
                    <>
                        <p><strong>Descrição:</strong> {pet.description}</p>
                        <p><strong>Anunciante:</strong> {pet.user.name} {pet.user.surname}</p>
                    </>
                )}
            </div>
            {onActionClick && (
                <button className="pet-action-button" onClick={() => onActionClick(pet)}>
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default PetCard;
