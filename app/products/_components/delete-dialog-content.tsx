import { deleteProductAction } from "@/app/_actions/product/delete-product";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { flattenValidationErrors } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface DeleteDialogContentProps {
  productId: string;
}

const DeleteDialogContent = ({ productId }: DeleteDialogContentProps) => {
  const {execute: executeDeleteProduct} = useAction(deleteProductAction,{
    onError: ({error: {validationErrors, serverError}}) => {
      const flattenedErrors = flattenValidationErrors(validationErrors)
      console.log(validationErrors)
      toast.error(serverError ?? flattenedErrors.formErrors[0])
    },
    onSuccess: () => {
      toast.success("Produto excluído com sucesso!")
    }
  })
  const handleContinueCLick = async () => {
    executeDeleteProduct({ id: productId })
  };
  return (
    
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você tem certeza que deseja deletar o produto?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleContinueCLick}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
  );
};

export default DeleteDialogContent;
