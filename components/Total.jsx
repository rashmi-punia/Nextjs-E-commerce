import { useGlobal } from '@app/context/page';
import { Button } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Total = () => {
    const {cart} = useGlobal();

    const [total, setTotal] = useState();
    const [totalActualPrice, setTotalActualPrice] = useState();
    const [totalDiscountPercent, setTotalDiscountPercent] = useState();


    useEffect(()=>{

      if(cart && cart.items.length>0){

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

         const totalActualPrice = cart.items.reduce((acc, curr) => {
           const price = Number(curr.product.price);
           const quantity = Number(curr.quantity);

           if (!isNaN(price) && !isNaN(quantity)) {
             return acc + price * quantity;
           } else {
             console.error(
               "Invalid price or quantity:",
               curr.product.price,
               curr.quantity
             );
             return acc;
           }
         }, 0);
         const totalDiscountPercent = cart.items.reduce((acc, curr) => {
           const price = Number(curr.product.discountPercentage);
           const quantity = Number(curr.quantity);

           if (!isNaN(price) && !isNaN(quantity)) {
             return acc + price * quantity;
           } else {
             console.error(
               "Invalid price or quantity:",
               curr.product.discountPercentage,
               curr.quantity
             );
             return acc;
           }
         }, 0);



         setTotal(total);
         setTotalActualPrice(totalActualPrice)
         setTotalDiscountPercent(totalDiscountPercent)
      }

    },[cart])

    console.log(total);
    // console.log(cart);


  return (
    <div className="w-[25vw] *:py-2 shadow  bg-gray-100/45 text-slate-800  rounded">
      <h3 className="font-semibold text-lg">
        Price Details ({cart.items.length} items)
      </h3>
      <div className="">
        Total Price
        <span className="float-right mr-4"> {totalActualPrice} </span>
      </div>
      <div className="text-green-600">
        Total Discount
        <span className="float-right mr-4"> {totalDiscountPercent}%</span>
      </div>

      <div className="font-semibold border-t-2 text-lg ">
        Subtotal <span className="float-right mr-4"> $ {total}</span>
      </div>

      <div className="w-full font-semibold text-white">
        <Button
          variant="contained"
          color="success"
          disabled={cart.length === 0}
          className="w-full"
        >
          Procedd to checkout
        </Button>
      </div>
      <div className="text-center ">
        {" "}
        or
        <Link href="/" className="hover:underline -pt-2 text-blue-700 ">
          {" "}
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default Total
