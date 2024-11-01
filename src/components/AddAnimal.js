import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddAnimal.css';
import Header from './Header';
import fakeUser from '../mock/user.json';
import addPic from '../assets/add_pic.png';

const AddAnimal = () => {
  const navigate = useNavigate();
  const [user] = useState(fakeUser);

  const [animalData, setAnimalData] = useState({
    name: '',
    type: 'cão',
    descricao: '',
    city: '',
    local: '',
    status: 'Encontrado',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnimalData({ ...animalData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do animal:', animalData);
    if (animalData.status === 'Encontrado') {
      navigate(`/Achados`);
    } else {
      navigate(`/Perdidos`);
    }
  };

  return (
    <>
      <Header text="Adicionar Animal" hasBackButton={true} />
      <br></br>
      <div className="add-animal-container">
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
              placeholder="Descreva o animal (cor, raça, porte, etc)"
            />

            <label htmlFor="city">Cidade</label>
            <input
              type="text"
              id="city"
              name="city"
              value={animalData.city}
              onChange={handleInputChange}
              placeholder="Cidade onde foi visto"
            />

            <label htmlFor="local">Localização</label>
            <input
              type="text"
              id="local"
              name="local"
              value={animalData.local}
              onChange={handleInputChange}
              placeholder="Ponto de referência"
            />

            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={animalData.status}
              onChange={handleInputChange}
            >
              <option value="Encontrado">Encontrado</option>
              <option value="Perdido">Perdido</option>
            </select>

            <label htmlFor="photo">Foto do Animal</label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleInputChange}
            />

            <button type="submit" className="submit-button">Salvar Animal</button>
          </form>
        </div>
      </div>
      <img src={addPic} alt="Imagem ilustrativa de animais" className="add-animal-pic" />
    </>
  );
};

export default AddAnimal;
