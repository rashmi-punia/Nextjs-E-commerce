"use client"

// import { Elements } from "@stripe/react-stripe-js"
// import { loadStripe } from "@stripe/stripe-js"
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

import Head from "next/head"
import Script from "next/script"

const Payment = () => {
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
    </div>
  );
}

export default Payment
