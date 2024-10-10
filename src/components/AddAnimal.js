import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddAnimal.css';
import Header from './Header';
import BottomBar from './BottomBar';
import fakeUser from '../mock/user.json';

const AddAnimal = () => {
  const navigate = useNavigate();
  const [user] = useState(fakeUser);

  const [animalData, setAnimalData] = useState({
    name: '',
    type: 'cão',
    descricao: '',
    city: '',
    local: '',
    status: 'Achado',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnimalData({ ...animalData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do animal:', animalData);
    if (animalData.status === 'Achado') {
      navigate(`/Achados`);
    } else {
      navigate(`/Perdidos`);
    }
  };

  return (
    <div className="add-animal-container">
      <Header text="Adicionar Animal" hasBackButton={true} />

      <div className="content">
        <form onSubmit={handleSubmit} className="add-animal-form">
          <label htmlFor="name">Nome do Animal</label>
          <input
            type="text"
            id="name"
            name="name"
            value={animalData.name}
            onChange={handleInputChange}
            placeholder="Nome (opcional)"
          />

          <label htmlFor="type">Tipo de Animal</label>
          <select
            id="type"
            name="type"
            value={animalData.type}
            onChange={handleInputChange}
          >
            <option value="cão">Cão</option>
            <option value="gato">Gato</option>
          </select>

          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            value={animalData.descricao}
            onChange={handleInputChange}
            placeholder="Descreva o animal"
          />

          <label htmlFor="city">Cidade</label>
          <input
            type="text"
            id="city"
            name="city"
            value={animalData.city}
            onChange={handleInputChange}
            placeholder="Cidade onde foi encontrado"
          />

          <label htmlFor="local">Localização</label>
          <input
            type="text"
            id="local"
            name="local"
            value={animalData.local}
            onChange={handleInputChange}
            placeholder="Local específico"
          />

          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={animalData.status}
            onChange={handleInputChange}
          >
            <option value="Achado">Achado</option>
            <option value="Perdido">Perdido</option>
          </select>

          <button type="submit" className="submit-button">Salvar Animal</button>
        </form>
      </div>

      <BottomBar user={user} />
    </div>
  );
};

export default AddAnimal;
