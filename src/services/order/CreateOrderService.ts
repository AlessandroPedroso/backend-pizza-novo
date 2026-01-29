import prismaClient from "../../prisma/index";

interface CreateOrderProps {
  table: number;
  name?: string | undefined | null;
}

class CreateOrderService {
  async execute({ table, name }: CreateOrderProps) {
    try {
      const order = await prismaClient.order.create({
        data: {
          table,
          name: name ?? "",
        },
        select: {
          id: true,
          table: true,
          status: true,
          draft: true,
          name: true,
          created_at: true,
        },
      });

      return order;
    } catch (error) {
      throw new Error("Falha ao criar pedido");
    }
  }
}

export { CreateOrderService };
