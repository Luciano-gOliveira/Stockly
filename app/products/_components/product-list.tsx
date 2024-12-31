import { cachedGetProducts, gretProductsWithCache, sum } from "@/app/_data-access/product/get-products";

//para testar o function memoization
const ProductList = async() => {
    const products = await gretProductsWithCache()
    sum(2, 2)
    return ( 
        <ul>
            {
                products.map(product => (
                    <li key={product.id}>
                        {product.name}</li>))
            }
        </ul>
     );
}
 
export default ProductList;