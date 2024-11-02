import React from 'react';
import '../styles/PetCardProfile.css';

const PetCardProfile = ({ pet, type, onActionClick }) => {
    const isLost = type === 'perdido';
    const buttonText = isLost ? 'Encontrei!' : 'É meu!';

    return (
        <div className="pet-card-profile">
            <div className="pet-image-container-profile">
                <img src={pet.picture} alt={pet.name} className="pet-image-profile" />
            </div>
            <div className="pet-info-profile">
                <h3>{pet.name} - {pet.type}</h3>
                <p><strong>Local:</strong> {pet.location}, {pet.city}</p>
            </div>
            {onActionClick && (
                <button className="pet-action-button-profile" onClick={() => onActionClick(pet)}>
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default PetCardProfile;
