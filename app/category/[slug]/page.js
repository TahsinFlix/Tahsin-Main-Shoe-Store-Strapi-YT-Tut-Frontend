import ClientSiteCategory from "@/app/components/SlugFilesClientCodes/ClientSiteCategory";
import getCategoryProducts from "@/lib/getCategoryProducts";


export default async function categorySlug({ params }) {

  const { slug } = params;

  const categoryProductsData = await getCategoryProducts(slug)

return(
  <ClientSiteCategory 
    slug={slug}
    categoryProductsData={categoryProductsData}
  />
  // <h1>Slug: {slug}</h1>
)

}
