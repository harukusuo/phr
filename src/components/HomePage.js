import React, { useState, useEffect } from 'react';
import Posts from './Posts';
import NewPost from './NewPost';
import Header from './Header';
import '../styles/HomePage.css';

import postIcon from '../assets/postar.png';
import noUser from '../assets/noUser.png';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ user, token }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!token) {
        console.error('Token não fornecido');
        return;
      }

      try {
        const response = await fetch(process.env.REACT_APP_API_BASE_URL + '/api/posts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar posts');
        }

        const data = await response.json();
        const formattedPosts = data.map(post => ({
          id: post._id,
          user: { ...post.user, profilePic: post.user.profilePic || noUser },
          content: post.text,
          time: new Date(post.createdAt),
          likes: post.likes.length,
          likedByUser: post.likes.includes(user._id),
          comments: post.comments.map(comment => ({
            ...comment,
            user: { ...comment.user, profilePic: comment.user.profilePic || noUser }
          }))
        }));

        formattedPosts.sort((a, b) => b.time - a.time);

        setPosts(formattedPosts);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    };

    if (token) {
      fetchPosts();
    }
  }, [token]);

  // NEW POST
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);

  const handleNewPostButtonClick = () => {
    console.log('Botão Postar pressionado');
    setNewPostModalOpen(true);
  };

  const handleNewPostModalClose = () => {
    setNewPostModalOpen(false);
  };

  const handleFormSubmit = async (data) => {
    handleNewPostModalClose();

    try {
      const response = await fetch(process.env.REACT_APP_API_BASE_URL + '/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          text: data.content,
          user: user._id
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar post');
      }

      const newPost = await response.json();

      setPosts([
        {
          id: newPost._id,
          user: user,
          content: newPost.text,
          time: new Date(newPost.createdAt),
          likes: newPost.likes.length,
          comments: newPost.comments
        },
        ...posts
      ]);
    } catch (error) {
      console.error('Erro ao adicionar post:', error);
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
        setPosts(posts.map(post => post.id === postId ? { ...post, comments: updatedPost.comments } : post));
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
    }
  };

  return (
    <div className="homepage-container">
      <Header text="Home" hasBackButton={false} />
      <Posts posts={posts} onDelete={handleDeletePost} onLike={handleLikePost} onAddComment={handleAddComment} />

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
