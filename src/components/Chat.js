import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import '../styles/Chat.css';
import sendIcon from '../assets/enviar.png';
import ProfilePic from './ProfilePic';

const Chat = ({user, token}) => {
    const [otherUser, setOtherUser] = useState({
        name: "Carregando...",
        surname: "",
        profilePic: ""
    });
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    const { id } = useParams();
    const otherUserId = id;

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const interval = setInterval(() => {
            const fetchMessages = async () => {
                if (!token) {
                    console.error('Token não fornecido');
                    return;
                }
                try {
                    const response = await fetch(`/api/users/messages/to/${otherUserId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const data = await response.json();
                    setMessages(data);
                } catch (error) {
                    console.error('Erro ao obter mensagens da conversa:', error);
                }
            };

            if (token && otherUserId) {
                fetchMessages();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [token, otherUserId]);

    useEffect(() => {
        const fetchOtherUser = async () => {
            if (!token) {
                console.error('Token não fornecido');
                return;
            }
            try {
                const response = await fetch(`/api/users/${otherUserId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setOtherUser(data);
            } catch (error) {
                console.error('Erro ao obter informações do usuário:', error);
            }
        };

        if (token && otherUserId) {
            fetchOtherUser();
        }
    }, [token, otherUserId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const renderMessage = (msg, index) => {
        const isMyMessage = msg.sender === user._id;
        const style = isMyMessage ? "chat-message-mine" : "chat-message-other";
        return (
            <div key={index} className={"chat-message " + style}>
                <span className="message-text">{msg.message}</span>
            </div>
        );
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === "") return;

        const newMsg = {
            text: newMessage
        };

        try {
            const response = await fetch(`/api/users/messages/to/${otherUserId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newMsg)
            });
            const data = await response.json();
            setMessages((prev) => [...prev, data]);
            setNewMessage("");
            scrollToBottom();
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    };

    return (
        <div className="chat-container">
            <Header text={`Chat com ${otherUser.name || ''}`} hasBackButton={true} />

            <div className="chat-header">
                <ProfilePic src={otherUser.profilePic} alt={otherUser.name} />
                <div className="chat-profile-name">
                    {otherUser.name} {otherUser.surname}
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
