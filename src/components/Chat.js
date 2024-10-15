import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import fakeUser from '../mock/user.json';
import '../styles/Chat.css';
import sendIcon from '../assets/enviar.png';

const Chat = () => {
    const location = useLocation();
    const [messages, setMessages] = useState(location.state.messages);
    const [user, setUser] = useState(fakeUser);
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

    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;

        const newMsg = {
            text: newMessage,
            userId: user.id,
        };
        setMessages((prev) => ({
            ...prev,
            messages: [...prev.messages, newMsg],
        }));
        setNewMessage("");
        scrollToBottom();
    };

    return (
        <div className="chat-container">
            <Header text={`Chat com ${messages.user.name}`} hasBackButton={true} />

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
