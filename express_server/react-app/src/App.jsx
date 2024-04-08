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
              <Link to="/Snake">Snake Game</Link>
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
      </BrowserRouter>
    </div>
  );
}