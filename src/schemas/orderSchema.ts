import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z
      .number({ message: "O número da mesa é obrigatório" })
      .int({ message: "O número da mesa deve ser um número inteiro" })
      .positive({ message: "O número da mesa deve ser maior que zero" }),
    name: z.string().optional(),
  }),
});

export const addItemSchema = z.object({
  body: z.object({
    amount: z
      .number({ message: "A quantidade é obrigatória" })
      .int({ message: "A quantidade deve ser um número inteiro" })
      .positive({ message: "A quantidade deve ser maior que zero" }),
    order_id: z.uuid({ message: "O ID do pedido deve ser um UUID válido" }),
    product_id: z.uuid({ message: "O ID do produto deve ser um UUID válido" }),
  }),
});

export const removeItemSchema = z.object({
  query: z.object({
    item_id: z.uuid({ message: "O item_id deve ser um UUID válido" }),
  }),
});

export const detailOrderSchema = z.object({
  query: z.object({
    order_id: z.uuid({ message: "O order_id deve ser um UUID válido" }),
  }),
});

export const sendOrderSchema = z.object({
  body: z.object({
    name: z.string({ message: "O nome precisa ser um texto!" }).optional(),
    order_id: z.uuid({ message: "O order_id deve ser um UUID válido" }),
  }),
});

export const finishOrderSchema = z.object({
  body: z.object({
    order_id: z.uuid({ message: "O order_id deve ser um UUID válido" }),
  }),
});

export const deleteOrderSchema = z.object({
  query: z.object({
    order_id: z.uuid({ message: "O order_id deve ser um UUID válido" }),
  }),
});
