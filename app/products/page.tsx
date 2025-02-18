import { DataTable } from "../_components/ui/data-table";
import { ProductTableColumns } from "./_components/table-columns";
import {
  getProducts,

} from "../_data-access/product/get-products";
import CreateProductButton from "./_components/create-product-button";
import Header, { HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from "../_components/header";


const ProductsPage = async () => {

  const products = await getProducts()

  return (
    <div className="w-full px-8 overflow-auto">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão de Produtos</HeaderSubtitle>
          <HeaderTitle>Produtos</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <CreateProductButton/>
        </HeaderRight>
      </Header>

      <div className="rounded-sm bg-white">

        <DataTable
          data={JSON.parse(JSON.stringify(products))}
          columns={ProductTableColumns}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
