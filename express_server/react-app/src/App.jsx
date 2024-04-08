import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Router, Link } from "react-router-dom";
import Snake from "./Snake";
import FallingFood from "./FallingFood";
import NotFound from "./NotFound"
import Home from "./Home";
import Info from "./Info";
import Journey from "./Journey";
import './App.css'
import web_logo from './assets/web_logo.jpg'

export default function App() {
  return (
    <div >
      <BrowserRouter>
        <div className="header">
        <div className="logo">
        <Link to="/">
              <img src={web_logo} alt="Home" style={{ width: '20%', height: 'auto' }}  />
            </Link>
          </div>
          <ul>
            <li>
              <Link to="/Snake" >Snake Game</Link>
            </li>
            <li>
              <Link to="/FallingFood">Falling Food Game</Link>
            </li>
            <li>
              <Link to="/info">Health Awareness</Link>
            </li>
          </ul>
        </div>
        <div  className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/Journey" element={<Journey />} />
          <Route path="/Snake" element={<Snake />} />
          <Route path="/FallingFood" element={<FallingFood />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
        <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Protect Your Health™. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">About</a>
        </li>
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" class="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
</footer>
      </BrowserRouter>
    </div>
  );
}