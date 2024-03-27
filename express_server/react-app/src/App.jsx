import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import FGame from "./filip_game";

export default function App() {
  return (
    <div className="mx-auto w-3/5 h-full self-center rounded-s shadow-md">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<FGame />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}