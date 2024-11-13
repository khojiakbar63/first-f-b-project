import axios from "axios";
import { useEffect, useState } from "react";

const UseProductsFeatures = () => {
  const [data, setData] = useState([]); // Initialize data as an empty array
  const [loadMore, setLoadMore] = useState(12);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const allData = async () => {
      const category =
        selectedCategory === "all" ? "" : `category=${selectedCategory}`;

      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/products?limit=${loadMore}&${category}`
        );
        setData(res?.data?.data || []); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    allData();
  }, [loadMore, selectedCategory]);

  const loadHandler = () => {
    setLoadMore(loadMore + 4);
  };

  return {
    data,
    loading,
    loadHandler,
    setSelectedCategory,
  };
};

export default UseProductsFeatures;
