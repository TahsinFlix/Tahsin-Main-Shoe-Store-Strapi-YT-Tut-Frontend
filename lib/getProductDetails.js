import { fetchDataFromApi } from "@/utils/api";

export default async function getProductDetails(slug) {

   const product = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`

    // "http://localhost:1337/api/products?filters[slug][$eq]=air-jordan-1-retro-high-og-1"
);


const relatedProduct = await fetchDataFromApi(
    
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`

);

return { product: product?.data?.[0], relatedProduct: relatedProduct?.data };
  
}
