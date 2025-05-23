import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit working");

    let result = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result=await result.json();
    console.log(result);
    if(result.name)
    {
      localStorage.setItem("user",JSON.stringify(result));
      navigate("/"); 
    }
    else
    {
      alert("No user found");
    }

  };

  return (
    <div className=" ">
      <h1 className="text-center mb-8 text-3xl font-semibold mt-4">Login</h1>
      <form
        action=""
        className="flex flex-col gap-3 items-center justify-center "
      >
        <input
          className="focus:outline-none w-[300px] p-2 border-b border-gray-400"
          type="email"
          name="emai"
          value={email}
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          className="focus:outline-none w-[300px] p-2 border-b border-gray-400"
          type="password"
          name="password"
          value={password}
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <button
          className="mt-4 border-4 py-3 px-6 bg-sky-800 text-white text-lg font-bold hover:bg-slate-700 hover:border-sky-800 transition-colors duration-300"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
