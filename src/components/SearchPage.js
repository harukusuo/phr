import '../styles/SearchPage.css'
import Header from './Header'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import searchIcon from '../assets/searching.png'
import lookingPets from '../assets/looking_pets.png'
import ProfilePic from './ProfilePic'
import FAQModal from './FAQModal'

const SearchPage = () => {
    const navigate = useNavigate();
    const { query } = useParams();

    const [search, setSearch] = useState('');

    const [users, setUsers] = useState([]);
    const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

    useEffect(() => {
        if(query) {
            setSearch(query);
        }
    }, [query]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        navigate(`/search/${e.target.value}`);
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token não encontrado');
                    return;
                }
                const response = await fetch(process.env.REACT_APP_API_BASE_URL + `/api/users/search?query=${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Erro ao buscar usuários');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        if (query) {
            fetchUsers();
        }
    }, [query]);

    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`);
    };

    const handleHelpClick = () => {
        setIsFAQModalOpen(true);
    };

    const handleFAQModalClose = () => {
        setIsFAQModalOpen(false);
    };

    return (
        <div className="searchpage-container">
            <Header text="Busca" hasBackButton={false} />
            <div className="searchpage-search">
                <input autoFocus placeholder="Buscar" className="searchpage-search-input" value={search} onChange={handleSearch}/>
                <button className="searchpage-search-button">
                    <img src={searchIcon} alt="Buscar" />
                </button>
            </div>

            {search.length === 0 ? (
                <div className="searchpage-placeholder">
                    <img src={lookingPets} alt="Looking for pets" />
                </div>
            ) : (
                <div className="searchpage-results">
                    {users.map((user, index) => (
                        <div key={index} className="searchpage-result" onClick={() => handleUserClick(user._id)}>
                            <div className="searchpage-pic-container">
                                <ProfilePic src={user.profilePic} alt={`${user.name}'s profile`} className="searchpage-profile-pic" width={60} height={60}/> 
                            </div>
                            <div className="searchpage-username">{user.name} {user.surname}</div>
                        </div>
                    ))}
                    <div className="searchpage-bottom-space"></div>
                </div>
            )}
            <FAQModal isOpen={isFAQModalOpen} onClose={handleFAQModalClose} />
        </div>
    );
}

export default SearchPage;
