import React, { useState, useEffect } from 'react';
import Posts from './Posts';
import NewPost from './NewPost';
import Header from './Header';
import '../styles/HomePage.css';
import homeIcon from '../assets/home.png';
import searchIcon from '../assets/buscar.png';
import chatsIcon from '../assets/chats.png';
import profileIcon from '../assets/perfil.png';
import postIcon from '../assets/postar.png';
import fakePosts from '../mock/posts.json';
import fakeUser from '../mock/user.json';

const HomePage = () => {
  const [posts, setPosts] = useState(fakePosts);
  const [user, setUser] = useState(fakeUser);
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    console.log(`Botão ${buttonName} pressionado`);
  };



  // NEW POST
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [newPostFormDate, setNewPostFormData] = useState({});

  const handleNewPostButtonClick = () => {
    setActiveButton('post');
    console.log('Botão Postar pressionado');
    setNewPostModalOpen(true);
  };

  const handleNewPostModalClose = () => {
    setNewPostModalOpen(false);
  };

  const handleFormSubmit = (data) => {
    setNewPostFormData(data);
    handleNewPostModalClose(false);

    // TODO CALL API TO POST
    console.log('Post enviado', data);

    setPosts([
      {
        id: posts.length + 1,
        owner: user,
        content: data.content,
        time: Date.now(),
        likes: 0,
        comments: []
      },
      ...posts
    ]);
  };

  // END NEW POST


  /*
  useEffect(() => {
    fetch('TODO')
      .then(response => response.json())
      .then(data => setPosts(data)) // TODO sort by time
  }, []);*/

  useEffect(() => {
    if (activeButton) {
      const timer = setTimeout(() => {
        setActiveButton(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [activeButton]);

  return (
    <div className="homepage-container">
      <Header text="Home" hasBackButton={false} />

      <Posts posts={posts} />

      <NewPost
        isOpen={newPostModalOpen}
        onSubmit={handleFormSubmit}
        onClose={handleNewPostModalClose}
      />

      <div
        className={`homepage-newPostButton ${activeButton === 'post' ? 'homepage-active' : ''}`}
        onClick={handleNewPostButtonClick}
      >
        <img src={postIcon} alt="Postar" className="homepage-newPostButtonIcon" />
      </div>

      <div className="homepage-bottomBar">
        <div
          className={`homepage-button ${activeButton === 'home' ? 'homepage-active' : ''}`}
          onClick={() => handleButtonClick('home')}
        >
          <img src={homeIcon} alt="Home" className="homepage-icon" />
        </div>
        <div
          className={`homepage-button ${activeButton === 'search' ? 'homepage-active' : ''}`}
          onClick={() => handleButtonClick('search')}
        >
          <img src={searchIcon} alt="Pesquisar" className="homepage-icon" />
        </div>
        <div
          className={`homepage-button ${activeButton === 'chats' ? 'homepage-active' : ''}`}
          onClick={() => handleButtonClick('chats')}
        >
          <img src={chatsIcon} alt="Chats" className="homepage-icon" />
        </div>
        <div
          className={`homepage-button ${activeButton === 'profile' ? 'homepage-active' : ''}`}
          onClick={() => handleButtonClick('profile')}
        >
          <img src={profileIcon} alt="Meu Perfil" className="homepage-icon" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
