import axios from "axios";
import React, { useEffect, useState } from "react";

const index = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    discount: "",
    imgUrl: "",
  });

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios({
        method: "GET",
        url: "http://localhost:4000/api/category",
      });
      setCategories(res.data.data);
    };
    fetchCategory();
  }, []);

  const onChange = (e) => {
    console.log("Name:", e.target.name);
    console.log("Value", e.target.value);
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: "http://localhost:4000/api/products",
        data: {
          ...data,
          price: Number(data.price),
          discount: Number(data.discount),
        },
      });

      if (res.status === 201) {
        document.getElementById("my_modal_4").close();
        window.location.reload();
        setLoading(false);
        setData({
          title: "",
          price: "",
          description: "",
          category: "",
          discount: "",
          imgUrl: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    document.getElementById("my_modal_4").close();
  };

  return (
    <div>
      <button
        className="btn btn-success text-white"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        Add New Product
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl flex flex-col items-center justify-center">
          <h3 className="font-bold text-lg">ADD NEW PRODUCT!</h3>
          <p className="py-4">Enter details by filling the form below!</p>
          <div className="modal-action">
            <form onSubmit={onSubmit} method="dialog" className="w-[600px]">
              {/* Title */}
              <label className="form-control w-full">
                <input
                  onChange={onChange}
                  name="title"
                  type="text"
                  placeholder="Title"
                  className="input input-bordered "
                />
                <div className="label"></div>
              </label>
              {/* Category */}
              <select
                onChange={onChange}
                name="category"
                className="select select-bordered w-full"
              >
                <option disabled selected>
                  Category
                </option>

                {categories.map((category) => {
                  return (
                    <option value={category} key={category}>
                      {
                        (category =
                          category.slice(0, 1).toUpperCase() +
                          category.slice(1))
                      }
                    </option>
                  );
                })}
              </select>
              {/* Price */}
              <label className="form-control">
                <div className="label"></div>
                <input
                  onChange={onChange}
                  name="price"
                  type="text"
                  placeholder="Price"
                  className="input input-bordered"
                />
                <div className="label"></div>
              </label>

              {/* Discount */}
              <label className="form-control">
                <input
                  onChange={onChange}
                  name="discount"
                  type="text"
                  placeholder="Discount (%)"
                  className="input input-bordered"
                />
                <div className="label"></div>
              </label>
              {/* Img url */}
              <label className="form-control w-full">
                <input
                  onChange={onChange}
                  name="imgUrl"
                  type="text"
                  placeholder="Image URL"
                  className="input input-bordered"
                />
                <div className="label"></div>
              </label>

              {/* Description */}
              <textarea
                onChange={onChange}
                name="description"
                placeholder="Bio"
                className="textarea textarea-bordered textarea-md w-full"
              ></textarea>

              <div className="flex justify-center gap-2 mt-4">
                <button onClick={closeModal} type="button" className="btn">
                  Cancel
                </button>

                <button type="submit" className="btn">
                  {loading ? "Adding..." : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default index;
