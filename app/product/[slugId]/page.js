
import getProductDetails from "@/lib/getProductDetails";

import ClientSiteProduct from "@/app/components/SlugFilesClientCodes/ClientSiteProduct";
import RelatedProducts from "@/app/components/RelatedProducts";


export default async function ProductDetails({ params }) {
  const { slugId } = params;

  const showSelectedProduct = await getProductDetails(slugId);

  const {
    product, relatedProduct,
  } = showSelectedProduct;

  return (
    <>
      <ClientSiteProduct 
        product={product}
        relatedProduct={relatedProduct}
      />

      <RelatedProducts relatedProduct={relatedProduct}/>

    </>
  );
}
