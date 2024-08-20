'use client'

import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import Wrapper from "../Wrapper";
import ProductCard from "../ProductCard";

import { fetchDataFromApi } from "@/utils/api";

const maxResult = 3;

// export default async function clientSiteCategory({ params }) {
export default function ClientSiteCategory({ slug, categoryProductsData }) {

  const router = useRouter();

  const { category, products } = categoryProductsData 

  const [pageIndex, setPageIndex] = useState(1);

    useEffect(() => {
        if (router) {
            setPageIndex(1);
        }
    }, [router]);

    const { data: product_data, error, isLoading } = useSWR(
      `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
      fetchDataFromApi,
      {
        fallbackData: products, // Use the products fetched from server-side as fallback
      }
    );

    // console.log(product_data);
    

     // Ensure product_data.data is an array before mapping
     const productsArray = Array.isArray(product_data?.data) ? product_data.data : [];

  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {category?.attributes?.name}
          </div>
        </div>

        {/* heading and paragaph end */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
              {/* {products?.map((products) =>( */}
              {productsArray?.map((products) =>(
                <ProductCard key={products.id} productData={products} />
              ))}
                    
                    {/* <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard /> */}
                </div>
                {/* products grid end */}

            {/* PAGINATION BUTTONS START */}
            {product_data?.meta?.pagination?.total > maxResult && (
                    <div className="flex gap-3 items-center justify-center my-16 md:my-0">
                        <button
                            className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                            disabled={pageIndex === 1}
                            onClick={() => setPageIndex(pageIndex - 1)}
                        >
                            Previous
                        </button>

                        <span className="font-bold">{`${pageIndex} of ${
                            product_data && product_data.meta.pagination.pageCount
                        }`}</span>

                        <button
                            className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                            disabled={
                                pageIndex ===
                                (product_data && product_data.meta.pagination.pageCount)
                            }
                            onClick={() => setPageIndex(pageIndex + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}
                {/* PAGINATION BUTTONS END */}
                {isLoading && (
                    <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
                        <img src="/assets/logo.svg" width={150} />
                        <span className="text-2xl font-medium">Loading...</span>
                    </div>
                )}

      </Wrapper>
    </div>
  );
}
