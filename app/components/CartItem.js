import Image from "next/image";
import React from "react";
import { updateCart, removeFromCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri"

export default function CartItem({ cartData }) {
  const cp = cartData.attributes;

  const dispatch = useDispatch()

  const updateCartItem = (e, key) => {
    let cartPayload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      id: cartData.id,
      selectedSize: cartData.selectedSize,
    }
    dispatch(updateCart(cartPayload));
  }

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image 
          src={cp.thumbnail.data.attributes.url}
          alt={cp.name}
          width={120}
          height={120}
        />
      </div>

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* PRODUCT TITLE */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {cp.name}
          </div>

          {/* PRODUCT SUBTITLE */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {cp.subtitle}
          </div>

          {/* PRODUCT PRICE */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP : &#8377;{cp.price}
          </div>
        </div>

        {/* PRODUCT SUBTITLE */}
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          {cp.subtitle}
        </div>

        <div className="flex items-center justify-between mt-4">

          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">

            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>

                <select 
                className="hover:text-black" 
                onChange={(e) => updateCartItem(e, "selectedSize")}
                value={cartData.selectedSize}
                >
                  {cp.size.data.map((item, i) => {
                    return(
                      <option 
                      value={item.size}
                      key={i}
                      disabled={
                        !item.enabled ? true : false
                      }
                      selected={
                        cartData.selectedSize === item.size
                      }
                      >
                        {item.size}
                      </option>
                    )
                  })}
                </select>

            </div>


            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
                <select 
                className="hover:text-black" 
                value={cartData.quantity}
                onChange={(e) => updateCartItem(e, "quantity")}>
                  {Array.from(
                      {length: 10},
                      (_, i) => i + 1
                    ).map((q, i) =>{
                      return(    
                        <option 
                        key={i}
                        value={q}
                        selected={cartData.quantity === q}
                        >
                          {q}
                        </option>
                      )
                    })
                  }
                </select>

            </div>
          </div>
          
          <RiDeleteBin6Line 
            className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
            onClick={() =>
              dispatch(removeFromCart({ id: cartData.id, selectedSize: cartData.selectedSize }))
            }
          />

        </div>
      </div>
    </div>
    // { IMAGE END }
  );
}
