import '../styles/Chats.css'
import Header from './Header'
import BottomBar from './BottomBar'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfilePic from './ProfilePic';
import axios from 'axios';
import notFound from '../assets/notFound.png';

const Chats = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const userId = '671424ff36f53797c78488f0'; // ATENCAO NISSO !! problema pode estar aqui
                const response = await axios.get(`/api/users/${userId}/conversations`);
                setConversations(response.data);
            } catch (error) {
                console.error('Erro ao obter conversas:', error);
            }
        };

        fetchConversations();
    }, []);

    const onConvClick = (conv) => {
        navigate('/chat', { state: { messages: conv } });
    }

    const handleSearchClick = () => {
        navigate('/search');
    }

    return (
        <div className="chats-container adjusted-container">
            <Header text="Chats" hasBackButton={false} />

            <div className="chats-messages">
                {conversations.length > 0 ? (
                    conversations.map((conv, index) => (
                        <div key={index} className="chats-message" onClick={() => onConvClick(conv)}>
                            <div className="chats-message-avatar">
                                {conv.user && (
                                    <>
                                        <ProfilePic src={conv.user.profilePic} alt={conv.user.name} /> {/* Usar o novo componente */}
                                        <span className={`status ${conv.user.isOnline ? 'online' : 'offline'}`}></span>
                                    </>
                                )}
                            </div>
                            <div className="chats-message-body">
                                {conv.user && conv.messages && conv.messages.length > 0 && (
                                    <>
                                        <div className="chats-message-user">{conv.user.name} {conv.user.surname}</div>
                                        <div className="chats-message-text">{conv.messages[0].text}</div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-message">
                        Ops! Aqui parece vazio...
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
        </div>
    );
}

export default Chats;
