import Header from './Header';
import Posts from './Posts';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Profile.css';
import ProfilePic from './ProfilePic';
import noUser from '../assets/noUser.png';
import notFound from '../assets/notFound.png';

const Profile = () => {
    const handleSendMessage = () => {
        console.log('Enviar mensagem para', user.name);
    };

    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [pets, setPets] = useState([]);
    const [activeTab, setActiveTab] = useState('posts');

    const { id } = useParams(); 
    const loggedInUserId = JSON.parse(localStorage.getItem('user'))._id;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/${id}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar usuário');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        };

        fetchUser();
    }, [id]);
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token não encontrado');
                    return;
                }
                const response = await fetch(`/api/posts/owner/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Erro ao buscar posts');
                }
                const data = await response.json();
                if (!Array.isArray(data)) {
                    throw new Error('Dados dos posts inválidos');
                }
                const formattedPosts = data.map(post => ({
                    id: post._id,
                    user: post.user,
                    content: post.text,
                    time: new Date(post.createdAt),
                    likes: post.likes.length,
                    likedByUser: post.likes.includes(loggedInUserId),
                    comments: post.comments
                }));

                formattedPosts.sort((a, b) => b.time - a.time);

                setPosts(formattedPosts);
            } catch (error) {
                console.error('Erro ao buscar posts:', error);
            }
        };
    
        fetchPosts();
    }, [id]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch(`/api/pets/owner/${id}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar pets');
                }
                const data = await response.json();
                setPets(data);
            } catch (error) {
                console.error('Erro ao buscar pets:', error);
            }
        };

        fetchPets();
    }, [id]);

    const handleProfilePicChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
                try {
                    const response = await fetch(`/api/users/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({ profilePic: `data:image/jpeg;base64,${base64String}` })
                    });
                    if (!response.ok) {
                        throw new Error('Erro ao atualizar a foto de perfil');
                    }
                    const updatedUser = await response.json();
                    setUser(updatedUser);
                } catch (error) {
                    console.error('Erro ao atualizar a foto de perfil:', error);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao deletar post');
            }
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Erro ao deletar post:', error);
        }
    };

    const handleLikePost = async (postId, isLiked) => {
        try {
            const response = await fetch(`/api/posts/${postId}/like`, {
                method: isLiked ? 'DELETE' : 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error(`Erro ao ${isLiked ? 'descurtir' : 'curtir'} post`);
            }
            const updatedPost = await response.json();
            setPosts(posts.map(post => post.id === postId ? { ...post, likes: updatedPost.likes.length } : post));
        } catch (error) {
            console.error(`Erro ao ${isLiked ? 'descurtir' : 'curtir'} post:`, error);
        }
    };

    const handleAddComment = async (postId, commentText) => {
        try {
            const response = await fetch(`/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ text: commentText })
            });
            if (!response.ok) {
                throw new Error('Erro ao adicionar comentário');
            }
            const updatedPost = await response.json();
            const loggedInUser = JSON.parse(localStorage.getItem('user'));
            setPosts(posts.map(post => post.id === postId ? { ...post, comments: updatedPost.comments.map(comment => ({
                _id: comment._id,
                text: comment.text,
                user: {
                    _id: comment.user._id,
                    name: comment.user.name,
                    surname: comment.user.surname,
                    profilePic: comment.user.profilePic
                }
            })) } : post));
        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
        }
    };

    const title = "Perfil de " + (user.name || '');

    return (
        <div className="profile">
            <Header text={`Perfil de ${user.name || ''} ${user.surname || ''}`}/>

            <div className="profile-content">
                <div className='profile-content-info'>
                    <div className='profile-content-info-header'>
                        <div className="profile-info">
                            <span className="profile-username">{user.name} {user.surname}</span>
                            {loggedInUserId !== id && (
                                <button className="send-message-button" onClick={handleSendMessage}>
                                    <span className="material-symbols-outlined">mail</span> Enviar Mensagem
                                </button>
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="profile-pic-input"
                            onChange={handleProfilePicChange}
                        />
                        <label htmlFor="profile-pic-input">
                            <ProfilePic 
                                src={user.profilePic || noUser} 
                                alt={user.name || 'Usuário'} 
                                width={150} 
                                height={150} 
                                style={{ cursor: 'pointer' }}
                            />
                        </label>
                    </div>
                    <div className='profile-content-info-body'>
                        {/* Outros conteúdos */}
                    </div>
                </div>
            </div>

            <div className="profile-tabs">
                <button 
                    className={`profile-tab ${activeTab === 'posts' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('posts')}
                >
                    Posts
                </button>
                <button 
                    className={`profile-tab ${activeTab === 'pets' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('pets')}
                >
                    Pets
                </button>
            </div>

            <div className="profile-posts">
                {activeTab === 'posts' && (
                    posts.length > 0 ? (
                        <Posts posts={posts} onDelete={handleDeletePost} onLike={handleLikePost} onAddComment={handleAddComment} />
                    ) : (
                        <div className="empty-message">
                            Ops! Aqui parece vazio...
                            <img src={notFound} alt="Not Found" />
                        </div>
                    )
                )}
                {activeTab === 'pets' && (
                    pets.length > 0 ? (
                        <div className="pets-grid">
                            {pets.map((pet, index) => (
                                <div key={index} className="pet-card">
                                    <img src={pet.picture} alt={pet.name} className="pet-image" />
                                    <div className="pet-info">
                                        <h3>{pet.name} - {pet.type}</h3>
                                        <p><strong>Descrição:</strong> {pet.description}</p>
                                        <p><strong>Local:</strong> {pet.location}, {pet.city}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-message">
                            Ops! Aqui parece vazio...
                            <img src={notFound} alt="Not Found" />
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Profile;