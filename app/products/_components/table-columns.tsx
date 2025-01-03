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
import { AlertDialog, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { Button } from "@/app/_components/ui/button";
import UpsertProductContent from "./upsert-product-content";
import { useState } from "react";

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
      const [editDialogIsOpen, setEditDialogIsOpen] = useState(false)
      const product = row.row.original
      return (
        <AlertDialog>
      <Dialog open={editDialogIsOpen} onOpenChange={setEditDialogIsOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ClipboardCopy />
              Copiar ID
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Edit2Icon />
                Editar
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              {/* TO DO: separar o componente de deleção em outro componente */}
              <DropdownMenuItem>
                <Trash2Icon />
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <UpsertProductContent onSuccess={() => setEditDialogIsOpen(false)} defaultValues={{
          id: product.id,
          name: product.name,
          price: Number(product.price),
          stock: product.stock
        }} />
      </Dialog>
      <DeleteDialogContent productId={product.id}/>
    </AlertDialog>
      );
    },
  },
];
