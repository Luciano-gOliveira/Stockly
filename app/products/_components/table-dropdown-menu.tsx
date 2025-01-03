import { Button } from "@/app/_components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontalIcon, ClipboardCopy, Edit2Icon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import DeleteDialogContent from "./delete-dialog-content";
import UpsertProductContent from "./upsert-product-content";
import { Product } from "@prisma/client";

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