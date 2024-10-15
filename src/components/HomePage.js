import React, { useState } from 'react';
import Posts from './Posts';
import NewPost from './NewPost';
import Header from './Header';
import '../styles/HomePage.css';

import postIcon from '../assets/postar.png';
import fakePosts from '../mock/posts.json';
import fakeUser from '../mock/user.json';

const HomePage = () => {
  const [posts, setPosts] = useState(fakePosts);
  const [user, setUser] = useState(fakeUser);

  // NEW POST
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);

  const handleNewPostButtonClick = () => {
    console.log('Botão Postar pressionado');
    setNewPostModalOpen(true);
  };

  const handleNewPostModalClose = () => {
    setNewPostModalOpen(false);
  };

  const handleFormSubmit = (data) => {
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
        className={`homepage-newPostButton`}
        onClick={handleNewPostButtonClick}
      >
        <img src={postIcon} alt="Postar" className="homepage-newPostButtonIcon" />
      </div>

    </div>
  );
}

export default HomePage;
