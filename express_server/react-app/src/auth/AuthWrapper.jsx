import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { RenderLayout } from "../components/structure/RenderLayout";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
    const [user, setUser] = useState({ name: "", isAuthenticated: false });

    useEffect(() => {
        // Check if user authentication state is stored in localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    useEffect(() => {
        console.log("Updated user");
    }, [user]);


    const login = async (username, password) => {
        try {
            const response = axios.post('/login', { username, password }).then((result) => {
                const { data } = response;
                if (data.success) {
                    setUser(prevUser => ({ ...prevUser, name: username, isAuthenticated: true }));
                    console.log("Successful login in wrapper");
                    return "success";
                } else {
                    throw new Error("Invalid username or password");
                }
            })
        } catch (error) {
            throw new Error('Login failed: ' + error.message);
        }
    };


    const logout = () => {
        // Clear user state and remove from localStorage
        setUser({ name: "", isAuthenticated: false });
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <RenderLayout />
        </AuthContext.Provider>
    );
};