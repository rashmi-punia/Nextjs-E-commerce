import { connectdb } from "@utils/database";

import Product from "@models/productModel";

export const GET = async(req) => {
    try {
        await connectdb()

        const products = await Product.find({}).populate('creator')

        // if(req.query.search){
        //     const filteredProducts = products.filter(product=>
        //         product.title.includes(req.query.search)
        //     )
        //     return new Response(JSON.stringify(filteredProducts),{
        //         status: 200
        //     })
        //     return
        // }

        return new Response(JSON.stringify(products),{
            status : 200
        })
    } catch (error) {
        return new Response('Failed to fetch all products' ,{
            status: 500
        })
        
    }
}