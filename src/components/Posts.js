import React from "react";
import Post from "./Post";
import "../styles/Posts.css";

const Posts = ({ posts, onDelete, onLike, onAddComment }) => {
    return (
        <div className="posts-container">
            {posts.map((postData) => (
                <Post 
                    key={postData.id} 
                    user={postData.user} 
                    post={postData} 
                    onDelete={onDelete} 
                    onLike={onLike} 
                    onAddComment={onAddComment} 
                />
            ))}
        </div>
    );
}

export default Posts;
