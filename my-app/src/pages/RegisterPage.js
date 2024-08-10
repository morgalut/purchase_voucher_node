import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("regular");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3002/users", {
                username,
                email,
                password,
                userType,
            });

            console.log("Registration successful:", response.data);
            // Redirect to login or another page on success
        } catch (error) {
            console.error("Registration failed:", error.response?.data);
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
