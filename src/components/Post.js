import "../styles/Post.css";
import { useNavigate } from "react-router-dom";
import Colapsavel from "./Colapsavel";

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " anos";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " meses";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " dias";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " horas";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutos";
    }
    return Math.floor(seconds) + " segundos";
}

const Post = ({ user, post }) => {

    const navigate = useNavigate();

    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`);
    }

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
                <span>{post.likes} likes</span>

            </div>
            <Colapsavel title="Ver comentários ">
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
            </Colapsavel>
        </div>
    );
}

export default Post;