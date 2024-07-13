import Cart from "@models/cartModel";
import { connectdb } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectdb();

    const userId = params.id;

    const cart = await Cart.findOne({
      user: userId,
    }).populate("items.product");

    if (!cart) {
      return new Response(JSON.stringify({ message: "cart not found" }), {
        status: 404,
      });
    }

      const total = cart.items.reduce((acc, curr) => {
        const price = Number(curr.product.discountPrice);
        const quantity = Number(curr.quantity);

        if (!isNaN(price) && !isNaN(quantity)) {
          return acc + price * quantity;
        } else {
          console.error(
            "Invalid price or quantity:",
            curr.product.discountPrice,
            curr.quantity
          );
          return acc;
        }
      }, 0);

      cart.totalPrice = total;
      await cart.save();


    return new Response(JSON.stringify(cart), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
    });
  
  }
};
