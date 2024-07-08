"use client"

import axios from "axios";
import { useEffect, useState } from "react"
import ProductCard from "./ProductCard";
import Filters from "./Filters";


const ProductCardList =({ data }) => {
    return (
        <div className="flex justify-start  flex-wrap gap-4 mx-10">
            {data.map((product) => (
<ProductCard 
key={product._id} product={product}  />
            ))}
        </div>
    )
}
const Feed = () => {
    const [products,setProducts] = useState([])

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResutls] = useState([]);


  // console.log(products);
  const fetchProducts = async() => {
    try {
      const { data } = await axios.get('/api/product')
      setProducts(data)
      
    } catch (error) {
     console.log('error occured'); 
     console.log(error);
    }

  }

  useEffect(() => {
    fetchProducts()
  }, [])




  return (
    <section>
    {/* <Filters /> */}



 {
    <ProductCardList data={products} />
 }
      
    </section>
  )
}

export default Feed
