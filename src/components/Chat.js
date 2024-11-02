import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import '../styles/Chat.css';
import sendIcon from '../assets/enviar.png';
import ProfilePic from './ProfilePic';
import axios from 'axios';

const Chat = () => {
    const location = useLocation();
    const [messages, setMessages] = useState(location.state.messages?.messages || []);
    const [user, setUser] = useState(location.state.messages?.user || {});
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const renderMessage = (msg, index) => {
        const isMyMessage = msg.userId === user.id;
        const style = isMyMessage ? "chat-message-mine" : "chat-message-other";
        return (
            <div key={index} className={"chat-message " + style}>
                <span className="message-text">{msg.text}</span>
            </div>
        );
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === "") return;

        const newMsg = {
            text: newMessage,
            userId: user.id,
        };

        try {
            const response = await axios.post(`/api/users/conversations/${user.id}`, { text: newMessage });
            setMessages((prev) => [...prev, response.data.messages[response.data.messages.length - 1]]);
            setNewMessage("");
            scrollToBottom();
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    };

    return (
        <div className="chat-container">
            <Header text={`Chat com ${user.name || ''}`} hasBackButton={true} />

            <div className="chat-header">
                <div className="chat-profile-pic">
                    {user.profilePic && <ProfilePic src={user.profilePic} alt={user.name} />} {/* Usar o novo componente */}
                </div>
                <div className="chat-profile-name">
                    {user.name} {user.surname}
                </div>
            </div>

            <div className="chat-content">
                {messages.map((msg, index) => renderMessage(msg, index))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-message-box">
                <input
                    type="text"
                    placeholder="Digite sua mensagem"
                    className="chat-message-input"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="chat-message-send" onClick={handleSendMessage}>
                    <img src={sendIcon} alt="Enviar" />
                </button>
            </div>
        </div>
    );
};

export default Chat;
