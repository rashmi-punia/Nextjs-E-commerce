import Product from "@models/productModel";
import { connectdb } from "@utils/database";
export const POST = async(req) => {
    try {
    const {
      title,
      description,
      price,
      discountPercentage,
      seller,
      brand,
      stock,
      images,
      colors,
      sizes,
      ratings,
      reviews,
      isFreeDelivery,
      category,

      userId
    } = await req.json();

    let discountPrice = price;
    if(discountPercentage){
            discountPrice = price - price * (discountPercentage / 100);

    }

        await connectdb()
        const newProduct = new Product({
          title,
          description,
          price,
          discountPercentage,
          seller,
          brand,
          stock,
          images,
          colors,
          sizes,
          ratings,
          reviews,
          isFreeDelivery,
          category,

          creator: userId,
        });

        await newProduct.save();

        return new Response(JSON.stringify(newProduct),{
            status : 201
        })
    } catch (error) {
            return new Response(error, {
              status: 500,
            });

    }
}