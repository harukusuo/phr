import '../styles/SearchPage.css'
import Header from './Header'
import BottomBar from './BottomBar'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import fakeUser from '../mock/user.json'
import fakeUsers from '../mock/users.json'
import searchIcon from '../assets/searching.png'

const SearchPage = () => {
    const navigate = useNavigate();
    const { query } = useParams();

    const [user, setUser] = useState(fakeUser);
    const [search, setSearch] = useState('');

    const [users, setUsers] = useState([]);

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
        if(search.length > 0) {
            // TODO replace by API call
            const filteredUsers = fakeUsers.filter((user) => {
                const fullName = `${user.name} ${user.sobrenome}`.toLowerCase();
                return fullName.includes(search.toLowerCase());
            });
            setUsers(filteredUsers);
        } else {
            setUsers([]);
        }
    }, [search]);


    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`);
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

            <div className="searchpage-results">
                {users.map((user, index) => (
                    <div key={index} className="searchpage-result" onClick={() => handleUserClick(user.id)}>
                        <div className="searchpage-pic-container">
                            <img src={user.profilePicture} alt={`${user.name}'s profile`} className="searchpage-profile-pic"/>
                        </div>
                        <div className="searchpage-username">{user.name} {user.sobrenome}</div>
                    </div>
                ))}
            </div>


            <BottomBar user={user}/>
        </div>
    );
}

export default SearchPage;
