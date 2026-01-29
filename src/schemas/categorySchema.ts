import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string({ message: "O nome da categoria é obrigatória" }).min(2, {
      message: "O nome da categoria precisa ter no minimo 2 letras",
    }),
  }),
});

export const deleteCategorySchema = z.object({
  query: z.object({
    id: z
      .string({ message: "O ID da categoria é obrigatório" })
      .uuid({ message: "O ID deve ser um UUID válido" }),
  }),
});
