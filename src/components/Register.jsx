import React, { useState } from "react";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if all fields are filled
        if (!user.username || !user.email || !user.password) {
            alert("Please fill out all the fields.");
            return;
        }

        try {
            const response = await axios.post(`${backendURL}/users`, user);
            console.log(response.data);
            setSuccessMessage("Registration Succesful!");
            setFailureMessage("");
            setUser({
                username: "",
                email: "",
                password: ""
            });
        } catch (error) {
            setFailureMessage("Error registering user, please try again");
            setSuccessMessage("");
        }
    }

    return (
        <div>
            <h2>Register</h2>
            {successMessage && <p style={{color: "green"}}>{successMessage}</p>}
            {failureMessage && <p style={{color: "red"}}>{failureMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    value={user.username}
                />
                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={user.email}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={user.password}
                />
                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;