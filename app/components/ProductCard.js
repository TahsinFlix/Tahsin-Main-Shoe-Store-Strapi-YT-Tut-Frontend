import React from "react";
import Link from "next/link";
import Image from "next/image";

import { getDiscountedPriceProduct } from "@/utils/helper"

export default function ProductCard({ productData: { attributes: p, id } } ) {
  
  return (
    <Link  
    href={`/product/${p.slug}`}
    className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >

    {/* <div><h1>This is {p[0]?.name}</h1></div> */}
      <Image 
      width={500}
      height={500}
      src={p.thumbnail.data.attributes.url} 
      alt={p.name} 
      />

      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{p.name}</h2>

        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-base xl:text-lg font-semibold">${p.price}</p>

          {p.original_price && (
            <>           
              <p className="mr-2 text-base 2xl:text-lg font-semibold line-through">${p.original_price}</p>

              <p className="ml-auto text-sm md:text-base font-medium text-green-500">
                {getDiscountedPriceProduct(p.original_price, p.price)}% Off
              </p>
            </>
          )}

        </div>

      </div>

    </Link>
  );
}
