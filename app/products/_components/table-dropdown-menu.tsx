import { AlertDialog, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { ClipboardCopy, Edit2Icon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import UpsertProductContent from "./upsert-product-content";
import DeleteDialogContent from "./delete-dialog-content";
import { Button } from "@/app/_components/ui/button";


//anotar situacionalidade
interface ProductTableDropdownMenuProps {
    product: Product;
}

const ProductTableDropdownMenu = ({product}: ProductTableDropdownMenuProps) => {
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
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
            <UpsertProductContent
              onSuccess={() => setEditDialogIsOpen(false)}
              defaultValues={{
                id: product.id,
                name: product.name,
                price: Number(product.price),
                stock: product.stock,
              }}
            />
          </Dialog>
          <DeleteDialogContent productId={product.id} />
        </AlertDialog>
      );

    }
 
export default ProductTableDropdownMenu;