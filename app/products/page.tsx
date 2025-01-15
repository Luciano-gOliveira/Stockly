import { PlusIcon } from "lucide-react";
import { DataTable } from "../_components/ui/data-table";
import { ProductTableColumns } from "./_components/table-columns";
import {
  cachedGetProducts,
  getProducts,
  gretProductsWithCache,
  sum,
} from "../_data-access/product/get-products";
import ProductList from "./_components/product-list";
import CreateProductButton from "./_components/create-product-button";


const ProductsPage = async () => {
  // const products = await getProducts();
  const products = await cachedGetProducts();
  // const products = await gretProductsWithCache()
  // sum(2,2)
  return (
    <div className="w-full px-8">
      <div className="flex items-center justify-between py-4 pt-6">
        <div>
          <span className="text-gray-500">Gestão de Produtos</span>
          <h2 className="text-xl font-bold">Produtos</h2>
        </div>
        <CreateProductButton/>
      </div>
      <div className="rounded-sm bg-white">
        {/* <ProductList/> */}
        <DataTable
          // data={JSON.parse(JSON.stringify(products))}
          // columns={ProductTableColumns}
          data={JSON.parse(JSON.stringify(products))}
          columns={ProductTableColumns}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
