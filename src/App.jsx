import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import cart from "./cart";
import Navbar from "./Navbar";
import Home from "./Home";
import ProductPage from "./ProductPage";

const App = () => {
  window.document.title = "VARIETY HEAVEN"
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="" element={<Home />} />
          {/* <Route path="cart" element={<cart />} /> */}
          <Route path="cart" element={<cart />} />
          <Route path="productpage" element={<ProductPage/>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
