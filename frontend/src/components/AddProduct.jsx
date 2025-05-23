import React from "react";
import { useState} from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !category || !company) {
      setErr(true);
      return;
    }
    console.log("its working");
    const userID = JSON.parse(localStorage.getItem("user"))._id;
    let result = fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/add_product`, {
     
      method: "POST",
      body: JSON.stringify({ name, price, category, userID, company }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!result.ok) {
      console.log("Something Got Wrong");
    } else {
      result = await result.json();
      console.log(result);
    }
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");
  };
  return (
    <div>
      <h1 className="text-center mb-8 text-3xl font-semibold mt-4">
        Add Product
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
        {
           err && !name && <span className="text-left w-[300px] text-red-600 ">Please Enter Product Name</span>
        }
        
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
        {
           err && !price && <span className="text-left w-[300px] text-red-600 ">Please Enter Product Price</span>
        }
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
        {
          err && !category && <span className="text-left w-[300px] text-red-600 ">Please Enter Product Category</span>
        }
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
        {
           err && !company && <span className="text-left w-[300px] text-red-600 ">Please Enter Product Company</span>
        }
        <button
          className="mt-4 border-4 py-3 px-6 bg-sky-800 text-white text-lg font-bold hover:bg-slate-700 hover:border-sky-800 transition-colors duration-300"
          onClick={handleSubmit}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
