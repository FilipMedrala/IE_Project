import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { RenderLayout } from "../components/structure/RenderLayout";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
    const [user, setUser] = useState({ name: "", isAuthenticated: false });

    useEffect(() => {
        // Check if user authentication state is stored in cookies
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('/login', { username, password });
            console.log(response.data.success);

            // If login is successful, update user state and store in cookies
            setUser({ name: username, isAuthenticated: true });
            localStorage.setItem("user", JSON.stringify({ name: username, isAuthenticated: true }));

            return "success";
        } catch (error) {
            throw new Error('Login failed: ' + error.message);
        }
    };

    const logout = () => {
        // Clear user state and remove from cookies
        setUser({ name: "", isAuthenticated: false });
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <RenderLayout />
        </AuthContext.Provider>
    );
};
