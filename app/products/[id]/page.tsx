
interface Params {
    id: string
}

const ProductsDetails = ({params: {id}} : {params: Params}) => {
    return ( <h1>Product ID: {id}</h1> );
}
 
export default ProductsDetails;