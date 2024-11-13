import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditModal = ({ className, title }) => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    discount: "",
    imgUrl: "",
  });

  // Fetch categories on mount
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

  // Fetch product by ID and update form data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/${id}`);
        setProduct(res.data.data); // Set fetched product data
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  // Update form data when product changes
  useEffect(() => {
    if (product && isOpen) {
      setData({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        discount: product.discount,
        imgUrl: product.imgUrl,
      });
    }
  }, [product, isOpen]);

  // Handle form input changes
  const onChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_BASE_URL}/products/${id}`;
      const res = await axios.put(url, {
        ...data,
        price: Number(data.price),
        discount: Number(data.discount),
      });

      if (res.status === 200 || res.status === 201) {
        setLoading(false);
        setIsOpen(false); // Close modal
        navigate('/'); // Redirect to home or previous page
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setLoading(false);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    setIsOpen(false);  // Close modal
    navigate('/');     // Redirect to home or previous page
  };

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <Link className="absolute top-10 left-10" to={"/"}>
        <button className="btn btn-success text-white">Go Back</button>
      </Link>
      {isOpen && (
        <dialog className="modal-box w-11/12 max-w-5xl flex flex-col items-center justify-center" open>
          <h3 className="font-bold text-lg">Edit Product</h3>
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
                <button onClick={handleCancel} type="button" className="btn">
                  Cancel
                </button>
                <button type="submit" className="btn">
                  {loading ? "Loading..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default EditModal;
