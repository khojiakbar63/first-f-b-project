import React, { useEffect, useState } from "react";
import { Header, Card, Footer } from "../../components";
import UseProductsFeatures from "./features";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";

const HomePage = () => {
  const { loading, loadHandler, data, setSelectedCategory } = UseProductsFeatures();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategoryLocal] = useState("all"); // Local state for selected category

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_BASE_URL}/category`,
      });
      setCategories(res.data.data);
    };
    fetchCategory();
  }, []);

  // Handle search term change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Update category and set globally as well
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategoryLocal(category);
    setSelectedCategory(category); // if required for external use
  };

  // Filter products based on the search term and selected category
  const filteredData = data.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <div className="max-w-[1280px] px-5 mx-auto mb-10 text-red-200">
        <div className=" lg:flex justify-between items-center mt-6 te">
          <select
            onChange={handleCategoryChange}
            name="category"
            className="select select-bordered max-w-[200px] "
            value={selectedCategory}
          >
            <option value="all">All</option>
            {categories?.map((category) => (
              <option value={category} key={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <div className="form-control w-fit">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered !max-w-[400px]"
              onChange={handleSearch}
              value={searchTerm}
            />
          </div>

          <Link to={`/add-product`}>
            <button className="btn btn-warning flex-1">Add New Product</button>
          </Link>

        </div>
        <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 pb-6">
          {loading && data.length === 0 ? (
            <p>Loading products...</p>
          ) : filteredData.length > 0 ? (
            filteredData.map((product, index) => <Card key={index} product={product} />)
          ) : (
            <p>No products available.</p>
          )}
        </div>
        {filteredData.length >= 12 && (
          <div className="flex justify-center">
            <button onClick={loadHandler} className="btn btn-primary">
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
