"use client";
import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleIcon,
  ClipboardCopy,
  Edit2Icon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import DeleteDialogContent from "./delete-dialog-content";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Button } from "@/app/_components/ui/button";
import UpsertProductContent from "./upsert-product-content";
import { useState } from "react";
import ProductTableDropdownMenu from "./table-dropdown-menu";

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque";
  }
  return "Esgotado";
};

export const ProductTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor Unitário",
    cell: (row) => {
      //ver mais sobre formatação
      const product = row.row.original;
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price));
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      // @ts-expect-error - status is a string
      const label = getStatusLabel(product.status);
      return (
        <Badge
          className="gap-2"
          variant={
            label === "Em estoque" ? "default" : "secondary"
          } /* @ts-ignore */
        >
          <CircleIcon
            size={10}
            className={
              /* @ts-ignore */
              product.status === "IN_STOCK" ? "fill-white" : "fill-black"
            }
          />
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (row) => {
      //passa os dados do row pros defaultValues
      return <ProductTableDropdownMenu product={row.row.original}/>
    },
  },
];
