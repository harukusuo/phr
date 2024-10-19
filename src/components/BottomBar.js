import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import homeIcon from '../assets/home.png';
import searchIcon from '../assets/buscar.png';
import chatsIcon from '../assets/chats.png';
import profileIcon from '../assets/perfil.png';
import petsIcon from '../assets/pets.png';
import '../styles/BottomBar.css';

const BottomBar = ({ user }) => {

    const navigate = useNavigate();

    const handleHomePress = () => {
        navigate('/homepage');
    };

    const handleSearchPress = () => {
        navigate('/search');
    };

    const handlePetsPress = () => {
        navigate('/pets');
    };

    const handleChatPress = () => {
        navigate('/chats');
    };

    const handleProfilePress = () => {
        navigate(`/profile/${user._id}`);
    };

    const [activeButton, setActiveButton] = useState(null);


    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        console.log(`Botão ${buttonName} pressionado...`);
    };

    useEffect(() => {
        if (activeButton) {
            const timer = setTimeout(() => {
                setActiveButton(null);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [activeButton]);

    return (
        <div className="bottomBar">
            <div
                className={`bottomBar-button ${activeButton === 'home' ? 'bottomBar-active' : ''}`}
                onClick={() => {
                    handleButtonClick('home');
                    handleHomePress();
                }}
            >
                <img src={homeIcon} alt="Home" className="bottomBar-icon" />
            </div>
            <div
                className={`bottomBar-button ${activeButton === 'search' ? 'bottomBar-active' : ''}`}
                onClick={() => {
                    handleButtonClick('search');
                    handleSearchPress();
                }}
            >
                <img src={searchIcon} alt="Pesquisar" className="bottomBar-icon" />
            </div>
            <div
                className={`bottomBar-button ${activeButton === 'pets' ? 'bottomBar-active' : ''}`}
                onClick={() => {
                    handleButtonClick('pets');
                    handlePetsPress();
                }}
            >
                <img src={petsIcon} alt="Pets" className="bottomBar-icon" />
            </div>
            <div
                className={`bottomBar-button ${activeButton === 'chats' ? 'bottomBar-active' : ''}`}
                onClick={() => {
                    handleButtonClick('chats');
                    handleChatPress();
                }}
            >
                <img src={chatsIcon} alt="Chats" className="bottomBar-icon" />
            </div>
            <div
                className={`bottomBar-button ${activeButton === 'profile' ? 'bottomBar-active' : ''}`}
                onClick={() => {
                    handleButtonClick('profile');
                    handleProfilePress();
                }}
            >
                <img src={profileIcon} alt="Meu Perfil" className="bottomBar-icon" />
            </div>
        </div>
    )
}

export default BottomBar;