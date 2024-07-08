"use client";

import { useGlobal } from "@app/context/page";
import { Button, FormControl } from "@mui/material";
import Lottie from "lottie-react";
import Link from "next/link";
import animation from "../public/assets/animation.json";

const CartList = ({updateCartItemQty}) => {
  const { cart, removeFromCart, addToCart } = useGlobal();

return (    
        <div className="space-y-2 flex-grow">

          {cart.items.length === 0 ? (
            <div className="w-[40vw] mx-auto overflow-hidden">
              <Lottie animationData={animation} loop autoplay className="" />
            </div>
          ) : (
            <>
              {cart.items.map((prod) => (
                <div className="flex bg-white text-gray-600 p-3 border rounded ">
                  <div className="w-[10vw]  overflow-hidden ">
                    <img
                      src={prod.product.images[0]}
                      className="object-cover h-full object-center"
                    />
                  </div>
                  <div className="w-full px-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline divide-x-2 ">
                        <div className="text-xl mr-2">{prod.product.title}</div>
                        <div className="px-2">{prod.product.category}</div>
                      </div>
                      <Button color="error"
                        onClick={() => removeFromCart(prod.product._id)}
                        className="text-red-500"
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-lg">
                        ${prod.product.discountPrice}
                      </span>
                      <s>${prod.product.price}</s>
                      <span className="text-green-600">
                        {prod.product.discountPercentage}% off
                      </span>
                    </div>


                    <div className="flex gap-3 items-baseline">
                        <Button color="error" variant="outlined" className="border-red-700 size-10" disabled={prod.quantity === 1} onClick={()=> updateCartItemQty(prod.product._id, prod.quantity)}>-</Button>
                        <span className="">{prod.quantity}</span>
                        <Button color="secondary" variant="outlined" disabled={prod.quantity >= prod.product.stock} onClick={()=> addToCart(prod.product._id, prod.quantity)}>+</Button>
                    </div>

                    {/* <FormControl
                      as="select"
                      value={prod.product.qty}
                      // onChange={(e) => {updateCartItemQty(prod.product._id, e.target.value)}}
                      //   onClick={(e) =>
                      //     dispatch({
                      //       type: CHANGE_CART_QTY,
                      //       payload: {
                      //         _id: prod.product._id,
                      //         qty: e.target.value,
                      //       },
                      //     })
                      //   }
                      className="bg-slate-50 w-14  rounded  focus:outline-none focus:ring-4 focus:ring-indigo-300  "
                    >
                      {[...Array(prod.product.stock).keys()].map((x) => (
                        <option key={x + 1} className="bg-white p-2">
                          {x + 1}
                        </option>
                      ))}
                    </FormControl> */}

                    <p className="truncate">{prod.product.description}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

  );
};

export default CartList;
