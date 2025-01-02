import { deleteProductAction } from "@/app/_actions/product/delete-product";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { ClipboardCopy, Edit2Icon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

interface DeleteDialogContentProps {
    productId: string
}

const DeleteDialogContent = ({productId}: DeleteDialogContentProps) => {
    const handleContinueCLick = async()=>{
        try{
            await deleteProductAction({id: productId})
            toast.success("Produto excluído com sucesso!")
        }catch(error){
            console.error(error)
        }
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
          <DropdownMenuItem>
            <ClipboardCopy/>
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit2Icon />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <AlertDialogTrigger className="flex items-center gap-2">
              <Trash2Icon />
              Deletar
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza que deseja deletar o produto?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinueCLick}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialogContent;
