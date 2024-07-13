"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useGlobal } from "@app/context/page";
import SortPop from "./SortFilter";
import Filters from "./Filters";

const ProductCardList = ({ data }) => {
  return (
    <div className="flex justify-center flex-wrap gap-4">
      {data.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};
const Feed = () => {
  const {
    productState: {
      sort,
      byStock,
      byFreeDelivery,
      searchQuery,
      byDiscount,
      byRating,
    },
  } = useGlobal();

  const [products, setProducts] = useState([]);
  const [transformedProducts, setTransformedProducts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResutls] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product");
      setProducts(data);
    } catch (error) {
      console.log("error occured");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const transformProducts = () => {
    if (!products || products.length === 0) {
      console.log("Product array is empty or undefined");
      return [];
    }
    let sortedProducts = [...products];

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh"
          ? a.discountPrice - b.discountPrice
          : b.discountPrice - a.discountPrice
      );
    }

    if (byDiscount) {
      sortedProducts = sortedProducts.sort(
        (a, b) => b.discountPercentage - a.discountPercentage
      );
    }
    if (byRating) {
      sortedProducts = sortedProducts.sort((a, b) => b.ratings - a.ratings);
    }

    if (byFreeDelivery) {
      sortedProducts = sortedProducts.filter(
        (product) => product.isFreeDelivery
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery)
      );
    }

    sortedProducts = sortedProducts.map((product) => ({
      ...product,
    }));

    console.log(sortedProducts);
    return sortedProducts;
  };

  return (
    <section className="flex justify-between">
      <div className="sticky top-4 left-0 h-screen  px-2 border-r-2  bg-white/30">
        <SortPop />
        <Filters />
      </div>

      {<ProductCardList data={transformProducts()} />}
    </section>
  );
};

export default Feed;
