import React from "react";
import { Badge } from "../../components";
import { Link } from "react-router-dom";
import axios from "axios";

const index = ({ product }) => {
  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this product?")) {
        const res = await axios({
          method: "DELETE",
          url: `${import.meta.env.VITE_BASE_URL}/products/${id}`,
        });
        if (res.data.message === "Product deleted") {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      key={product.id}
      className="card card-compact bg-base-100 max-w-[300px] h-[360px] shadow-xl"
    >
      <figure>
        <img className="h-[200px]" src={product.imgUrl} alt={product.name} />
        <Badge
          discount={product.discount}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          {product.category}
        </Badge>
      </figure>

      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <h3 className="text-2xl font-bold text-gray-500">${product.price}</h3>
        <div className="card-actions flex justify-between">
          <div className="flex items-center gap-1">
            <Link to={`/detailed-product/${product.id}`}>
              <button className="btn btn-sm btn-success text-white">
                View
              </button>
            </Link>
            <Link to={`/edit-product/${product.id}`}>
              <button className="btn btn-sm btn-primary text-white">
                Edit
              </button>
            </Link>
          </div>
          <button
            onClick={() => handleDelete(product.id)}
            className="btn btn-sm btn-error text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;
