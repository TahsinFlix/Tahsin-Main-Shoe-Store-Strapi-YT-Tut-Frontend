import { fetchDataFromApi } from "@/utils/api";

export default async function fetchCategories() {

    const res = await fetchDataFromApi("/api/categories?populate=*");

    return res.data;
}
