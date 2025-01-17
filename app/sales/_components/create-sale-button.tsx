"use client"

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import UpsertSaleProductContent from "./upsert-sheet-content";
import { useState } from "react";
import { Product } from "@prisma/client";
import { ComboboxOption } from "@/app/_components/ui/combobox";

interface CreateSaleButtonProps {
    products: Product[];
    productOptions: ComboboxOption[]
}
const CreateSaleButton = ({products, productOptions}: CreateSaleButtonProps) => {
    const [sheetIsOpen, setSheetIsOpen] = useState(false)
    return ( 
        <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
            <SheetTrigger asChild>
                <Button>Nova Venda</Button>
            </SheetTrigger>
            <UpsertSaleProductContent onSubmitSuccess={() => setSheetIsOpen(false)} products={products} productOptions={productOptions} />
          </Sheet>
     );
}
 
export default CreateSaleButton;