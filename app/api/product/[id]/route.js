import Product from "@models/productModel";
import { connectdb } from "@utils/database";


export const DELETE = async(req, {params}) => {
    try {
        await connectdb()

        await Product.findByIdAndDelete(params.id)
        return new Response('Product deleted Succesfully',{
            status : 200
        })
    } catch (error) {
        return new Response("Failed to delete", {
          status: 500,
        });
    }
}