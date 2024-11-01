import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddAnimal.css';
import Header from './Header';
import fakeUser from '../mock/user.json';
import addPic from '../assets/add_pic.png';

const AddAnimal = ({user}) => {
  const navigate = useNavigate();

  const [animalData, setAnimalData] = useState({
    name: '',
    type: 'cão',
    descricao: '',
    city: '',
    local: '',
    status: 'Encontrado',
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnimalData({ ...animalData, [name]: value });
  };

  const handleFileChange = (e) => {
    setAnimalData({ ...animalData, photo: e.target.files[0] });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos obrigatórios
    if (!animalData.type || !animalData.descricao || !animalData.city || !animalData.local || !animalData.status || !animalData.photo) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const base64Photo = await convertToBase64(animalData.photo);

      const formData = {
        name: animalData.name,
        type: animalData.type.toLowerCase(),
        description: animalData.descricao,
        city: animalData.city,
        location: animalData.local,
        status: animalData.status.toLowerCase(),
        picture: base64Photo,
        user: user._id,
      };

      // Log dos dados para depuração
      console.log('Dados enviados:', formData);

      const token = localStorage.getItem('token');
      const response = await axios.post('/api/pets', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Pet adicionado:', response.data);
      if (animalData.status === 'Encontrado') {
        navigate(`/Achados`);
      } else {
        navigate(`/Perdidos`);
      }
    } catch (error) {
      console.error('Erro ao adicionar pet:', error.response ? error.response.data : error.message);
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
              onChange={handleFileChange}
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
