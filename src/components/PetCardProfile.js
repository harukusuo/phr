import React, { useState } from 'react';
import '../styles/PetCardProfile.css';
import Toast from './Toast';

const PetCardProfile = ({ pet, type, onActionClick, user, token, onDelete }) => {
    const isLost = type === 'perdido';
    const buttonText = user._id === pet.user._id ? 'Excluir pet' : (isLost ? 'Encontrei!' : 'É meu!');
    const [showDeleteMenu, setShowDeleteMenu] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showDeleteToast, setShowDeleteToast] = useState(false);

    const handleClick = async () => {
        if (user._id === pet.user._id) {
            handleDeleteClick();
            return;
        }
        if (!token) {
            console.error('Token não fornecido');
            return;
        }
        const message = isLost
            ? `Olá, eu encontrei o pet ${pet.name || 'perdido'}. Por favor, entre em contato comigo.`
            : `Olá, eu sou o dono do pet ${pet.name || 'encontrado'}. Por favor, entre em contato comigo.`;

        try {
            const response = await fetch(process.env.REACT_APP_API_BASE_URL + `/api/users/messages/to/${pet.user._id}`, {
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
            setShowToast(true);
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    };

    const handleDeleteClick = () => {
        if (onDelete) {
            onDelete(pet._id);
            setShowDeleteToast(true);
        }
    };

    return (
        <div className="pet-card-profile">
            <div className="pet-image-container-profile">
                <img src={pet.picture} alt={pet.name} className="pet-image-profile" />
            </div>
            <div className="pet-info-profile">
                <h3>{pet.name} - {pet.type}</h3>
                <p><strong>Local:</strong> {pet.location}, {pet.city}</p>
            </div>
            {user._id !== pet.user._id && onActionClick && (
                <button className="pet-action-button-profile" onClick={handleClick}>
                    {buttonText}
                </button>
            )}
            {user._id === pet.user._id && (
                <button className="pet-action-button-profile" onClick={handleDeleteClick}>
                    {buttonText}
                </button>
            )}
            {showToast && <Toast message="Mensagem enviada com sucesso!" onClose={() => setShowToast(false)} />}
            {showDeleteToast && <Toast message="Pet excluído com sucesso!" onClose={() => setShowDeleteToast(false)} />}
        </div>
    );
};

export default PetCardProfile;
