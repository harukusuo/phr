import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../styles/Perdidos.css';
import PetCard from './PetCard';

const Perdidos = ({ user, token }) => {
    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch('/api/pets/lost');
                const data = await response.json();
                setPets(data);
            } catch (error) {
                console.error('Erro ao buscar pets perdidos:', error);
            }
        };

        fetchPets();
    }, []);

    const handleFoundClick = async (pet) => {
        const message = `Olá, eu encontrei o pet ${pet.name || 'perdido'}. Por favor, entre em contato comigo.`;
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
        <div className="perdidos-container">
            <Header text="Animais Perdidos" hasBackButton={true} />

            <div className="pets-grid">
                {pets.map((pet, index) => (
                    <PetCard
                        key={index}
                        pet={pet}
                        type="lost"
                        onActionClick={handleFoundClick}
                        showDetails={true}
                        user={user}
                        token={token}
                    />
                ))}
            </div>
        </div>
    );
};

export default Perdidos;
