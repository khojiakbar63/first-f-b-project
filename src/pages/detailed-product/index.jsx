import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { useParams } from "react-router";
import "./style.css";
import axios from "axios";
import { Link } from "react-router-dom";

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
    console.log(product);
  }, []);

  return (
    <>
      <Header />
      <div className="hero bg-base-200 min-h-[calc(100vh-70px)]">
        <div className="hero-content flex-col lg:flex-row-reverse bg-transparent rounded-[40px] h-[700px] relative">
          
          <div className="absolute top-10 left-0">
            <Link to={'/'}>
            <button className="btn btn-warning">BACK TO HOME</button>
            </Link>

          </div>
          <div className="flex flex-col w-[50%] h-[100%] justify-center">
            <div className="badge badge-error gap-2 text-white mb-6">
              HOTSALE: {product.discount}%
            </div>

            <div className="flex gap-10 items-end">
              <h1 className="text-5xl font-[500] text-[#fff] italic">
                {product.title ? product.title : "Loading..."}
              </h1>
              <h2 className="text-white font-bold text-[30px]">${product.price}</h2>
            </div>

            <p className="badge badge-warning gap-2 text-white">
              {product.category}
            </p>

            <h3 className="text-[#fff] text-bold text-xl mb-3">Description:</h3>
            <p className="text-[#fff] ml-6 mb-6 italic">- {product.description}</p>

            <div className="flex flex-col gap-[10px] mb-[24px]"></div>
            <div className="flex items-center justify-between">
              <button className="btn btn-primary w-fit">Add to cart</button>
            </div>
          </div>

          <div className=" w-[50%] h-[100%] flex items-center justify-center m-0">
            <img
              src={product.imgUrl}
              className=" rounded-lg shadow-2xl w-[80%]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedProduct;
