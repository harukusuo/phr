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
        // TODO fetch messages
        setConversations(fakeConversations);
    }, []);

    const onConvClick = (conv) => {
        navigate('/chat', { state: { messages: conv } });
    }

    return (
        <div className="chats-container">
            <Header text="Chats" hasBackButton={false} />

            <div className="chats-messages">
                {conversations.map((conv, index) => (
                    <div key={index} className="chats-message" onClick={() => onConvClick(conv)}>
                        <div className="chats-message-avatar">
                            <img src={conv.user.profilePicture} alt={conv.user.name} />
                        </div>
                        <div className="chats-message-body">
                            <div className="chats-message-user">{conv.user.name} {conv.user.sobrenome}</div>
                            <div className="chats-message-text">{conv.messages[0].text}</div>
                        </div>
                    </div>
                ))}
            </div>

            <BottomBar user={user}/>
        </div>
    );
}

export default Chats;
