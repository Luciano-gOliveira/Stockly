import { CircleIcon } from "lucide-react";
import { ProductStatusDto } from "../_data-access/product/get-products";
import { Badge } from "./ui/badge";


interface ProductStatusBadgeProps {
    status: ProductStatusDto
}

const ProductStatusBadge = ({status}: ProductStatusBadgeProps) => {
    const getStatusLabel = (status: string) => {
        if (status === "IN_STOCK") {
            return "Em estoque";
        }
        return "Esgotado";
    };
    const label = getStatusLabel(status);
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
              status === "IN_STOCK" ? "fill-white" : "fill-black"
            }
          />
          {label}
        </Badge>
      );
}
 
export default ProductStatusBadge;