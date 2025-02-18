"use client";

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import UpsertSaleProductContent from "./upsert-sheet-content";
import { useState } from "react";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { PlusIcon } from "lucide-react";
import { ProductDto } from "@/app/_data-access/product/get-products";

interface UpsertSaleButtonProps {
  products: ProductDto[];
  productOptions: ComboboxOption[];
}
const UpsertSaleButton = ({
  products,
  productOptions,
}: UpsertSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon />
          Nova Venda
        </Button>
      </SheetTrigger>

      <UpsertSaleProductContent
        onSubmitSuccess={() => setSheetIsOpen(false)}
        isOpen={sheetIsOpen}
        products={JSON.parse(JSON.stringify(products))}
        productOptions={productOptions}
      />
    </Sheet>
  );
};

export default UpsertSaleButton;
