import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";
import { getProducts } from "../_data-access/product/get-products";
import { getSales } from "../_data-access/sale/get-sale";
import UpsertSaleButton from "./_components/create-sale-button";
import { SaleTableColumns } from "./_components/table-columns";

const SalesPage = async () => {
  const products = await getProducts();
  const sales = await getSales();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  //dados que o datatable vai usar para renderizar produtos e oções do combobox
  //TODO: entender como asles acessa os products e Options
  const salesData = sales.map((sale) => ({
    ...sale,
    products,
    productOptions,
  }));

  return (
    <div className="w-full px-8">
      <div className="flex items-center justify-between py-4 pt-6">
        <div>
          <span className="text-gray-500">Gestão de Vendas</span>
          <h2 className="text-xl font-bold">Vendas</h2>
        </div>
        <UpsertSaleButton products={products} productOptions={productOptions} />
      </div>
      <div className="rounded-sm bg-white">
        {/* <ProductList/> */}
        <DataTable
          // data={JSON.parse(JSON.stringify(products))}
          // columns={ProductTableColumns}
          data={salesData}
          columns={SaleTableColumns}
        />
      </div>
    </div>
  );
};

export default SalesPage;
