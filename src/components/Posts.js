import React from "react";
import Post from "./Post";
import "../styles/Posts.css";

const Posts = ({ posts, onDelete }) => {
    return (
        <div className="posts-container">
            {posts.map((postData, index) => (
                <Post 
                    key={index} 
                    user={postData.owner} 
                    post={postData} 
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default Posts;
