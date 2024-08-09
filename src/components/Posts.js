import Post from "./Post";
import "../styles/Posts.css";

const Posts = ({ posts }) => {
    return (
        <div className="posts-container">
            {posts.map((postData, index) => (
                <Post key={index} user={postData.owner} post={postData} />
            ))}
        </div>
    );
}

export default Posts;