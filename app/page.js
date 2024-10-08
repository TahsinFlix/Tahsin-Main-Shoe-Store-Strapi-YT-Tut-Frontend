import fetchProducts from "@/lib/fetchProducts";
import HeroBanner from "./components/HeroBanner";
import ProductCard from "./components/ProductCard";
import Wrapper from "./components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";


export default async function Home() {

  const products = await fetchProducts();

  // const response = await fetchDataFromApi("/api/products");
  //   const data1 = await response.data;

  return (
    <main className="">
      <HeroBanner />
      <Wrapper>

        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Cushioning for Your Miles
          </div>
          <div className="text-md md:text-xl">
            A lightweight Nike ZoomX midsole is combined with increased stack
            heights to help provide cushioning during extended stretches of
            running.
          </div>
        </div>

        {/* heading and paragaph end */}

        <div className="grid justify-center md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
              {products?.map((product) =>(
                <ProductCard key={product.id} productData={product} />
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

      </Wrapper>
    </main>
  );
}

