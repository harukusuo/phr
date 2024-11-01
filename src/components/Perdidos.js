import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../styles/Perdidos.css';

const Perdidos = () => {
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
        <div className="perdidos-container">
            <Header text="Animais Perdidos" hasBackButton={true} />

            <div className="pets-grid">
                {pets.map((pet, index) => (
                    <div key={index} className="pet-card">
                        <img src={pet.picture} alt={pet.name} className="pet-image" />
                        <div className="pet-info">
                            <h3>{pet.name} - {pet.type}</h3>
                            <p><strong>Descrição:</strong> {pet.description}</p>
                            <p><strong>Local:</strong> {pet.location}, {pet.city}</p>
                            <p><strong>Responsável:</strong> {pet.user.name} {pet.user.surname}</p>
                        </div>
                        <button className="found-button" onClick={() => handleFoundClick(pet)}>Encontrei!</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Perdidos;
