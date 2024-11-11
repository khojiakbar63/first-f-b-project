import React, { useEffect, useState } from "react";
import { Header, Card, Modal } from "../../components";
import UseProductsFeatures from "./features";
import axios from "axios";
import "./style.css";

const HomePage = () => {
  const { loading, loadHandler, data, setSelectedCategory} = UseProductsFeatures();
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios({
        method: "GET",
        url: "http://localhost:4000/api/category",
      });
      setCategories(res.data.data);
      console.log(categories);
    };
    fetchCategory();
  }, []);

  return (
    <>
      <Header />
      <div className="w-[80%] mx-auto">
        <div className="flex justify-between items-center mt-6">
          <select
            onChange={(e)=> setSelectedCategory(e.target.value)}
            name="category"
            className="select select-bordered w-[200px]"
          >
            <option disabled selected>
              Category
            </option>
            <option value="all">All</option>
            {categories.map((category) => {
              return (
                <option value={category} key={category}>
                  {
                    (category =
                      category.slice(0, 1).toUpperCase() + category.slice(1))
                  }
                </option>
              );
            })}
          </select>
          <Modal />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4 pb-6">
          {loading && data.length === 0 ? (
            <p>Loading products...</p>
          ) : data.length > 0 ? (
            data.map((product, index) => <Card key={index} product={product} />)
          ) : (
            <p>No products available.</p>
          )}
        </div>
        {data.length >= 12 && (
          <div className="flex justify-center">
            <button onClick={loadHandler} className="btn btn-primary">
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
