import React, { useState } from "react";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

function Form(props) {
    const [post, setPost] = useState({
        post_title: "",
        post_content: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            
            const response = await axios.post(
                `${backendURL}/posts`,
                post,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            props.addPost(response.data);
            setPost({post_title: "", post_content: ""}); // Clears the form
        } catch (error) {
            console.error("Error creating post", error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="post_title"
                placeholder="Post Title"
                onChange={handleChange}
                value={post.post_title}
                
            />
            <textarea 
                name="post_content"
                placeholder="Post Content"
                onChange={handleChange}
                value={post.post_content}
            />
            <button type="submit">
                Add Post
            </button>
        </form>
    );
}

export default Form;
