import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome";
import TicTacToe from "./Tic-Tac-Toe";
import APP from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/MyHamsterTest">
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/tic-tac-toe" element={<TicTacToe />} />
      <Route path="/app" element={<APP />} />
      <Route path="/quiz" element={<APP />} />
      <Route path="/result" element={<APP />} />
    </Routes>
  </BrowserRouter>
);
