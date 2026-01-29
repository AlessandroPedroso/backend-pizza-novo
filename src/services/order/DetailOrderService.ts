import prismaCLiente from "../../prisma";

interface DetailOrderServiceProps {
  order_id: string;
}

class DetailOrderService {
  async execute({ order_id }: DetailOrderServiceProps) {
    const order = await prismaCLiente.order.findUnique({
      where: {
        id: order_id,
      },
      select: {
        id: true,
        table: true,
        name: true,
        draft: true,
        status: true,
        created_at: true,
        updated_at: true,
        items: {
          select: {
            id: true,
            amount: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                category: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      throw new Error("Pedido não encontrado");
    }

    return order;
  }
}

export { DetailOrderService };
