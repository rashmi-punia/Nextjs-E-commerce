import Cart from "@models/cartModel"
import { connectdb } from "@utils/database"

export const DELETE = async(req) => {
    try {
      await  connectdb()

        const {userId, productId } = await req.json()
        let cart = await Cart.findOne({ user : userId })
        if(!cart){
            return new Response(JSON.stringify({ message: "Cart not found" }), {
              status: 404,
            });
        }

         cart.items = cart.items.filter(
           (item) => item.product._id.toString() !== productId
         );

         await cart.save();

         return new Response(JSON.stringify(cart), {
           status: 200,
         });

    } catch (error) {
       console.error("Error removing from cart:", error);
       return new Response(
         JSON.stringify({ message: "Internal Server Error" }),
         {
           status: 500,
         }
       ); 
    }
}