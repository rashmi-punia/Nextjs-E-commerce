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
