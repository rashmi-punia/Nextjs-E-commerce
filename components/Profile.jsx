import React from "react";
import ProductCard from "./ProductCard";

const Profile = ({ name, desc, data, handleDelete, handleUpdate }) => {
  console.log(data);

  return (
    <section className="px-10 rounded glassmorphism mx-12">
      <h1 className="head_text">
        <span>{name} Profile</span>
      </h1>
      <p className="desc">{desc}</p>
      <div className="mt-10 *:bg-white  flex-wrap w-full flex gap-3 ">
      {
        data.length === 0 ? (
<p className="p-4 text-3xl font-light">No Products</p>
        ): (
<>

        {data.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ))}
</>
        )
      }
      </div>
    </section>
  );
};

export default Profile;
