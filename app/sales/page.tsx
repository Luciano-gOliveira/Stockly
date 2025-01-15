import { Button } from "../_components/ui/button";
import { ComboboxOption } from "../_components/ui/combobox";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import { getProducts } from "../_data-access/product/get-products";
import UpsertSaleProductContent from "./_components/upsert-sheet-content";

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
          <Sheet>
            <SheetTrigger asChild>
                <Button>Nova Venda</Button>
            </SheetTrigger>
            <UpsertSaleProductContent products={products} productOptions={productOptions} />
          </Sheet>
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