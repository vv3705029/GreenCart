import React, { useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js";
import { Toaster } from "react-hot-toast"; // ✅ Correct
import Footer from "./components/Footer.js";
import { useAppContext } from "./context/AppContext.js";
import Login from "./components/Login.js";
import AllProducts from "./pages/AllProducts.js";
import ProductCategory from "./pages/ProductCategory.js";
import ProductDetails from "./pages/ProductDetails.js";
import Cart from "./pages/Cart.js";
import AddAddress from "./pages/AddAddress.js";
import MyOrders from "./pages/MyOrders.js";
import SellerLogin from "./components/seller/SellerLogin.js";
import SellerLayout from "./pages/seller/SellerLayout.js";
import AddProduct from "./pages/seller/AddProduct.js";
import ProductList from "./pages/seller/ProductList.js";
import Orders from "./pages/seller/Orders.js";


const App = () => {
  const location = useLocation();
  const isSellerPath = useMemo(
    () => location.pathname.includes("seller"),
    [location.pathname]
  );
  const { showUserLogin, isSeller } = useAppContext();
  return (
    <div className="text-default min-h-screen text-gray-700 bg:white">
      {!isSellerPath && <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Toaster position="bottom-right" />
      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-24"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-order" element={<MyOrders />} />

          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={<AddProduct />} />
            <Route path="products-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
