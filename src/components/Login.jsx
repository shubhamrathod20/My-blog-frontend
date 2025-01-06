import React, { useState } from "react";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
    const [user, setUser] = useState({
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

        if (!user.email || !user.password) {
            alert("Please fill out all the fields.");
            return;
        }

        try {
            const response = await axios.post(`${backendURL}/login`, user);
            console.log(response.data);

            //
            setSuccessMessage("Loing successful");
            setFailureMessage("");

            // Store token in localstorage
            localStorage.setItem("token", response.data.token);

            // Clearing Input fields
            setUser({
                email: "",
                password: ""
            });
        } catch (error) {
            setFailureMessage("Invalid credentials, please try again.");
            setSuccessMessage("");
        }
    }

    return (
        <div>
            <h2>Login</h2>
            {successMessage && <p style={{color: "green"}}>{successMessage}</p>}
            {failureMessage && <p style={{color: "red"}}>{failureMessage}</p>}
            <form onSubmit={handleSubmit}>
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
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;