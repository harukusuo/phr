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

const Post = ({ user, post, onDelete }) => {
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState(post.comments);
    const [showDeleteMenu, setShowDeleteMenu] = useState(false);

    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`);
    };

    const handleLikeClick = () => {
        setIsLiked(!isLiked); // muda entre curtido/n curtido
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        if (newComment.trim() !== "") {
            const newCommentData = {
                id: comments.length + 1,
                content: newComment,
                user: {
                    id: user.id,
                    name: user.name,
                    sobrenome: user.sobrenome,
                    profilePicture: user.profilePicture,
                },
            };
            setComments([...comments, newCommentData]);
            setNewComment("");
        }
    };

    const handleDeleteClick = () => {
        if (onDelete) {
            onDelete(post.id);
        }
    };

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
                <div className="post-options">
                    <span className="material-symbols-outlined" onClick={() => setShowDeleteMenu(!showDeleteMenu)}>more_vert</span>
                    {showDeleteMenu && (
                        <div className="delete-menu">
                            <span onClick={handleDeleteClick}>Excluir post</span>
                        </div>
                    )}
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

            <Colapsavel title="Comentários">
                <div className="post-comments">
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment.id} className="comment">
                                <div className="comment-profile-pic-container" onClick={() => handleUserClick(comment.user.id)}>
                                    <img src={comment.user.profilePicture} alt={`${comment.user.name} ${comment.user.sobrenome}'s profile`} className="comment-profile-pic" />
                                </div>
                                <div>
                                    <span className="comment-profile-username-container" onClick={() => handleUserClick(comment.user.id)}>{comment.user.name} {comment.user.sobrenome}</span>: {comment.content}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="post-sem">Sem comentários</div>
                    )}
                </div>
            </Colapsavel>

            <form onSubmit={handleCommentSubmit} className="comment-form">
                <input
                    type="text"
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Adicionar um comentário..."
                    className="comment-input"
                />
                <button type="submit" className="comment-submit">
                    <span className="material-symbols-outlined">add_comment</span>
                </button>
            </form>
        </div>
    );
};

export default Post;
