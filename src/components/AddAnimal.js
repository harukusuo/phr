import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddAnimal.css';
import Header from './Header';
import addPic from '../assets/add_pic.png';
import Toast from './Toast';

const AddAnimal = ({user}) => {
  const navigate = useNavigate();

  const [animalData, setAnimalData] = useState({
    name: '',
    type: 'cão',
    descricao: '',
    city: 'Campo Bom',
    local: '',
    status: 'Encontrado',
    photo: null,
  });

  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validCities = [
    'Campo Bom', 'Igrejinha', 'Nova Hartz', 'Novo Hamburgo', 
    'Parobé', 'Rolante', 'Sapiranga', 'Taquara', 'Três Coroas'
  ];

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

    // valida dos campos obrigatórios
    if (!animalData.type || !animalData.descricao || !animalData.city || !animalData.local || !animalData.status || !animalData.photo) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);
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

      console.log('Dados enviados:', formData);

      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/pets`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Pet adicionado:', response.data);
      setShowToast(true);
      setTimeout(() => {
        if (animalData.status === 'Encontrado') {
          navigate(`/Achados`);
        } else {
          navigate(`/Perdidos`);
        }
      }, 2000);
    } catch (error) {
      console.error('Erro ao adicionar pet:', error.response ? error.response.data : error.message);
    } finally {
      setIsSubmitting(false);
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
            <select
              id="city"
              name="city"
              value={animalData.city}
              onChange={handleInputChange}
            >
              {validCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

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

            <button type="submit" className="submit-button" disabled={isSubmitting}>Salvar Animal</button>
            <div style={{ height: '60px' }}></div>
          </form>
        </div>
      </div>
      <img src={addPic} alt="Imagem ilustrativa de animais" className="add-animal-pic" />
      {showToast && <Toast message="Animal salvo com sucesso!" onClose={() => setShowToast(false)} />}
    </>
  );
};

export default AddAnimal;
