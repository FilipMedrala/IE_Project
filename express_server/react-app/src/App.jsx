import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";


import Journey from "./Journey";
import pierogi from "./assets/pierogi.png";
import Snake from "./Snake";
import FallingFood from "./FallingFood";
import NotFound from "./NotFound"
import Snake2 from "./Snake2"
import Home from "./Home";
import Info from "./Info";

export default function App() {

  useEffect(() => {

    const check = (e) => {
      const target = (e && e.target) || (event && event.srcElement);
      const navMenuDiv = document.getElementById("nav-content");
      const navMenu = document.getElementById("nav-toggle");

      if (!checkParent(target, navMenuDiv)) {
        if (checkParent(target, navMenu)) {
          if (navMenuDiv.classList.contains("hidden")) {
            navMenuDiv.classList.remove("hidden");
          } else {
            navMenuDiv.classList.add("hidden");
          }
        } else {
          navMenuDiv.classList.add("hidden");
        }
      }
    };

    const checkParent = (t, elm) => {
      while (t.parentNode) {
        if (t === elm) {
          return true;
        }
        t = t.parentNode;
      }
      return false;
    };

    document.addEventListener("click", check);

    return () => {
      document.removeEventListener("click", check);
    };
  }, []);


  return (
    <>
      <BrowserRouter>
        <nav id="header" className="fixed w-full z-30 top-0 text-white bg-gradient-to-r from-cyan-300 to-blue-900">
          <div className="mx-auto flex items-center justify-between py-2">
            <div className="pl-4 flex items-center justify-center">
              <img className="w-1/12 z-50" src={pierogi} alt="Pierogi" />
              <Link className="toggleColour text-black no-underline hover:text-white no-underline font-bold text-2xl lg:text-4xl ml-2" to="/">
                Health Journey
              </Link>
            </div>
            <div className="block lg:hidden pr-4">
              <button id="nav-toggle" className="flex items-center p-1 text-black-800 hover: text-black focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                <svg className="fill-current h-6 w-6" viewBox="0 0 20 20">
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
            <div className="hidden lg:flex lg:items-center lg:w-auto flex-grow justify-center" id="nav-content">
              <ul className="list-reset flex justify-end">
                <li className="mr-3">
                  <Link className="inline-block py-2 px-4 text-black font-bold no-underline" to="/">Home</Link>
                </li>
                <li className="mr-3">
                  <Link className="inline-block py-2 px-4 text-black font-bold no-underline" to="/Info">Information</Link>
                </li>
                <li className="mr-3">
                  <Link className="inline-block py-2 px-4 text-black font-bold no-underline" to="/Journey">Journey</Link>
                </li>
                <li className="mr-3">
                  <Link className="inline-block py-2 px-4 text-black font-bold no-underline" to="/Snake">Snake</Link>
                </li>
                <li className="mr-3">
                  <Link className="inline-block py-2 px-4 text-black font-bold no-underline" to="/FallingFood">FallingFood</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>



        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/Journey" element={<Journey />} />
          <Route path="/Snake" element={<Snake />} />
          <Route path="/FallingFood" element={<FallingFood />} />
          <Route path="/Snake2" element={<Snake2 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="bg-gradient-to-r from-cyan-300 to-blue-900 fixed bottom-0 w-full">
          <div className="mx-auto px-8 py-6 text-white text-center">
            <p>&copy; 2024 Journey Health. All rights reserved.</p>
          </div>
        </footer>

      </BrowserRouter>
    </>
  );
}