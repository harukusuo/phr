import Header from './Header';
import Posts from './Posts';
import { useState, useEffect, useCallback } from 'react';
import fakeUser from "../mock/user.json";
import fakePosts from "../mock/posts.json";
import '../styles/Profile.css';

const Profile = () => {

    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    const userId = useCallback(() => (this.props.match.params.id)(), []);
    
    useEffect(() => {
        /*fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(response => response.json())
            .then(data => setUser(data));*/
        setUser(fakeUser);
    }, [userId]);
    
    useEffect(() => {
        /*fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => response.json())
            .then(data => setPosts(data));*/
        setPosts(fakePosts);
    }, [userId]);

    const title = "Perfil de " + user.name;

    return (
        <div className="profile">
            <Header text={`Perfil de ${user.name} ${user.sobrenome}`}/>

            <div className="profile-content">
                <div className='profile-content-info'>
                    <div className='profile-content-info-header'>
                        <span className="profile-username">{user.name} {user.sobrenome}</span>
                    </div>
                    <div className='profile-content-info-body'> 
                        <span className="profile-follow">{user.followers} seguidores</span>
                        <span className="profile-follow">{user.following} seguindo</span>
                    </div>
                </div>
                <div className='profile-content-image'>
                    <img src={user.profilePicture} alt={user.name} />
                </div>
            </div>
            <div className="profile-posts">
                <Posts posts={posts} />
            </div>
        </div>
    );
};

export default Profile;