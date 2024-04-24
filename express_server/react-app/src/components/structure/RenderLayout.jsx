import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import Login from "../pages/Login";
import pierogi from "../assets/pierogi.png";
import Home from "../pages/Home";
import Info from "../pages/Info";
import BMICal from "../pages/BMI_calculator"; // Import BMI Calculator component
import Journey from "../pages/Journey";
import Snake from "../pages/Snake";
import FallingFood from "../pages/FallingFood";
import Export from "../pages/Export";
import NotFound from "../pages/NotFound";
import Sketch from "../pages/Sketch";
import MemoryGame from "../pages/MemoryGame";

export const RenderLayout = () => {
    const { user } = AuthData();
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    if (!user.isAuthenticated) {
        return <Login />;
    } else {
        return (
            <>
                <nav
                    id="header"
                    className="fixed w-full z-30 top-0 text-white bg-gradient-to-r from-cyan-300 to-blue-900"
                >
                    <div className="mx-auto flex items-center justify-between py-2">
                        <div className="pl-4 flex items-center justify-center">
                            <img className="w-1/12 z-50" src={pierogi} alt="Pierogi" />
                            <Link
                                className="toggleColour text-black no-underline hover:text-white no-underline font-bold text-2xl lg:text-4xl ml-2"
                                to="/"
                            >
                                Health Journey
                            </Link>
                        </div>
                        <div className="block lg:hidden pr-4">
                            <button
                                id="nav-toggle"
                                className="flex items-center p-1 text-black-800 hover: text-black focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                            >
                                <svg className="fill-current h-6 w-6" viewBox="0 0 20 20">
                                    <title>Menu</title>
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                                </svg>
                            </button>
                        </div>
                        <div
                            className="hidden lg:flex lg:items-center lg:w-auto flex-grow justify-center"
                            id="nav-content"
                        >
                            <ul className="list-reset flex justify-end">
                                <li className="mr-3">
                                    <Link
                                        className="inline-block py-2 px-4 text-black font-bold no-underline"
                                        to="/"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="mr-3">
                                    <Link
                                        className="inline-block py-2 px-4 text-black font-bold no-underline"
                                        to="/Journey"
                                    >
                                        Journey
                                    </Link>
                                </li>
                                <li className="mr-3 relative">
                                    <button
                                        className="inline-block py-2 px-4 text-black font-bold no-underline"
                                        onClick={toggleDropdown}
                                    >
                                        Information {showDropdown ? '▲' : '▼'}
                                    </button>
                                    {showDropdown && (
                                        <div className="absolute bg-white border rounded shadow-lg py-2 right-0 mt-8">
                                            <Link
                                                to="/info/topic1"
                                                className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                                                onClick={toggleDropdown}
                                            >
                                                Health Awareness
                                            </Link>
                                            <Link
                                                to="/info/topic2"
                                                className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                                                onClick={toggleDropdown}
                                            >
                                                BMI Calculator
                                            </Link>
                                        </div>
                                    )}
                                </li>
                                <li className="mr-3">
                                    <Link
                                        className="inline-block py-2 px-4 text-black font-bold no-underline"
                                        to="/Snake"
                                    >
                                        Snake
                                    </Link>
                                </li>
                                <li className="mr-3">
                                    <Link
                                        className="inline-block py-2 px-4 text-black font-bold no-underline"
                                        to="/FallingFood"
                                    >
                                        FallingFood
                                    </Link>
                                </li>
                                <li className="mr-3">
                                    <Link
                                        className="inline-block py-2 px-4 text-black font-bold no-underline"
                                        to="/MemoryGame"
                                    >
                                        MemoryGame
                                    </Link>
                                </li>
                                <li className="mr-3">
                                    <Link
                                        className="inline-block py-2 px-4 text-black font-bold no-underline"
                                        to="/Export"
                                    >
                                        Export PDF
                                    </Link>
                                </li>
                                <li className="mr-3">
                                    <Link
                                        className="inline-block py-2 px-4 text-black font-bold no-underline"
                                        to="/Sketch"
                                    >
                                        Sketch
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/info" element={<Info />} />
                    <Route path="/info/topic1" element={<Info />} />
                    <Route path="/info/topic2" element={<BMICal />} /> {/* Updated to use BMICal component */}
                    <Route path="/Journey" element={<Journey />} />
                    <Route path="/Snake" element={<Snake />} />
                    <Route path="/FallingFood" element={<FallingFood />} />
                    <Route path="/Export" element={<Export />} />
                    <Route path="/MemoryGame" element={<MemoryGame />} />
                    <Route path="/Sketch" element={<Sketch />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>

                <footer className="bg-gradient-to-r from-cyan-300 to-blue-900 fixed bottom-0 w-full">
                    <div className="mx-auto px-8 py-6 text-white text-center">
                        <p>&copy; 2024 Health Journey. All rights reserved.</p>
                    </div>
                </footer>
            </>
        );
    }
};
