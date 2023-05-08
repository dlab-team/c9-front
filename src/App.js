import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          {/* puedes disponer del navbar para usuario o admin con true o false */}
          <Navbar isAdmin={true} />
          <div className="flex flex-col justify-center items-center">
            <Routes>
              <Route exact path="/" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
