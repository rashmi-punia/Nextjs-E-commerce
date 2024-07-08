import { connectdb } from "@utils/database";

import Product from "@models/productModel";

export const GET = async(req) => {
    try {
        await connectdb()

        const products = await Product.find({}).populate('creator')

        return new Response(JSON.stringify(products),{
            status : 200
        })
    } catch (error) {
        return new Response('Failed to fetch all products' ,{
            status: 500
        })
        
    }
}