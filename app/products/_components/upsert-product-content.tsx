"use client"

import { createProductAction } from "@/app/_actions/product/create-product";
import { createProductSchema, CreateProductSchema } from "@/app/_actions/product/create-product/product-schema";
import { Button } from "@/app/_components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import {NumericFormat} from "react-number-format";
import { zodResolver } from "@hookform/resolvers/zod"

interface UpsertProductContentProps {
    onSuccess?: () => void
}

const UpsertProductContent = ({onSuccess}: UpsertProductContentProps) => {
    
  const form = useForm<CreateProductSchema>({
    shouldUnregister: true,
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const onSubmit = async (data: CreateProductSchema) => {
    await createProductAction(data);
    onSuccess?.()
  };

    return ( 
        <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Produto</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          {/* acessar estado  */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <NumericFormat
                        thousandSeparator="."
                        decimalSeparator=","
                        fixedDecimalScale
                        decimalScale={2}
                        prefix="R$ "
                        allowNegative={false}
                        customInput={Input}
                        onValueChange={(values) => field.onChange(values.floatValue)}
                        {...field}
                        onChange={() => {}}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estoque</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite a quantidade em estoque" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="secondary" type="reset">Cancelar</Button>
                </DialogClose>
                {/* usar isSubmiting */}

                <Button disabled={form.formState.isSubmitting} className="gap-1.5" type="submit">
                  {
                    form.formState.isSubmitting && (
                      <Loader2Icon className="animate-spin"/>
                    ) 
                  }
                  Salvar
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
     );
}
 
export default UpsertProductContent;