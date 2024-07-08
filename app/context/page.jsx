"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
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

  return (
    <GlobalContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
