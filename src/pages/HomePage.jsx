import React, { useState, useEffect } from "react";
import Form from "../components/Form";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${backendURL}/posts`);
                console.log(response.data);
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts");
            }
        };
        fetchPosts();
    }, []);

    const addPost = (newPost) => {
        setPosts((prev) => ([...prev, newPost]));
    }

    return (
        <div style={{padding: "20px"}}>
            
            <h1>Welcome to My Blog</h1>
            <p>Start creating amazing blogs!</p>
            <Form addPost={addPost} />
            <div>
                {posts.map((post, index) => (
                <div key={index} className="post">
                    <h2>{post.post_title}</h2>
                    <p>{post.post_content}</p>
                </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage;