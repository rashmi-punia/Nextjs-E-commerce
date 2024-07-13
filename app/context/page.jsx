"use client";

import { createContext, useContext, useState, useEffect, useReducer } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
// import { productReducer } from "@reducers/filterSlice";
import { filterProductReducer } from "@reducers/productReducer";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const controller = new AbortController();

      fetchCart();
    }
  }, [session, cart]);

  // console.log(cart);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(`/api/users/${session?.user.id}/carts`);
      setCart(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const { data } = await axios.post("/api/cart/add", {
        productId,
        quantity,
        userId: session?.user.id,
      });
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete("/api/cart/remove", {
        data: {
          productId,
          userId: session?.user.id,
        },
      });
      console.log("removed succesfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [productState,productDispatch] = useReducer(filterProductReducer,{
    byStock: false,
    byFreeDelivery: false,
    byRating: 0,
    searchQuery:"",
    

  })

  return (
    <GlobalContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        productDispatch,productState
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
