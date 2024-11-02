import "../styles/Post.css";
import { useNavigate } from "react-router-dom";
import Colapsavel from "./Colapsavel";
import { useState } from "react";
import ProfilePic from './ProfilePic';

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

const Post = ({ user, post, onDelete, onLike, onAddComment }) => {
    const navigate = useNavigate();
    const loggedInUserId = JSON.parse(localStorage.getItem('user'))._id;
    const [isLiked, setIsLiked] = useState(post.likedByUser);
    const [likesCount, setLikesCount] = useState(post.likes);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState(post.comments);
    const [showDeleteMenu, setShowDeleteMenu] = useState(false);

    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`);
    };

    const handleLikeClick = async () => {
        await onLike(post.id, isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
        setIsLiked(!isLiked);
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (newComment.trim() !== "") {
            await onAddComment(post.id, newComment);
            const loggedInUser = JSON.parse(localStorage.getItem('user'));
            setComments([...comments, { text: newComment, user: { _id: loggedInUser._id, name: loggedInUser.name, surname: loggedInUser.surname, profilePic: loggedInUser.profilePic } }]);
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
                <div className="post-profile-pic-container" onClick={() => handleUserClick(user._id)}>
                    <ProfilePic src={user?.profilePic} alt={`${user?.name}'s profile`} className="post-profile-pic" width={50} height={50} />
                </div>
                <div className="post-header-info">
                    <span className="post-header-info-username" onClick={() => handleUserClick(user._id)}>{user?.name} {user?.surname}</span>
                    <span className="post-header-info-time" title={new Date(post.time).toLocaleString()}>{timeSince(post.time)} atrás</span>
                </div>
                {loggedInUserId === user._id && (
                    <div className="post-options">
                        <span className="material-symbols-outlined" onClick={() => setShowDeleteMenu(!showDeleteMenu)}>more_vert</span>
                        {showDeleteMenu && (
                            <div className="delete-menu">
                                <span onClick={handleDeleteClick}>Excluir post</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="post-content">
                <p>{post.content}</p>
            </div>
            <div className="post-footer">
                <div className="like-container" onClick={handleLikeClick}>
                    <span className="material-symbols-outlined like-icon">
                        {isLiked ? 'heart_check' : 'heart_plus'}
                    </span>
                    <span>{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span>
                </div>
            </div>

            {comments.length > 0 ? (
                <Colapsavel title={<div className="colapsavel-title">Comentários</div>}>
                    <div className="post-comments">
                        {comments.map(comment => (
                            <div key={comment._id} className="comment">
                                <div className="comment-profile-pic-container" onClick={() => handleUserClick(comment.user._id)}>
                                    <ProfilePic src={comment.user?.profilePic} alt={`${comment.user?.name} ${comment.user?.surname}'s profile`} className="comment-profile-pic" width={30} height={30} />
                                </div>
                                <div>
                                    <span className="comment-profile-username-container" onClick={() => handleUserClick(comment.user._id)}>{comment.user?.name} {comment.user?.surname}</span>: {comment.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </Colapsavel>
            ) : (
                <div className="post-sem-container">
                    <div className="post-sem">Sem comentários</div>
                </div>
            )}
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
