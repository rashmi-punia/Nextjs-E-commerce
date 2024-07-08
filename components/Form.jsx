import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { MdCancel } from "react-icons/md";

const Form = ({ type, product, setProduct, submitting, handleSubmit,picMessage,postDetails }) => {
  const [colorInput, setColorInput] = useState("");

  const resetHandler = () => {
    setProduct({
      title: "",
      description: "",
      price: 0,
      discountPercentage: 0,
      seller: "",
      brand: "",
      stock: 1,
      images: [],
      colors: [],
      sizes: [],
      category: "",
      ratings: 0,
      reviews: 0,
      isFreeDelivery: false,
      deliveryCharge: function () {
        return this.isFreeDelivery ? null : 0;
      },
    });
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    setProduct((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleImageChange = async(e) => {

    const files = Array.from(e.target.files);
    const validFiles = await postDetails(files);
    setProduct((prev) => ({
      ...prev,
      images: validFiles,
    }));
  };

  const handleColorsChange = (e) => {
    const newColor = e.target.value;
    setProduct((prev) => ({
      ...prev,
      colors: Array.from(
        new Set([...prev.colors, newColor.trim().toLowerCase()])
      ),
    }));
  };

  const handleSizesChange = (e) => {
    const newSize = e.target.value;
    setProduct((prevData) => ({
      ...prevData,
      sizes: Array.from(new Set([...prevData.sizes, newSize])),
    }));
  };

  return (
    <section className="w-fit mb-12 mx-auto *:px-8  lassmorphism max-w-full ">
      <h1 className="head_text text-center">
        <span className="">{type} Product</span>
      </h1>
      <p className="desc mb-4 max-w-md">
        {type} and sell your products with large number of cutomers
      </p>
      <form onSubmit={handleSubmit} className="w-full gap-4 max-w-2xl">
        <div>
          <label htmlFor="title" className="text-gray-900">
            Enter title
          </label>
          <div className="mt-2">
            <input
              id="title"
              name="title"
              type="text"
              value={product.title}
              required
              placeholder="Title"
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="price" className="text-gray-900">
            Enter Product Price
          </label>
          <div className="mt-2">
            <input
              id="price"
              name="price"
              type="number"
              value={product.price}
              required
              min={1}
              placeholder="like 230"
              onChange={(e) => {
                const newPrice = parseFloat(e.target.value);
                if (isNaN(newPrice)) {
                  console.error("Invalid price. Please enter a number.");
                  return;
                }
                setProduct((prevData) => ({
                  ...prevData,
                  price: newPrice,
                }));
              }}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="discountPercentage" className="text-gray-900">
            Enter Discount in Percentage
          </label>
          <div className="mt-2">
            <input
              id="discountPercentage"
              name="discountPercentage"
              type="number"
              value={product.discountPercentage}
              min={1}
              max={99}
              required
              placeholder="like 230"
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="seller" className="text-gray-900">
            Seller name
          </label>
          <div className="mt-2">
            <input
              id="sellerr"
              name="seller"
              type="text"
              required
              value={product.seller}
              placeholder="Seller name"
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="brand" className="text-gray-900">
            Brand
          </label>
          <div className="mt-2">
            <input
              id="brand"
              name="brand"
              type="text"
              required
              value={product.brand}
              placeholder="Brand name"
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="category" className="text-gray-900">
            Category
          </label>
          <div className="mt-2">
            <input
              id="category"
              name="category"
              type="text"
              required
              value={product.category}
              placeholder="Category"
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="stock" className="text-gray-900">
            Stock
          </label>
          <div className="mt-2">
            <input
              id="stock"
              name="stock"
              type="number"
              required
              min={1}
              value={product.stock}
              placeholder="In Stock"
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="ratings" className="text-gray-900">
            Rating
          </label>
          <div className="mt-2">
            <input
              id="ratings"
              name="ratings"
              type="number"
              required
              min={0}
              max={5}
              value={product.ratings}
              placeholder="Rating"
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="reviews" className="text-gray-900">
            Review
          </label>
          <div className="mt-2">
            <input
              id="reviews"
              name="reviews"
              type="number"
              min={1}
              required
              value={product.reviews}
              placeholder="review"
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="images" className="text-gray-900">
            Images
          </label>
          <div className="mt-2">
          {picMessage && <p>{picMessage}</p>}
            <input
              id="images"
              accept="image/jpeg,image/png"
              multiple
              type="file"
              name="images"
              required
              placeholder="Images"
              onChange={handleImageChange}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div>
            {product.images.length>0 && (
<div className="flex flex-wrap gap-3 mt-2 *:rounded-sm">

              {product.images.map((img, index) => (
                <img src={img} alt="Product image" width={50} height={40} />
              ))}
</div>
            )}
            </div>
          </div>
        </div>

        <div className="mt-2">
          <label className="text-gray-900">Colors</label>
          <select
            // multiple
            onChange={handleColorsChange}
            className=" border bg-gray-100 rounded px-2 py-0.5 mx-2"
          >
            <option value="Red">Red</option>
            <option value="Green">Green</option>
            <option value="Blue">Blue</option>
            <option value="Yellow">Yellow</option>
          </select>
          <ul className="p-1 my-2 *:bg-purple-400 *:py-0.5 *:px-1.5 *:rounded flex flex-wrap gap-1 *:my-1">
            {product.colors.map((color, index) => (
              <li
                key={index}
                className={`capitalize text-white bg-${color}-600`}
              >
                {color}
                <MdCancel
                  className="inline-flex ml-1 size-4 cursor-pointer"
                  onClick={() => {
                    setProduct((prev) => ({
                      ...prev,
                      colors: prev.colors.filter((clr) => clr !== color),
                    }));
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-2">
          <label>Sizes</label>
          <select
            onChange={handleSizesChange}
            className=" border bg-gray-100 rounded px-2 py-0.5 mx-2"
          >
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">X-Large</option>
          </select>
          <ul className="p-1 my-2 text-white *:bg-pink-400  *:py-0.5 *:px-1.5 *:rounded flex flex-wrap space-x-1 *:my-1">
            {product.sizes.map((size, index) => (
              <li key={index}>
                {size}
                <MdCancel
                  className="inline-flex ml-1 size-4 cursor-pointer"
                  onClick={() => {
                    setProduct((prev) => ({
                      ...prev,
                      sizes: prev.sizes.filter((sz) => sz !== size),
                    }));
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <input
            id="freeDelivery"
            type="checkbox"
            checked={product.isFreeDelivery}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                isFreeDelivery: !prev.isFreeDelivery,
              }))
            }
          />
          <label htmlFor="freeDelivery" className="px-1.5 text-gray-900">
            Free delivery
          </label>
        </div>

        <div>
          <label htmlFor="deliveryCharge" className="text-gray-900">
            Delivery charge
          </label>
          <div className="mt-2">
            <input
              id="deliveryCharge"
              name="deliveryCharge"
              type="text"
              min={0}
              value={product.deliveryCharge}
              disabled={product.isFreeDelivery}
              placeholder="Delivery charge"
              onChange={(e)=> {
                setProduct((prev)=> ({
                  ...prev,deliveryCharge: Number(e.target.value)
                }))
              }}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-2 mt-2">
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows={4}
            required
            className="border w-full my-1"
          ></textarea>
        </div>
        <div className="col-span-2 mt-3 justify-center gap-3 flex">
          <button
            type="submit"
            className="add_cart_btn"
          >
            Submit
          </button>
          <button
            onClick={resetHandler}
            className="remove_cart_btn"
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
