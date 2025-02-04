import { Button } from "@/app/_components/ui/button";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/app/_components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/app/_components/ui/dropdown-menu";
import {
  MoreHorizontalIcon,
  ClipboardCopy,
  Edit2Icon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";
import { deleteSaleAction } from "@/app/_actions/sale/delete-sale";
import { useAction } from "next-safe-action/hooks";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import UpsertSaleProductContent from "./upsert-sheet-content";
import { useState } from "react";
import { SaleDto } from "@/app/_data-access/sale/get-sale";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";

//para definir na prop o que será passado para opções de deleção e edição de venda
interface SalesTableDropdownMenuProps {
  sale: Pick<SaleDto, "id" | "saleProducts">; //vou precisar para receber os produtos da venda no upsert
  //cada uma deve ser uma lista pois o combobox vai ter uma lista de opções e o mesmo vale pra produtos
  products: ProductDto[];
  productOptions: ComboboxOption[];
}

const SaleTableDropdownMenu = ({
  sale,
  products,
  productOptions,
}: SalesTableDropdownMenuProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const { execute: executeDeleteSale } = useAction(deleteSaleAction, {
    onSuccess: () => {
      toast.success("Venda excluída com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao deletar venda.");
    },
  });

  const handleDeleteSaleClick = () => {
    executeDeleteSale({
      id: sale.id,
    });
  };
  return (
    //sheet usado para abrir o upsert ao clicar em editar
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
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
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                navigator.clipboard
                  .writeText(sale.id)
                  .then(() =>
                    toast.success("ID copiado para a area de transferência"),
                  )
              }
            >
              <ClipboardCopy />
              Copiar ID
            </DropdownMenuItem>
            <SheetTrigger asChild>
              <DropdownMenuItem>
                <Edit2Icon />
                Editar
              </DropdownMenuItem>
            </SheetTrigger>
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
      {/* agora é possivel acessar os produtos e opções nas props do upsert, no upsert precisamos passar os produtos e as opçoes de prod */}
      <UpsertSaleProductContent
        onSubmitSuccess={() => setSheetIsOpen(false)}
        productOptions={productOptions}
        products={products}
        defaultSelectedProducts={sale.saleProducts.map(saleProduct => ({
          id: saleProduct.productId,
          quantity: saleProduct.quantity,
          name: saleProduct.productName,
          price: saleProduct.unitPrice 
        }))}
      />
    </Sheet>
  );
};

export default SaleTableDropdownMenu;
