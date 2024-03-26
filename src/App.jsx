import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import Cart from "./Cart";
import Navbar from "./Navbar";
import Home from "./Home";
import ProductPage from "./ProductPage";
import LoginPhone from "./LoginPhone";
import auth from "./auth";

const App = () => {
  const [isLoggedIn, setLoggedInState] = useState(
    localStorage.getItem("logedIn") === "true"
  );

  useEffect(() => {
    const loggedIn = localStorage.getItem("logedIn") === "true";
    setLoggedInState(loggedIn);
  }, [localStorage.getItem("logedIn")]);

  const navigate = useNavigate();

  auth();

  window.document.title = "VARIETY HEAVEN";
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar isLoggedIn={isLoggedIn} />}>
          {isLoggedIn ? (
            <>
              <Route path="" element={<Home />} />
              <Route path="productpage" element={<ProductPage />} />
              <Route path="cart" element={<div>CART</div>} />
            </>
          ) : (
            <>
              <Route path="" element={<Home />} />
              <Route path="signedout" element={<Home />} />
              <Route path="productpage" element={<ProductPage />} />
              <Route path="login" element={<LoginPhone />} />
            </>
          )}
        </Route>
      </Routes>
    </>
  );
};

export default App;
