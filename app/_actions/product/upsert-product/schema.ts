import { z } from "zod";

export const upsertProductSchema = z.object({
  //opcional pois só será passada em caso de edição
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, {
    message: "O nome do produto é obrigatório",
  }),
  price: z.number().min(0.01, {
    message: "O preço do produto é obrigatório",
  }),
  stock: z.coerce
    .number({
      message: "Não foi possivel converter a quantidade em estoque",
    })
    .positive({
      message: "A quantidade em estoque deve ser positiva",
    })
    .int()
    .min(1, {
      message: "A quantidade em estoque é obrigatória",
    }),
});

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;
