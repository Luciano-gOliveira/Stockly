import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { db } from "../_lib/prisma";
import { ProductTableColumns } from "./_components/product-columns.table";

const ProductsPage = async () => {
  const products = await db.product.findMany({});

  return (
    <div className="w-full px-8">
      <div className="flex justify-between items-center py-4 pt-6">
        <div>
            <span className="text-gray-500">produtos</span>
            <h2 className="font-bold text-xl">Gestão de produtos</h2>
        </div>  
        <Button>
            <PlusIcon/>
            Novo Produto
        </Button>
      </div>  
      <div className="bg-white rounded-sm">
        <DataTable data={products} columns={ProductTableColumns} />
      </div>
    </div>
  );
};

export default ProductsPage;
