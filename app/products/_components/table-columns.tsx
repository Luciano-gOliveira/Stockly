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
import { ProductDto } from "@/app/_data-access/product/get-products";
import ProductStatusBadge from "@/app/_components/product-status-badge";



export const ProductTableColumns: ColumnDef<ProductDto>[] = [
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
      return (
        <ProductStatusBadge status={product.status} />
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
