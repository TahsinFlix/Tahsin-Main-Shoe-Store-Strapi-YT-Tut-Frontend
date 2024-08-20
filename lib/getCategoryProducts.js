// import useSWR from 'swr';
import { fetchDataFromApi } from '@/utils/api';

const maxResult = 3;

export default async function getCategoryProducts(slug) {
   // Fetch the category based on the slug
   const category = await fetchDataFromApi(
    `/api/categories?filters[slug][$eq]=${slug}`
);

// Fetch the products for the category
const products = await fetchDataFromApi(
    
    // `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}`

    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`

);


// For Swr -> Pages of products
// const { products_data, error, isLoading } = useSWR('/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResult}', fetchDataFromApi, {
//     fallbackData: products,
// })


return { category: category?.data?.[0], products: products?.data };

// return { category: category?.data?.[0], products_data: products_data?.data, error: error, isLoading: isLoading };

}
