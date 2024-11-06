import React from 'react';
import '../styles/PetCard.css';

const PetCard = ({ pet, type, onActionClick, showDetails, user, token }) => {
    const isLost = type === 'perdido';
    const buttonText = isLost ? 'Encontrei!' : 'É meu!';

    const handleClick = async () => {
        const message = isLost
            ? `Olá, eu encontrei o pet ${pet.name || 'perdido'}. Por favor, entre em contato comigo.`
            : `Olá, eu sou o dono do pet ${pet.name || 'encontrado'}. Por favor, entre em contato comigo.`;

        try {
            const response = await fetch(`/api/users/messages/to/${pet.user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    text: message,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao enviar mensagem');
            }

            console.log(`Mensagem enviada para o anunciante do pet ${pet.name}`);
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    };

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
                <button className="pet-action-button" onClick={handleClick}>
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default PetCard;
