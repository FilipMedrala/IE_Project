import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Router, Link, Outlet } from "react-router-dom";


import Journey from "./Journey";
import pierogi from "./assets/pierogi.png";
import Snake from "./Snake";
import FallingFood from "./FallingFood";
import NotFound from "./NotFound"
import Home from "./Home";
import Info from "./Info";

export default function App() {

  useEffect(() => {
    const scrollHandler = () => {
      const scrollpos = window.scrollY;
      const header = document.getElementById("header");
      const navcontent = document.getElementById("nav-content");
      const navaction = document.getElementById("navAction");
      const toToggle = document.querySelectorAll(".toggleColour");

      if (scrollpos > 10) {
        header.classList.add("bg-white");
        navaction.classList.remove("bg-white");
        navaction.classList.add("gradient");
        navaction.classList.remove("text-gray-800");
        navaction.classList.add("text-white");
        for (let i = 0; i < toToggle.length; i++) {
          toToggle[i].classList.add("text-gray-800");
          toToggle[i].classList.remove("text-white");
        }
        header.classList.add("shadow");
        navcontent.classList.remove("bg-gray-100");
        navcontent.classList.add("bg-white");
      } else {
        header.classList.remove("bg-white");
        navaction.classList.remove("gradient");
        navaction.classList.add("bg-white");
        navaction.classList.remove("text-white");
        navaction.classList.add("text-gray-800");
        for (let i = 0; i < toToggle.length; i++) {
          toToggle[i].classList.add("text-white");
          toToggle[i].classList.remove("text-gray-800");
        }
        header.classList.remove("shadow");
        navcontent.classList.remove("bg-white");
        navcontent.classList.add("bg-gray-100");
      }
    };

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

    document.addEventListener("scroll", scrollHandler);
    document.addEventListener("click", check);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
      document.removeEventListener("click", check);
    };
  }, []);


  return (
    <>
      <BrowserRouter>
      <nav id="header" className="fixed w-full h-[15%] z-30 top-0 text-white bg-gradient-to-r from-cyan-300 to-blue-900">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
            <div className="pl-4">
              <Link
                className="toggleColour text-black no-underline hover:text-white no-underline font-bold text-b text-2xl lg:text-4xl"
                to="/"
              >
                Healthy Journey
                <img
                  className="w-full md:w-1/12 z-50"
                  src={pierogi}
                  alt="Pierogi"
                />
              </Link>
            </div>
            <div className="block lg:hidden pr-4">
              <button
                id="nav-toggle"
                className="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
              >
                <svg
                  className="fill-current h-6 w-6"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
            <div
              className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
              id="nav-content"
            >
              <ul className="list-reset lg:flex justify-end flex-1 items-center">
                <li className="mr-3">
                  <Link
                    className="inline-block py-2 px-4 text-black font-bold no-underline"
                    to="/Info"
                  >
                    Information
                  </Link>
                </li>
                <li className="mr-3">
                  <Link
                    className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                    to="/Snake"
                  >
                    Snake
                  </Link>
                </li>
                <li className="mr-3">
                  <Link
                    className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                    to="/Journey"
                  >
                    Journey
                  </Link>
                </li>
              </ul>
            </div>
        </div>
      </nav >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/Journey" element={<Journey />} />
        <Route path="/Snake" element={<Snake />} />
        <Route path="/FallingFood" element={<FallingFood />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="bg-gradient-to-r from-cyan-300 to-blue-900">
      <div className="container mx-auto px-8">
        <div className="w-full flex flex-col md:flex-row py-6">
          <div className="flex-1 mb-6 text-black">
          <a
              className="toggleColour text-black no-underline hover:text-white no-underline font-bold text-b text-2xl lg:text-4xl"
              href="#"
            >
              <img
                className="w-full md:w-1/6 z-50"
                src={pierogi}
                alt="Pierogi"
              />
              Healthy Journey
            </a>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Links</p>
            <ul className="list-reset mb-6">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">FAQ</a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Help</a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Support</a>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Social</p>
            <ul className="list-reset mb-6">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Facebook</a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Linkedin</a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Twitter</a>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Company</p>
            <ul className="list-reset mb-6">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Official Blog</a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">About Us</a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a href="#" className="no-underline hover:underline text-gray-800 hover:text-pink-500">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    </BrowserRouter>
    </>
  );
}