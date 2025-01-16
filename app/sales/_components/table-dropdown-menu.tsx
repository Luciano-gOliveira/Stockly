import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import {
  MoreHorizontalIcon,
  ClipboardCopy,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem, } from "@/app/_components/ui/dropdown-menu";

interface SalesTableDropdownMenuProps {
    //basicamente vamos precisar só do ID para copiar e deletar o produto
  product: Pick<Product, "id">;
  onDelete: (productId: string) => void
}

const SalesTableDropdownMenu = ({ product, onDelete }: SalesTableDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" >
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
              .writeText(product.id)
              .then(() =>
                toast.success("ID copiado para a area de transferência"),
              )
          }
        >
          <ClipboardCopy />
          Copiar ID
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onDelete(product.id)}>
          <Trash2Icon />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SalesTableDropdownMenu;
