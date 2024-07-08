"use client";

import Form from "@components/Form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateProduct = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [picMessage, setPicMessage] = useState("");

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    seller: "",
    brand: "",
    stock: 0,
    images: [],
    colors: [],
    sizes: [],
    ratings: 0,
    reviews: 0,
    isFreeDelivery: false,
    category: "",
  });

  // console.log(session);
  // console.log(product.images);

  const postDetails = async (pics) => {
    const uploadedImages = [];
    for (let pic of pics) {
      if (!pic) {
        setPicMessage("Please Select an Image");
        return uploadedImages;
      }
      setPicMessage(null);
      if (pic.type === "image/jpeg" || pic.type === "image/png") {
        const data = new FormData();
        data.append("file", pic);
        data.append("upload_preset", "TaskManage");
        data.append("cloud_name", "taskpic");
        try {
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/taskpic/image/upload",
            {
              method: "post",
              body: data,
            }
          );
          const result = await res.json();
          uploadedImages.push(result.url.toString());
        } catch (err) {
          console.error(err);
          setPicMessage("Image upload failed");
        }
      } else {
        setPicMessage("Please Select an Image");
      }
    }
    return uploadedImages;
  };

  const createProduct = async (e) => {
    e.preventDefault();

    const uploadedImages = await postDetails(product.images);
    //  if (uploadedImages.length !== product.images.length) {
    //    alert("Some images failed to upload.");
    //    return;
    //  }

    const payload = {
      ...product,
      userId: session?.user.id,
      images: uploadedImages,
    };

    try {
      const response = await axios.post("api/product/new", payload);

      if (response) {
        setSubmitting(false);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }

    setSubmitting(true);
  };

  return (
    <Form
      type="Create"
      product={product}
      setProduct={setProduct}
      submitting={submitting}
      handleSubmit={createProduct}
      picMessage={picMessage}
      postDetails={postDetails}
    />
  );
};

export default CreateProduct;
