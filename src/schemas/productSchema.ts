import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "O nome do produto é obrigatório" })
      .min(1, "O nome do produto deve ter no mínimo 3 caracteres"),
    price: z
      .string({ message: "O preço do produto é obrigatório" })
      .min(1, { message: "O preço do produto deve ser maior que zero" })
      .regex(/^\d+$/),
    description: z
      .string({ message: "A descrição do produto é obrigatório" })
      .min(1, {
        message: "A descrição do produto deve ter no mínimo 1 caracteres",
      }),
    category_id: z.string({ message: "O ID da categoria é obrigatório" }),
  }),
});

export const listProductsSchema = z.object({
  query: z.object({
    disabled: z.string().optional(),
  }),
});

export const deleteProductSchema = z.object({
  query: z.object({
    product_id: z.uuid({ message: "O ID deve ser um UUID válido" }),
  }),
});

export const listProductsByCategorySchema = z.object({
  query: z.object({
    category_id: z.string({ message: "O ID da categoria é obrigatório" }),
  }),
});
