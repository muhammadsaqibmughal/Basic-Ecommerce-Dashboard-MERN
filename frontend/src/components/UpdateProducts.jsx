import React from "react";
import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";


const UpdateProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const param = useParams();
  const navigate=useNavigate();
  console.log(param);
  useEffect(() => {
    getProductDetail();
  }, []);
  const getProductDetail=async()=>{
    let result=await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/get_single/${param.id}`);
    result=await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result=await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/update/${param.id}`,{
        method:"PUT",
        body:JSON.stringify({name,price,category,company}),
        headers:{
            "Content-Type":"application/json"
        }
    });
    result=await result.json()
    console.log(result);
    alert("Data Updated Successfulyy");
    navigate("/");
  };
  return (
    <div>
      <h1 className="text-center mb-8 text-3xl font-semibold mt-4">
        Update Products
      </h1>
      <form
        action=""
        className="flex flex-col gap-0 items-center justify-center "
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
          placeholder="Product Name"
        />

        <input
          className="focus:outline-none w-[300px] p-2 border-b border-gray-400"
          type="number"
          name="price"
          value={price}
          id="price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          placeholder="Price"
        />

        <select
          name="category"
          id="category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="focus:outline-none border-b border-gray-500 py-2 w-[300px]"
        >
          <option value="" className="text-gray-400">
            --Select Category--
          </option>
          <option value="cloths">Cloths</option>
          <option value="jewlery">Jewlery</option>
          <option value="toys">Toys</option>
          <option value="mobile">Mobile</option>
        </select>

        <input
          className="focus:outline-none w-[300px] p-2 border-b border-gray-400"
          type="text"
          name="company"
          value={company}
          id="company"
          onChange={(e) => {
            setCompany(e.target.value);
          }}
          placeholder="Company Name"
        />

        <button
          className="mt-4 border-4 py-3 px-6 bg-sky-800 text-white text-lg font-bold hover:bg-slate-700 hover:border-sky-800 transition-colors duration-300"
          onClick={handleSubmit}
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProducts;
