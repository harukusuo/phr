import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import PetCard from './PetCard';
import '../styles/Achados.css';

const Achados = ({ user, token }) => {
    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch('/api/pets/found');
                const data = await response.json();
                setPets(data);
            } catch (error) {
                console.error('Erro ao buscar pets encontrados:', error);
            }
        };

        fetchPets();
    }, []);

    const handleClaimClick = async (pet) => {
        if (!token) {
            console.error('Token não fornecido');
            return;
        }
        const message = `Olá, eu sou o dono do pet ${pet.name || 'encontrado'}. Por favor, entre em contato comigo.`;
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
        <div className="achados-container">
            <Header text="Animais Encontrados" hasBackButton={true} />

            <div className="pets-grid">
                {pets.map((pet, index) => (
                    <PetCard
                        key={index}
                        pet={pet}
                        type="found"
                        onActionClick={handleClaimClick}
                        showDetails={true}
                        user={user}
                        token={token}
                    />
                ))}
            </div>
        </div>
    );
};

export default Achados;
