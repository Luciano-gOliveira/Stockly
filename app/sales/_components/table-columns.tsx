"use client"

import { Button } from "@/app/_components/ui/button";
import { SaleDto } from "@/app/_data-access/sale/get-sale";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";
import { format } from "path";

export const SaleTableColumns: ColumnDef<SaleDto>[] = [
    {
      accessorKey: "productNames",  
      header: "Produtos",
      //o join é feito 
      cell: ({row: {original: {productNames}}}) => productNames.join(" ● ")
    },
    {
      accessorKey: "productTotal",
      header: "Quantidade de Produtos",
      cell: ({row : {original: {productTotal}}}) => productTotal
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
        cell: () => (
          <Button size="icon">
            <MoreHorizontalIcon/>
          </Button>
        )
    },
  ]