import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [userNames, setUserNames] = useState([]);
  let count=0;
  const getProducts = async () => {
    let result = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/get_products`);
    result = await result.json();
    let userIDs=result.map((item)=>item.userID)
    var names = await Promise.all(
      userIDs.map(async (id) => {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/get_user/${id}`);
        const user = await response.json();
        return user[0].name; // Return the name directly
      })
    );
    // console.log(names);
    setUserNames(names);
    setProducts(result);
  };

  useEffect(() => {
    getProducts();
  }, []);
  const handleDelete = async (id) => {
    let result = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/delet_products/${id}`, {
      method: "DELETE",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };
  


  const handleSearch = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };
  return (
    <div>
      <h1 className="text-center mb-12 text-3xl font-semibold mt-4">
        List of All Products
      </h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          name="search"
          id="search"
          onChange={handleSearch}
          className="w-[300px] border-4 border-sky-400 px-2 py-3 rounded-lg focus:outline-none"
          placeholder="Search Here"
        />
      </div>

      <div className="flex justify-center">
        <table className="w-[900px]">
          <thead>
            <tr>
              <th className="text-lg text-sky-900 p-2 border-2 border-sky-900">
                SR No
              </th>
              <th className="text-lg text-sky-900  p-2 border-2 border-sky-900">
                Product Name
              </th>
              <th className="text-lg text-sky-900  p-2 border-2 border-sky-900">
                Price
              </th>
              <th className="text-lg text-sky-900  p-2 border-2 border-sky-900">
                Category
              </th>
              <th className="text-lg text-sky-900 p-2 border-2 border-sky-900">
                Company Name
              </th>
              <th className="text-lg text-sky-900 p-2 border-2 border-sky-900">
                Added By
              </th>
              <th className="text-lg text-sky-900 p-2 border-2 border-sky-900">
                Delete
              </th>
              <th className="text-lg text-sky-900 p-2 border-2 border-sky-900">
                Update
              </th>
            </tr>
          </thead>
          <tbody>
          {products.length > 0 ? (
            products.map((item, index) => (
              
              <tr className="text-center" key={index}>
                <td className="border-2 border-sky-900">{index + 1}</td>
                <td className="border-2 border-sky-900">{item.name}</td>
                <td className="border-2 border-sky-900">{item.price}</td>
                <td className="capitalize border-2 border-sky-900">
                  {item.category}
                </td>
                <td className="capitalize border-2 border-sky-900">
                  {item.company}
                </td>
                <td className="capitalize border-2 border-sky-900">
                  {userNames[index]}
                </td>
                <td className="border-2 border-sky-900">
                  <button
                    className=" bg-red-600 p-1 text-white text-xl font-bold m-2"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete Item
                  </button>
                </td>
                <td className="border-2 border-sky-900">
                  <Link
                    to={"/update/" + item._id}
                    className="bg-sky-900 p-2 text-white font-bold m-2"
                  >
                    Update Now
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-3xl font-bold pt-6">
                No Product Found
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
