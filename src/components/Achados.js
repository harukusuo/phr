import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../styles/Achados.css';

const Achados = () => {
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
        const message = `Olá, eu sou o dono do pet ${pet.name || 'encontrado'}. Por favor, entre em contato comigo.`;
        try {
            await fetch('/api/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: `${pet.user.name} ${pet.user.surname}`,
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
                {pets.map((pet, index) => (
                    <div key={index} className="pet-card">
                        <img src={pet.picture} alt={pet.name} className="pet-image" />
                        <div className="pet-info">
                            <h3>{pet.name} - {pet.type}</h3>
                            <p><strong>Descrição:</strong> {pet.description}</p>
                            <p><strong>Local:</strong> {pet.location}, {pet.city}</p>
                            <p><strong>Anunciante:</strong> {pet.user.name} {pet.user.surname}</p>
                        </div>
                        <button className="claim-button" onClick={() => handleClaimClick(pet)}>É meu!</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achados;
