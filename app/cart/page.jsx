"use client"

import CartList from '@components/CartList'
import axios from 'axios'
import React from 'react'
import { useSession } from 'next-auth/react'
import Total from '@components/Total'

const Cart = () => {

    const { data : session } = useSession()

    const updateCartItemQty = async(productId, quantity) => {
        try {
            
            const {data} = await axios.patch('/api/cart/add',{
                productId, quantity,
                userId: session?.user.id,
            })
        } catch (error) {
            console.error('Error updating cart item qty', error)
        }

    }
  return (
     <div className="bg-gray-50/45">
      <div className="space-y-3 space-x-5 flex justify-between  items-start shadow-sm  my-20 py-5 px-24 *:p-3  rounded">

    <CartList updateCartItemQty={updateCartItemQty} />

    <Total />
    
      </div>

      
    </div>
  )
}

export default Cart
