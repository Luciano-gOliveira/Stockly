"use client";

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import UpsertSaleProductContent from "./upsert-sheet-content";
import { useState } from "react";
import { Product } from "@prisma/client";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { PlusIcon } from "lucide-react";

interface UpsertSaleButtonProps {
  products: Product[];
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
        products={products}
        productOptions={productOptions}
      />
    </Sheet>
  );
};

export default UpsertSaleButton;
