import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
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
    const result = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/register`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (result.ok) {
      const data = await result.json(); 
      setName("");
      setPassword("");
      setEmail("");
      localStorage.setItem("user", JSON.stringify(data)); 
      navigate("/");
    } else {
      console.error("Error during signup:", result.status);
    }
  };
  

  return (
    <div className=" ">
      <h1 className="text-center mb-8 text-3xl font-semibold mt-4">Register</h1>
      <form
        action=""
        className="flex flex-col gap-3 items-center justify-center "
      >
        <input
          className="focus:outline-none w-[300px] p-2 border-b border-gray-400"
          type="text"
          name="name"
          value={name}
          id="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
        />
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
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
