import "../styles/Post.css";
import { useNavigate } from "react-router-dom";
import Colapsavel from "./Colapsavel";
import { useState } from "react";

function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    const interval = seconds / 31536000;

    if (interval >= 1) {
        return Math.floor(interval) === 1 ? "1 ano" : Math.floor(interval) + " anos";
    }
    const intervalMonths = seconds / 2592000;
    if (intervalMonths >= 1) {
        return Math.floor(intervalMonths) === 1 ? "1 mês" : Math.floor(intervalMonths) + " meses";
    }
    const intervalDays = seconds / 86400;
    if (intervalDays >= 1) {
        return Math.floor(intervalDays) === 1 ? "1 dia" : Math.floor(intervalDays) + " dias";
    }
    const intervalHours = seconds / 3600;
    if (intervalHours >= 1) {
        return Math.floor(intervalHours) === 1 ? "1 hora" : Math.floor(intervalHours) + " horas";
    }
    const intervalMinutes = seconds / 60;
    if (intervalMinutes >= 1) {
        return Math.floor(intervalMinutes) === 1 ? "1 minuto" : Math.floor(intervalMinutes) + " minutos";
    }
    return Math.floor(seconds) === 1 ? "1 segundo" : Math.floor(seconds) + " segundos";
}

const Post = ({ user, post }) => {
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false); // verifica se o post foi curtido

    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`);
    };

    const handleLikeClick = () => {
        setIsLiked(!isLiked); // muda entre curtido/n curtido
    };

    const hasComments = post.comments.length > 0;

    return (
        <div className="post">
            <div className="post-header">
                <div className="post-profile-pic-container" onClick={() => handleUserClick(user.id)}>
                    <img src={user.profilePicture} alt={`${user.name}'s profile`} className="post-profile-pic" />
                </div>
                <div className="post-header-info">
                    <span className="post-header-info-username" onClick={() => handleUserClick(user.id)}>{user.name} {user.sobrenome}</span>
                    <span className="post-header-info-time" title={new Date(post.time).toLocaleString()}>{timeSince(new Date(post.time))} atrás</span>
                </div>
            </div>
            <div className="post-content">
                <p>{post.content}</p>
            </div>
            <div className="post-footer">
                <div className="like-container" onClick={handleLikeClick}>
                    <span className="material-symbols-outlined like-icon">
                        {isLiked ? 'heart_check' : 'heart_plus'}
                    </span>
                    <span>{post.likes + (isLiked ? 1 : 0)} likes</span>
                </div>
            </div>
            {hasComments ? <Colapsavel title="Ver comentários">
                <div className="post-comments">
                    {post.comments.map(comment => (
                        <div key={comment.id} className="comment">
                            <div className="comment-profile-pic-container" onClick={() => handleUserClick(comment.user.id)}>
                                <img src={comment.user.profilePicture} alt={`${comment.user.name} ${comment.user.sobrenome}'s profile`} className="comment-profile-pic" />
                            </div>
                            <div>
                                <span className="comment-profile-username-container" onClick={() => handleUserClick(comment.user.id)}>{comment.user.name} {comment.user.sobrenome}</span>: {comment.content}
                            </div>
                        </div>
                    ))}
                </div>
            </Colapsavel> : 
            <div className="colapsavel-container">
                <div className="post-sem">Sem comentários</div>
            </div>
            }
            
        </div>
    );
};

export default Post;
