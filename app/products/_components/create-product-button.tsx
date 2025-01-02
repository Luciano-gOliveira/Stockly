"use client";

import {
  Dialog,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import UpsertProductContent from "./upsert-product-content";




const CreateProductButton = () => {
  //guardar o estado de abertura do form
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Novo Produto
        </Button>
      </DialogTrigger>
      <UpsertProductContent onSuccess={() => setDialogIsOpen(false)}/>
    </Dialog>
  );
};

export default CreateProductButton;
