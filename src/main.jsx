import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome";
import TicTacToe from "./Tic-Tac-Toe";
import APP from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/MyHamsterTest/" element={<Welcome />} />
      <Route path="/MyHamsterTest/tic-tac-toe" element={<TicTacToe />} />
      <Route path="/MyHamsterTest/app" element={<APP />} />
      <Route path="/MyHamsterTest/quiz" element={<APP />} />
      <Route path="/MyHamsterTest/result" element={<APP />} />
    </Routes>
  </BrowserRouter>
);
