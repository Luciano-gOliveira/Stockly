"use client"

import { SaleDto } from "@/app/_data-access/sale/get-sale";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import SaleTableDropdownMenu from "./table-dropdown-menu";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";

//interface para acessar produtos e options
interface SaleTableColumn extends SaleDto {
  products: ProductDto[]
  productOptions: ComboboxOption[]
}

//as colunas vão recever isso
export const SaleTableColumns: ColumnDef<SaleTableColumn>[] = [
    {
      accessorKey: "productNames",  
      header: "Produtos",
      //o join é feito do lado do servidor 
      // cell: ({row: {original: {productNames}}}) => productNames.join(" ● ")
    },
    {
      accessorKey: "productTotal",
      header: "Quantidade de Produtos",
      //quando não é feita nenhuma operação no cliente, ou formatação na cell, apenas usar o accessorKey
      // cell: ({row : {original: {productTotal}}}) => productTotal
    },
    {
      accessorKey: "totalAmount",
      header: "Valor Total",
      cell: ({row: {original: {totalAmount}}}) => formatCurrency(totalAmount)  
    },
    {
        accessorKey: "date",
        header: "Data",
        cell: ({row: {original: {date}}}) => {
         return new Date(date).toLocaleDateString("pt-BR")
        }
    },
    {
        header: "Ações",
        cell: ({row: {original: sale}}) => (
          //agora conseguimos acessar produtos e options
          <SaleTableDropdownMenu sale={sale} productOptions={sale.productOptions} products={sale.products} />
        )
    },
  ]