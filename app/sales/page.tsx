import { ComboboxOption } from "../_components/ui/combobox";
import { getProducts } from "../_data-access/product/get-products";
import CreateSaleButton from "./_components/create-sale-button";

const SalesPage = async() => {

  const products = await getProducts()
  const productOptions: ComboboxOption[] = products.map((product)=> ({
    label: product.name,
    value: product.id
  }))
    return ( 
        <div className="w-full px-8">
        <div className="flex items-center justify-between py-4 pt-6">
          <div>
            <span className="text-gray-500">Gestão de Vendas</span>
            <h2 className="text-xl font-bold">Vendas</h2>
          </div>
          <CreateSaleButton products={products} productOptions={productOptions} />
        </div>
        <div className="rounded-sm bg-white">
          {/* <ProductList/> */}
          {/* <DataTable
            // data={JSON.parse(JSON.stringify(products))}
            // columns={ProductTableColumns}
            data={JSON.parse(JSON.stringify(products))}
            columns={ProductTableColumns}
          /> */}
        </div>
      </div>
     );
}
 
export default SalesPage;