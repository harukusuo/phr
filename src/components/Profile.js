import Header from './Header';
import Posts from './Posts';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import ProfilePic from './ProfilePic';
import noUser from '../assets/noUser.png';
import notFound from '../assets/notFound.png';
import PetCardProfile from './PetCardProfile';
import FAQModal from './FAQModal';

const Profile = ({ user, token, setUser }) => { 
    const [profileUser, setProfileUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [pets, setPets] = useState([]);
    const [activeTab, setActiveTab] = useState('posts');
    const [profilePic, setProfilePic] = useState(noUser); 
    const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleHelpClick = () => {
        setIsFAQModalOpen(true);
    };

    const handleFAQModalClose = () => {
        setIsFAQModalOpen(false);
    };

    const isMobile = window.innerWidth <= 768;

    useEffect(() => {

        if (!user || !token) {
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_BASE_URL + `/api/users/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Erro ao buscar usuário');
                }
                const data = await response.json();
                setProfileUser(data);
                setProfilePic(data.profilePic || noUser);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        };
    
        if (id === user._id) {
            setProfileUser(user);
            setProfilePic(user.profilePic || noUser); 
            return;
        } else {
            fetchUser();
        }
    }, [user, id, token]);

    useEffect(() => {

        if (!user || !profileUser || !profileUser._id || !token) {
            return;
        }

        const fetchPosts = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_BASE_URL + `/api/posts/owner/${profileUser._id}`, {
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
                    likedByUser: post.likes.includes(user._id),
                    comments: post.comments
                }));

                formattedPosts.sort((a, b) => b.time - a.time);

                setPosts(formattedPosts);
            } catch (error) {
                console.error('Erro ao buscar posts:', error);
            }
        };
    
        fetchPosts();
    }, [profileUser, user, token]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_BASE_URL +`/api/pets/owner/${id}`);
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
                    const response = await fetch(process.env.REACT_APP_API_BASE_URL + `/api/users/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ profilePic: `data:image/jpeg;base64,${base64String}` })
                    });
                    if (!response.ok) {
                        throw new Error('Erro ao atualizar a foto de perfil');
                    }
                    const updatedUser = await response.json();
                    setProfileUser(updatedUser);
                    setProfilePic(updatedUser.profilePic || noUser);
                    if (id === user._id) {
                        setUser(updatedUser);
                    }
                    console.log('Foto de perfil atualizada:', updatedUser.profilePic); 
                } catch (error) {
                    console.error('Erro ao atualizar a foto de perfil:', error);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            const response = await fetch(process.env.REACT_APP_API_BASE_URL + `/api/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
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
            const response = await fetch(process.env.REACT_APP_API_BASE_URL + `/api/posts/${postId}/${isLiked ? 'dislike' : 'like'}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
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
            const response = await fetch(process.env.REACT_APP_API_BASE_URL + `/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ text: commentText })
            });
            if (!response.ok) {
                throw new Error('Erro ao adicionar comentário');
            }
            const updatedPost = await response.json();
            setPosts(posts.map(post => post.id === postId ? { ...post, comments: updatedPost.comments.map(comment => ({
                _id: comment._id,
                text: comment.text,
                profileUser: {
                    _id: comment.profileUser._id,
                    name: comment.profileUser.name,
                    surname: comment.profileUser.surname,
                    profilePic: comment.profileUser.profilePic
                }
            })) } : post));
        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
        }
    };

    const handleSendMessage = () => {
        navigate(`/chat/${profileUser._id}`);
    };

    const handleActionClick = (pet) => {
        if (pet.status === 'perdido') {
            console.log('Encontrei o pet:', pet.name);
        } else {
            console.log('É meu pet:', pet.name);
        }
    };

    const handleDeletePet = async (petId) => {
        try {
            const response = await fetch(process.env.REACT_APP_API_BASE_URL + `/api/pets/${petId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao deletar pet');
            }
            setPets(pets.filter(pet => pet._id !== petId));
        } catch (error) {
            console.error('Erro ao deletar pet:', error);
        }
    };

    const title = user?._id === id ? "Meu perfil" : `Perfil de ${profileUser.name || ''} ${profileUser.surname || ''}`;

    return (
        <div className="profile">
            <Header text={title}/>
            <div onClick={handleHelpClick} className="help-button">
                ?
            </div>
            <div className="profile-content">
                <div className='profile-content-info'>
                    <div className='profile-content-info-header'>
                        <div className="profile-info">
                            <span className="profile-username">{profileUser.name} {profileUser.surname}</span>
                            {user?._id !== id ? (
                                <button className="send-message-button" onClick={handleSendMessage}>
                                    <span className="material-symbols-outlined">mail</span> Enviar Mensagem
                                </button>
                            ) : (
                                <button className="send-message-button" onClick={() => handleNavigation('/')}>
                                    <span className="material-symbols-outlined">logout</span> Sair
                                </button>
                            )}
                        </div>
                        {user?._id === id && (
                            <>
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="profile-pic-input"
                                    onChange={handleProfilePicChange}
                                />
                        <label htmlFor="profile-pic-input">
                                    <ProfilePic 
                                        src={profilePic}
                                        alt={user.name || 'Usuário'} 
                                        width={150} 
                                        height={150} 
                                        style={{ cursor: 'pointer' }}
                                    />
                                </label>
                            </>
                        )}
                        {user?._id !== id && (
                            <ProfilePic 
                                src={profilePic} 
                                alt={profileUser.name || 'Usuário'} 
                                width={150} 
                                height={150} 
                            />
                        )}
                    </div>
                    <div className='profile-content-info-body'>
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
                        <div className="pets-grid-profile">
                            {pets.map((pet, index) => (
                                <PetCardProfile
                                    key={index}
                                    pet={pet}
                                    type={pet.status}
                                    onActionClick={user._id === pet.user._id ? handleDeletePet : handleActionClick}
                                    user={user}
                                    token={token}
                                    showDetails={false}
                                    onDelete={handleDeletePet} 
                                />
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
            <FAQModal isOpen={isFAQModalOpen} onClose={handleFAQModalClose} />
        </div>
    );
};

export default Profile;