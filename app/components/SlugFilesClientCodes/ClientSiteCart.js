'use client'

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Wrapper from "@/app/components/Wrapper";
import CartItem from "@/app/components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { loadCartFromLocalStorage, clearCart } from "@/store/cartSlice";
import { makeCodPaymentRequest } from "@/utils/api";

export default function ClientSiteCart() {
    const { cartItems } = useSelector((state) => state.cart)
    const [cartLoading, setCartLoading] = useState(true); // Loading state
    const [loading, setLoading] = useState(false); 

        
    const dispatch = useDispatch();
    const router = useRouter();
    
    const subTotal = useMemo(() =>{
        return cartItems.reduce((total, val) => total + val.attributes.price, 0)
    }, [cartItems])


    // const handlePlaceOrder = async () => {
    //     try {
    //         setLoading(true)
    //         const paymentData = await makeCodPaymentRequest('/api/orders', {
    //             products: cartItems,
    //         });

    //         if (!paymentData.order) {
    //             throw new Error(`Failed to make payment: ${paymentData.error}`);
    //         }

    //         dispatch(clearCart())
    //         console.log('Payment Successful', paymentData);

    //         const { CodGatewayId } = await paymentData; // Extract CodGatewayId from response

    //         // Redirect to the dynamic success page with the CodGatewayId
    //         window.location.href = `/${CodGatewayId}/success/thank-you`;

    //     } catch (error) {
    //         setLoading(false);
    //         console.error(error.message);
    //         // Optionally, display an error message to the user
    //     }
    // };
    

    useEffect(() =>{
        dispatch(loadCartFromLocalStorage())
        setCartLoading(false); // Set loading to false after cart items are loaded
    }, [dispatch])

    if (cartLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <Image 
                src="/assets/logo.svg" 
                alt="Loading Logo"
                width={150} 
                height={150} 
                />
                <div className="text-lg font-medium mt-2">Loading your cart...</div>
            </div>
        );
    }


    const handleCheckOut = () => {
        router.push('/place-order')
    } 

  return (
    <div className="w-full md:py-20">
      <Wrapper>
      {cartItems.length > 0 &&( 
      
      <>
        {/* HEADING AND PARAGRAPH START */}
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Shopping Cart
          </div>
        </div>
        {/* HEADING AND PARAGRAPH END */}

        {/* CART CONTENT START */}
        <div className="flex flex-col lg:flex-row gap-12 py-10">
          {/* CART ITEMS START */}
          <div className="flex-[2]">
            <div className="text-lg font-bold">Cart Items</div>

            {cartItems.map((item) =>(
              <CartItem key={item.id} cartData={item} />
            ))}

            {/* <CartItem />
            <CartItem />
            <CartItem /> */}
          </div>
          {/* CART CONTENT END */}

          {/* SUMMARY START */}
          <div className="flex-[1]">
            <div className="text-lg font-bold">Summary</div>

            <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
              <div className="flex justify-between">
                <div className="uppercase text-md md:text-lg font-medium text-black">
                  Subtotal
                </div>
                <div className="text-md md:text-lg font-medium text-black">
                  &#8377;{subTotal}
                </div>
              </div>
              <div className="text-sm md:text-md py-5 border-t mt-5">
                The subtotal reflects the total price of your order, including
                duties and taxes, before any applicable discounts. It does not
                include delivery costs and international transaction fees.
              </div>
            </div>

            {/* BUTTON START */}
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
              onClick={handleCheckOut}
            >
              {loading ? "Placing Order..." : "Place Order"}
              {/* {loading && <img src="/assets/spinner.svg" alt="loading" />} */}
            </button>
            {/* BUTTON END */}

          </div>

          {/* SUMMARY END */}
        </div>
        {/* CART CONTENT END */}
      </>
      )}

        {/* This is empty screen */}
        {cartItems.length < 1 && (
          <div className="Empty_cart flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
          <Image
            src="/assets/empty-cart.jpg"
            alt="Cart Items"
            width={300}
            height={300}
            className="w-[300px] md:w-[400px]"
          />
          <span className="text-xl font-bold">Your cart is empty</span>
          <span className="text-center mt-4">
            Looks like you have not added anything in your cart.
            <br />
            Go ahead and explore top categories.
          </span>

          <Link
            href="/"
            className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
                Continue Shopping
            </Link>

        </div>
        )}

      </Wrapper>
    </div>
  )
}
