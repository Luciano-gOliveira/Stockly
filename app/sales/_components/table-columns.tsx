"use client"

import { Button } from "@/app/_components/ui/button";
import { SaleDto } from "@/app/_data-access/sale/get-sale";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";
import { format } from "path";
import SaleTableDropdownMenu from "./table-dropdown-menu";

export const SaleTableColumns: ColumnDef<SaleDto>[] = [
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
          <SaleTableDropdownMenu sale={sale} />
        )
    },
  ]