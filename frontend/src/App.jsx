import React from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Signup from "./components/Singup";
import { Routes, Route } from "react-router-dom";
import PrivateComponent from "./components/PrivateComponent";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import Login from "./components/login";
import UpdateProducts from "./components/UpdateProducts";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        {/* private components */}
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Products />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="update/:id" element={<UpdateProducts />} />
          <Route path="logout" element={<h1>This is logout component</h1>} />
        </Route>

        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
