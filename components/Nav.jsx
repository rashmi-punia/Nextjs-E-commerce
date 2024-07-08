"use client";

import Link from "next/link";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Badge, MenuItem} from "@mui/material";
import { AiFillDelete, AiOutlineShoppingCart } from "react-icons/ai";
import { useGlobal } from "@app/context/page";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const { cart, removeFromCart } = useGlobal();


  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="w-full px-12 bg-pink-800 text-white mb-16 py-4 flex-between">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      <div className={` search_input`} tabIndex="0">
        <FiSearch className="inline-flex size-5 align-bottom " />
        <input
          type="text"
          placeholder="Type Saree,kurti.."
          name="search"
          onChange={(e) =>
            dispatch({
              type: FILTER_BY_SEARCH,
              payload: e.target.value,
            })
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="px-4 outline-none"
        />
      </div>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            

            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex flex-col ">
                  <Badge
                    color="primary"
                    badgeContent={cart.items.length}
                    className="ml-1.5"
                  >
                    <AiOutlineShoppingCart className="size-5" />
                  </Badge>
                  <span>Cart</span>
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 overflow-hidden w-[17vw] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {cart.items.length > 0 ? (
                  <>
                    {cart.items.slice(0, 5).map((item) => (
                      <MenuItem>
                        <span
                          key={item.product._id}
                          className="flex space-x-2 p-1.5 justify-between w-full"
                        >
                          <img
                            src={item.product.images[0]}
                            className="cartItemImg rounded-full w-14 h-14 object-cover "
                            alt={item.product.title}
                          />
                          <div className="flex-1 flex flex-col">
                            <span className="text-lg text-gray-500 text-nowrap truncate">
                              {item.product.title}
                            </span>
                            <span className="text-sky-600">
                              ${item.product.discountPrice}
                            </span>
                          </div>
                          <AiFillDelete
                            className="size-5 text-red-500"
                            onClick={() => removeFromCart(item.product._id)}
                          />
                        </span>
                      </MenuItem>
                    ))}
                    {cart.length - 5 > 0 && (
                      <div>And {cart.length - 5} more items...</div>
                    )}
                    <p>
                      <Link href="/cart" className="bg-blue-400 text-white w-full p-1.5 hover:bg-blue-500 ">
                        Go to Cart
                      </Link>
                    </p>
                  </>
                ) : (
                  <div className="p-2 text-pink-800">Cart is Empty</div>
                )}
              </MenuItems>
            </Menu>

            <Link href="/create-item.productuct" className="black_btn">
              Become a seller
            </Link>
            

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                alt="R"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => {
                setToggleDropDown((prev) => !prev);
              }}
            />

            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/cart"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Cart
                </Link>
                <Link
                  href="/create-item.productuct"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Sell Your item.productuct
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="mt-3 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
