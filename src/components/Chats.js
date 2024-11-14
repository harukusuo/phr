import '../styles/Chats.css'
import Header from './Header'
import BottomBar from './BottomBar'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfilePic from './ProfilePic';
import notFound from '../assets/notFound.png';
import FAQModal from './FAQModal';

const Chats = ({ user, token }) => {

    const navigate = useNavigate();
    const [latestMessages, setLatestMessages] = useState([]);
    const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

    useEffect(() => {
        const fetchConversations = async () => {
            if (!token) {
                console.error('Token não fornecido');
                return;
            }
            try {
                const response = await fetch(process.env.REACT_APP_API_BASE_URL + '/api/users/messages/latest', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                // sort data by timestamp
                data.sort((a, b) => {
                    return new Date(b.timestamp) - new Date(a.timestamp);
                });
                setLatestMessages(data);
            } catch (error) {
                console.error('Erro ao obter conversas:', error);
            }
        };

        if (token) {
            fetchConversations();
        }
    }, [token]);

    const onConvClick = (conv) => {
        navigate('/chat/' + conv.user.userId);
    }

    const handleSearchClick = () => {
        navigate('/search');
    }

    const truncateMessage = (message, maxLength) => {
        if (message.length > maxLength) {
            return message.substring(0, maxLength) + '...';
        }
        return message;
    };

    const handleHelpClick = () => {
        setIsFAQModalOpen(true);
    };

    const handleFAQModalClose = () => {
        setIsFAQModalOpen(false);
    };

    return (
        <div className="chats-container adjusted-container">
            <Header text="Chats" hasBackButton={false} />
            <div className="chats-messages">
                {latestMessages.length > 0 ? (
                    latestMessages.map((conv, index) => (
                        <div key={index} className="chats-message" onClick={() => onConvClick(conv)}>
                            <ProfilePic src={conv.user.profilePic} alt={conv.user.name} />
                            <div className="chats-message-body">
                                <div className="chats-message-user">{conv.user.name} {conv.user.surname}</div>
                                <div className="chats-message-timestamp">{new Date(conv.timestamp).toLocaleString()}</div>
                                <div className="chats-message-sender">
                                    {conv.sender == user._id ? (<div className="chats-message-sender-name">Você: </div>) : <></>}
                                    <div className="chats-message-text">{truncateMessage(conv.message, 50)}</div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-message">
                        Ops! Aqui parece vazio... <br></br>
                        <span className="search-link" onClick={handleSearchClick}>Experimente buscar um usuário</span> para iniciar uma conversa.
                        <img src={notFound} alt="Not Found" />
                    </div>
                )}
            </div>

            <div className="avisos">
                <h3>Regras do Chat:</h3>
                <ul>
                    <li>💬 Tenha respeito por todos no chat.</li>
                    <li>🙋‍♀️ Do outro lado da tela existe outra pessoa.</li>
                    <li>🤐 Evite enviar mensagens ofensivas.</li>
                    <li>🎯 Mantenha o foco na conversa e no tema.</li>
                    <li>🚫 Não compartilhe informações pessoais.</li>
                </ul>
            </div>
            <FAQModal isOpen={isFAQModalOpen} onClose={handleFAQModalClose} />
        </div>
    );
}

export default Chats;
