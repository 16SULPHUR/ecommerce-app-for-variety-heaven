import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import Cart from "./Cart";
import Navbar from "./Navbar";
import Home from "./Home";
import ProductPage from "./ProductPage";
import LoginPhone from "./LoginPhone";
import auth from "./auth";
import Profile from "./Profile";
import UserCart from "./UserCart";
import { getProducts } from "./getUser";

const App = () => {
  const [isLoggedIn, setLoggedInState] = useState(
    localStorage.getItem("logedIn") === "true"
  );
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("logedIn") === "true";
    setLoggedInState(loggedIn);
  }, [localStorage.getItem("logedIn")]);

  const navigate = useNavigate();

  auth();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await getProducts(); // Assuming getProducts function fetches all products
            setProducts(response);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    fetchData();
}, []);



  window.document.title = "VARIETY HEAVEN";
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar isLoggedIn={isLoggedIn} />}>
          {isLoggedIn ? (
            <>
              <Route path="" element={<Home />} />
              <Route path="productpage" element={<ProductPage />} />
              <Route path="cart" element={<UserCart products={products}/>} />
              <Route path="profile" element={<Profile />} />
              <Route path="login" element={<LoginPhone />} />
            </>
          ) : (
            <>
              <Route path="" element={<Home />} />
              <Route path="cart" element={<LoginPhone />} />
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
