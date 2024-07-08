"use client"

import { useState,useEffect } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React from 'react'
import axios from "axios";
import Profile from "@components/Profile";

const UserProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [products, setProducts] = useState([]);

    console.log(products);

    const handleUpdate=()=>{

    }

    const handleDelete= async(product)=>{
        const hasConfirmed = confirm("Are you sure you want to delete this product permanently?")
        if(hasConfirmed){
            try {
                await axios.delete(`/api/product/${product._id.toString()}`)

                const filteredProducts= products.filter((p) => p._id !== product._id)
                setProducts(filteredProducts)
            } catch (error) {
                console.log(error);
                console.log('error occured to delete');
            }
        }

    }

    useEffect(() => {
        const fetchProducts = async() => {
            const {data} = await axios.get(`/api/users/${session?.user.id}/products`)

            setProducts(data)
        }
        if(session?.user.id){
            fetchProducts()
        }
    },[])

    if(products.length === 0) {
        setTimeout(() => {
            router.push('/')
        },5000)
    }

  return (

   <Profile 
   name="my"
   desc="Welcome !"
   data={products}
   handleDelete={handleDelete}
   handleUpdate={handleUpdate}
    />
  )
}

export default UserProfile
