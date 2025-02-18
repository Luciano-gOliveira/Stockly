"use client";

import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { formatCurrency } from "@/app/_helpers/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UpsertSaleTableDropdownMenu from "./upsert-table-dropdown-menu";
import { upsertSale } from "@/app/_actions/sale/upsert-sale";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { flattenValidationErrors } from "next-safe-action";
import { ProductDto } from "@/app/_data-access/product/get-products";

const formSchema = z.object({
  productId: z.string().uuid({
    message: "O produto deve ser selecionado",
  }),
  quantity: z.coerce.number().int().positive({
    message: "A quantidade deve ser maior que zero",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

//preciso lembrar desses dados pra saber os campos que os selectedProducts padrao devem receber
interface SelectedProducts {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface UpsertSaleProductContentProps {
  isOpen: boolean
  saleId?: string //para saber se é uma edição ou criação, se receber um saleId, será edição
  products: ProductDto[];
  productOptions: ComboboxOption[];
  onSubmitSuccess: () => void;
  defaultSelectedProducts: SelectedProducts[];
}

const UpsertSaleProductContent = ({
  isOpen,
  saleId,
  defaultSelectedProducts,
  products,
  productOptions,//eu poderia pegar esses dados no lado do cliente através de um fetch e isso evitaria passar tantas props, mas isso ia gerar um tempo de carregamento maior pra buscar os dados 
  onSubmitSuccess,
}: UpsertSaleProductContentProps) => {
  const [selectedProduct, setSelectedProduct] = useState<SelectedProducts[]>(
    defaultSelectedProducts ?? [],
  );

  const { execute: executeUpsertSale } = useAction(upsertSale, {
    onError: ({ error: { validationErrors, serverError } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors);
      // console.log({validationErrors})
      toast.error(serverError ?? flattenedErrors.formErrors[0]);
    },
    onSuccess: () => {
      toast.success("Venda realizada com sucesso");
      onSubmitSuccess();
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset()
      setSelectedProduct([])
    }
  }, [form, isOpen])

  useEffect(() => {
    setSelectedProduct(defaultSelectedProducts ?? [])
  }, [defaultSelectedProducts])

  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;
    setSelectedProduct((currentProducts) => {
      //verificar se o produto existe
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );
      if (existingProduct) {
        //validar se a quantidade do produto selecionado + a quantidade do produto existente é maior que o estoque
        const productIsOutOfStock =
          existingProduct.quantity + data.quantity > selectedProduct.stock;
        if (productIsOutOfStock) {
          form.setError("quantity", {
            message: "Quantidade indisponível em estoque.",
          });
          return currentProducts;
        }
        form.reset();

        //código para aumentar a quantidade
        return currentProducts.map((product) => {
          if (product.id === selectedProduct.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            };
          }
          return product;
        });
      }
      //validação se o produto não existe
      const productIsOutOfStock = data.quantity > selectedProduct?.stock;
      if (productIsOutOfStock) {
        form.setError("quantity", {
          message: "Quantidade indisponível em estoque.",
        });
        return currentProducts;
      }
      //resets só acontecem se a validação passar
      form.reset();
      //se não existe ele adiciona tudo que ja existe e o produto selecionado com seus dados
      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };

  //código para totalizar o preço dos produtos
  const productsTotal = useMemo(() => {
    return selectedProduct.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }, [selectedProduct]);

  const onDelete = (productId: string) => {
    setSelectedProduct((currentProducts) => {
      return currentProducts.filter((product) => product.id !== productId);
    });
  };

  const onSubmitSale = async () => {
    executeUpsertSale({ //ao chamar o upsert-sale vai ser necessario o id
      id: saleId, //ao enviar a venda receberá o ID para enviar como atualização
      products: selectedProduct.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
  };

  return (
    <SheetContent className="!max-w-[700px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <SheetHeader>
        <SheetTitle>Criar Venda</SheetTitle>
        <SheetDescription>
          Insira as informações da venda abaixo.
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  {/* combobox */}
                  <Combobox
                    options={productOptions}
                    placeholder="selecione um produto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="secondary">
            <PlusIcon size={20} />
            Adicionar produto à venda
          </Button>
        </form>
      </Form>

      <Table>
        <TableCaption>Lista dos produtos adicionados à venda.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProduct.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {formatCurrency(product.price * product.quantity)}
              </TableCell>
              <TableCell>
                <UpsertSaleTableDropdownMenu
                  onDelete={onDelete}
                  product={product}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{formatCurrency(productsTotal)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <SheetFooter className="pt-6">
        <Button
          onClick={onSubmitSale}
          className="w-full gap-2"
          disabled={selectedProduct.length === 0}
        >
          <CheckIcon size={20} />
          Finalizar Venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSaleProductContent;
