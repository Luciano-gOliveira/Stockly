"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";


const getStatusLabel = (status: string) => {
    if(status === "IN_STOCK"){
        return "Em estoque"
    }
    return "Esgotado"
}

export const ProductTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor Unitário",
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell:(row) => {
        const product = row.row.original
        const label = getStatusLabel(product.status)
        return(
            <Badge className="gap-2" variant={product.status === "IN_STOCK" ? "default" : "secondary"}>
                <CircleIcon size={10} className={product.status === "IN_STOCK" ? "fill-white" : "fill-black"}/>
                {label}
            </Badge>
        )
    }
  }
];
