import { fetchDataFromApi } from "@/utils/api";


export default async function fetchProducts() {
    const res = await fetchDataFromApi("/api/products?populate=*");
    return res.data;
}

  // const res = await fetchDataFromApi("/api/products")
  // return res.data


// export { data1 }
