import { createContext, useContext, useState } from "react";
import axios from 'axios';
import { RenderLayout } from "../components/structure/RenderLayout";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
    const [user, setUser] = useState({ name: "", isAuthenticated: false });

    const login = async (username, password) => {
        // try {
        //     const response = await axios.post('/login', { username, password });
        //     console.log(response.data)
        return new Promise((resolve, reject) => {
            if (password === "password") {
                setUser({ name: username, isAuthenticated: true });
                console.log("Successful login in wrapper")
                resolve("success")
            } else {
                reject("Incorrect password")
            }
        })

        // } catch (error) {
        //     throw new Error('Login failed: ' + error.message);
        // }
    };

    const logout = () => {
        setUser({ ...user, isAuthenticated: false });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <RenderLayout />
        </AuthContext.Provider>
    );
};
