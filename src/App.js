import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import AdminLayout from "./components/layouts/AdminLayout";
import NotFoundPage from "./components/pages/NotFoundPage";
import ProductTable from "./components/admin/ProductTable";
import Protected from "./components/routes/Protected";
import LoginPage from "./components/pages/LoginPage";
import LandingLayout from "./components/layouts/LandingLayout";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((Response) => Response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingLayout />}>
        <Route path="" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route path="admin" element={<Protected Component={AdminLayout} />}>
        <Route path="" element={<ProductTable products={products} />} />
        <Route path="products" element={<ProductTable products={products} />} />
        <Route path="bids" element={<h1>bids page yet to designed!</h1>} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
