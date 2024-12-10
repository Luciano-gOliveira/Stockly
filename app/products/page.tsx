import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { ProductTableColumns } from "./_components/product-columns.table";
import { getProducts } from "../_data-access/product/get-products";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className="w-full px-8">
      <div className="flex items-center justify-between py-4 pt-6">
        <div>
          <span className="text-gray-500">produtos</span>
          <h2 className="text-xl font-bold">Gestão de produtos</h2>
        </div>
        <Button>
          <PlusIcon />
          Novo Produto
        </Button>
      </div>
      <div className="rounded-sm bg-white">
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
