import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("regular");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        
        // Input validation
        if (!username.trim() || !email.trim() || !password || !userType) {
            setError("All fields are required.");
            return;
        }

        try {
            // Post user data to the API
            await axios.post("http://localhost:3002/users", {
                username: username.trim(),
                email: email.trim(),
                password,
                userType,
            });
            
            setSuccess("Registration successful!");
            // Reset form fields
            setUsername("");
            setEmail("");
            setPassword("");
            setUserType("regular");
        } catch (error) {
            console.error("Registration failed:", error.response?.data);
            // Handle specific backend errors
            setError(error.response?.data.error || "Registration failed");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>User Type</label>
                    <select
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        required
                    >
                        <option value="regular">Regular</option>
                        <option value="manager">Manager</option>
                    </select>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
