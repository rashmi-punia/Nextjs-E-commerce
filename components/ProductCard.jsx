"use client";

import { useGlobal } from "@app/context/page";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { BsFillStarFill } from "react-icons/bs";

const ProductCard = ({ product, handleDelete, handleUpdate }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const { addToCart, removeFromCart, cart } = useGlobal();

  return (
    <div
      key={product._id}
      className="group flex flex-col border p-1 min-w-50 max-w-70 w-[18vw] *:rounded rounded-lg overflow-hidden"
    >
      <div className="h-[35vh]  relative overflow-hidden flex items-center justify-center">
        <img
          src={product.images[0]}
          className="object-cover relative h-full w-full object-center group-hover:opacity-85"
        />
        {product.stock ? (
          <span className="bg-gray-100 p-1.5 text-xs rounded-tl-xl absolute bottom-0 right-0">
            +{product.stock} More
          </span>
        ) : (
          <span className="bg-indigo-400 text-white p-1.5 text-xs rounded-tl-xl absolute bottom-0 right-0">
            Out of stock
          </span>
        )}
      </div>
      <div whileHover={{ y: -5 }} className="p-2  flex-1">
        <div className="bg-sky-400 text-white w-fit text-sm px-2 rounded-full">
          {product.category}
        </div>
        <div className="text-slate-600 text-nowrap truncate mr-3 text-xl">
          {product.title}
        </div>
        <div>{product.brand}</div>
        <div className="space-x-2">
          <span className="text-xl">${product.discountPrice}</span>
          <s>${Math.floor(product.price)}</s>
          <span className="text-green-600 text-lg">
            {product.discountPercentage} %
          </span>
          <p>{product.id}</p>
        </div>
        <div className="bg-gray-100 rounded-2xl my-1 text-sm w-fit px-2">
          {product.isFreeDelivery
            ? "FreeDelivery"
            : product.deliveryCharge + "$ delivery"}
        </div>
        <span className="bg-green-500 text-white px-2 rounded-2xl">
          {product.ratings}{" "}
          <BsFillStarFill className="inline-flex align-baseline size-3 text-white" />{" "}
        </span>
        <span className="text-xs mx-2"> {product.reviews} Reviews</span>

        { pathName === "/profile" ? (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleUpdate(product)}
            >
              Update
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete(product)}
            >
              Delete
            </p>
          </div>
        ) : (
          <div className="flex space-x-2 mt-1.5">
            {cart.items.some((item) => item.product._id === product._id) ? (
              <button
                onClick={() => removeFromCart(product._id)}
                className="remove_cart_btn"
              >
                Remove from cart
              </button>
            ) : (
              <>
                <button
                  onClick={() => addToCart(product._id, 1)}
                  disabled={!product.stock}
                  className="add_cart_btn"
                >
                  Add to cart
                </button>
              </>
            )}
          </div>
        )}

        {/* {session?.user.id === productM.creator._id && pathName === "/profile" ? (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleUpdate}
            >
              Update
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        ) : (
          <div className="flex space-x-2 mt-1.5">
            <button
             

              className="remove_cart_btn"
            >
              Remove from cart
            </button>

            <>
              <button disabled={!product.stock} className="add_cart_btn">
                Add to cart
              </button>
            </>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ProductCard;
