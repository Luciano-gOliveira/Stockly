"use client"

import { Button } from "@/app/_components/ui/button";
import { AlertDialog, AlertDialogHeader, AlertDialogFooter , AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/app/_components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from  "@/app/_components/ui/dropdown-menu";
import { MoreHorizontalIcon, ClipboardCopy, Edit2Icon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { Sale } from "@prisma/client";
import { deleteSaleAction } from "@/app/_actions/sale/delete-sale";
import { useAction } from "next-safe-action/hooks";

interface SalesTableDropdownMenuProps {
    id: Pick<Sale, "id">
}

const SaleTableDropdownMenu = ({id} : SalesTableDropdownMenuProps) => {

    const {execute: executeDeleteSale} = useAction(deleteSaleAction,{
        onSuccess: () => {
            toast.success("Venda excluída com sucesso!")
        },
        onError: () => {
            toast.error("Erro ao deletar venda.")
        }
    })

    const handleDeleteSaleClick = () => {
        executeDeleteSale({
            id: id.id
        })
    }
    return ( 
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontalIcon size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Opções</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(id.id).then(() => toast.success("ID copiado para a area de transferência"))} >
                <ClipboardCopy  />
                Copiar ID
              </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit2Icon />
                  Editar
                </DropdownMenuItem>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem>
                  <Trash2Icon />
                  Deletar
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você tem certeza que deseja deletar a Venda?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSaleClick}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
     );
}
 
export default SaleTableDropdownMenu;