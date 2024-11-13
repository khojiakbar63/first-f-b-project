import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { useParams } from "react-router";
import "./style.css";
import axios from "axios";

const DetailedProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getData = async () => {
      const res = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_BASE_URL}/products/${id}`,
      });
      setProduct(res.data.data || {});
    };
    getData();
    console.log(product)
  }, []);

  return (
    <>
      <Header />
      <div className="hero bg-base-200 min-h-[calc(100vh-70px)]">
        <div className="hero-content flex-col lg:flex-row-reverse gap-6">
          <img
            src={product.imgUrl}
            className="w-[40%] !max-h-[300px] rounded-lg shadow-2xl"
          />
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold text-[#789DBC]">
              {product.title ? product.title : "Loading..."}
            </h1>
            <p className="py-6">
              {product.description}
            </p>

            <div className="flex flex-col gap-[10px] mb-[24px]">

              <strong className="text-[20px]"><span className="underline">Category:</span> {product.category}</strong>
              <strong className="text-[20px]"><span className="underline">Price:</span> ${product.price}</strong>
              <strong className="text-[20px] text-[#50B498]"><span className="underline">Sale:</span> {product.discount}%</strong>
            </div>
            <button className="btn btn-primary w-fit">Add to cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedProduct;
