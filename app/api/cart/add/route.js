import { connectdb } from "@utils/database";
import Cart from "@models/cartModel";
import Product from "@models/productModel";

export const POST = async (req) => {
  try {
    await connectdb();

    const { userId, productId, quantity } = await req.json();

    const product = await Product.findById(productId)

    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }

    let cart = await Cart.findOne({ user: userId })
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    )

    if (existingItem) {
      existingItem.quantity += 1;

      // existingItem.totalPrice = existingItem.quantity * product.discountPrice;
    } else {
      // const totalPrice = quantity * product.discountPrice;

      cart.items.push({ product: productId, quantity, });
    }

    await cart.save();

    return new Response(JSON.stringify(cart));

  } catch (error) {
    console.error("Error adding to cart:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};

export const PATCH = async (req) => {
  try {
    await connectdb();

    const { userId, productId, quantity } = await req.json();

    const product = await Product.findById(productId)

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return new Response(JSON.stringify({ message: "Cart not found" }), {
        status: 404,
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (item) {
      item.quantity -= 1;
      // item.totalPrice = item.quantity * product.discountPrice;

      await cart.save();

       return new Response(JSON.stringify(cart), { status: 200 });

      }else{

        return new Response(
          JSON.stringify({ message: "item not found in cart" }),
          {
            status: 404,
          }
        );
      }

  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
