import '../styles/Chats.css'
import Header from './Header'
import BottomBar from './BottomBar'
import fakeUser from '../mock/user.json'
import fakeConversations from '../mock/conversations.json'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Chats = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(fakeUser);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        setConversations(fakeConversations);
    }, []);

    const onConvClick = (conv) => {
        navigate('/chat', { state: { messages: conv } });
    }

    return (
        <div className="chats-container adjusted-container">
            <Header text="Chats" hasBackButton={false} />

            <div className="chats-messages">
                {conversations.map((conv, index) => (
                    <div key={index} className="chats-message" onClick={() => onConvClick(conv)}>
                        <div className="chats-message-avatar">
                            <img src={conv.user.profilePicture} alt={conv.user.name} />
                            <span className={`status ${conv.user.isOnline ? 'online' : 'offline'}`}></span>
                        </div>
                        <div className="chats-message-body">
                            <div className="chats-message-user">{conv.user.name} {conv.user.sobrenome}</div>
                            <div className="chats-message-text">{conv.messages[0].text}</div>
                        </div>
                    </div>
                ))}
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
