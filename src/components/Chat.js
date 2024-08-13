import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import BottomBar from './BottomBar';
import fakeUser from '../mock/user.json';
import '../styles/Chat.css';
import sendIcon from '../assets/enviar.png';

const Chat = () => {

    const location = useLocation();

    const [messages, setMessages] = useState(location.state.messages);
    const [user, setUser] = useState(fakeUser);

    // reverse messages
    useEffect(() => {
        const newMessages = { ...messages };
        newMessages.messages.reverse();
        setMessages(newMessages);
    }, []);

    const title = "Chat com " + messages.user.name;

    const renderMessage = (msg, index) => {

        const isMyMessage = msg.userId === user.id;
        const style = isMyMessage ? "chat-message-mine" : "chat-message-other";

        return (
            <div key={index} className={"chat-message " + style} >
                {msg.text}
            </div>
        );
    }

    return (
        <div className="chat-container">
            <Header text={title} hasBackButton={true} />

            <div className="chat-header">
                <div className="chat-profile-pic">
                    <img src={messages.user.profilePicture} alt={messages.user.name} />
                </div>
                <div className="chat-profile-name">
                    {messages.user.name} {messages.user.sobrenome}
                </div>
            </div>

            <div className="chat-content">
                {messages.messages.map((msg, index) => renderMessage(msg, index))}
            </div>

            <div className="chat-message-box">
                <input type="text" placeholder="Digite sua mensagem" className="chat-message-input"/>
                <button className="chat-message-send">
                    <img src={sendIcon} alt="Enviar" />
                </button>
            </div>

            <BottomBar user={user}/>
        </div>
    )
}

export default Chat;