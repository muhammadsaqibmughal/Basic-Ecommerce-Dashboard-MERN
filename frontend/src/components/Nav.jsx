import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = () => {
      localStorage.clear();
      navigate('/signup')
  }

  return (
    <div className="bg-sky-500 mb-8 flex pl-6">
      <img src={logo} alt="logo" width={80} height={80} />
      {auth ? (
        <ul className="flex py-6 gap-10 pl-10 text-lg font-bold text-white ">
          <Link to="/">Home</Link>
          <Link to="/add">Add Product</Link>
          {/* <Link to="/update">Update Product</Link> */}
          <Link to="/signup" onClick={logout}>
            Logout 
          </Link>
        </ul>
      ) : (
        <ul className="flex py-6 gap-10 pl-10 text-lg font-bold text-white justify-end w-full mr-16">
          <Link to="/login">Login</Link>
          <Link to="/signup">SignUp</Link>
        </ul>
      )}
    </div>
  );
};

export default Nav;
