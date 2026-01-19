import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string({ message: "O nome da categoria é obrigatória" }).min(2, {
      message: "O nome da categoria precisa ter no minimo 2 letras",
    }),
  }),
});
