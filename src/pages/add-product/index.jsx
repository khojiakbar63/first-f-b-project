import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddModal = ({ className, title, product }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    discount: "",
    imgUrl: "",
  });

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/category`);
        setCategories(res.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategory();
  }, []);

  const onChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_BASE_URL}/products`;
      const res = await axios.post(url, {
        ...data,
        price: Number(data.price),
        discount: Number(data.discount),
      });

      if (res.status === 200 || res.status === 201) {
        setLoading(false);
        document.getElementById("my_modal_4").close();
        navigate("/"); // Navigate to home after successful submission
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setLoading(false);
    }
  };

  const closeModal = () => {
    document.getElementById("my_modal_4").close();
  };

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <Link className="absolute top-10 left-10" to={"/"}>
        <button className="btn btn-success text-white">Go Back</button>
      </Link>
      <div
        id="my_modal_4"
        className="modal-box w-11/12 max-w-5xl flex flex-col items-center justify-center"
      >
        <h3 className="font-bold text-lg">ADD NEW PRODUCT</h3>
        <p className="py-4">Enter details by filling the form below!</p>
        <div className="modal-action">
          <form onSubmit={onSubmit} className="w-[600px] flex flex-col gap-4">
            {/* Title */}
            <label className="form-control w-full">
              <input
                value={data.title}
                onChange={onChange}
                name="title"
                type="text"
                placeholder="Title"
                className="input input-bordered"
              />
            </label>
            {/* Category */}
            <select
              value={data.category}
              onChange={onChange}
              name="category"
              className="select select-bordered w-full"
            >
              <option disabled value="">
                Category
              </option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            {/* Price */}
            <label className="form-control">
              <input
                value={data.price}
                onChange={onChange}
                name="price"
                type="text"
                placeholder="Price"
                className="input input-bordered"
              />
            </label>
            {/* Discount */}
            <label className="form-control">
              <input
                value={data.discount}
                onChange={onChange}
                name="discount"
                type="text"
                placeholder="Discount (%)"
                className="input input-bordered"
              />
            </label>
            {/* Img URL */}
            <label className="form-control w-full">
              <input
                value={data.imgUrl}
                onChange={onChange}
                name="imgUrl"
                type="text"
                placeholder="Image URL"
                className="input input-bordered"
              />
            </label>
            {/* Description */}
            <textarea
              value={data.description}
              onChange={onChange}
              name="description"
              placeholder="Description"
              className="textarea textarea-bordered textarea-md w-full"
            ></textarea>
            <div className="flex justify-center gap-2 mt-4">
              <button onClick={()=> navigate('/')} type="button" className="btn">
                Cancel
              </button>
              <button onClick={()=>{
              setTimeout(() => {
                navigate('/')
              }, 500)
              }} type="submit" className="btn">
                {loading ? "Add Product" : "Adding..."}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
