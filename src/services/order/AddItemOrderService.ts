import prismaCLiente from "../../prisma";

interface ItemProps {
  order_id: string;
  product_id: string;
  amount: number;
}

class AddItemOrderService {
  async execute({ order_id, product_id, amount }: ItemProps) {
    const orderExists = await prismaCLiente.order.findFirst({
      where: {
        id: order_id,
      },
    });

    if (!orderExists) {
      throw new Error("Pedido não encontrado");
    }

    const productExists = await prismaCLiente.product.findFirst({
      where: {
        id: product_id,
        disable: false,
      },
    });

    if (!productExists) {
      throw new Error("Produto não encontrado");
    }
    const item = await prismaCLiente.item.create({
      data: {
        order_id,
        product_id,
        amount,
      },
      select: {
        id: true,
        amount: true,
        order_id: true,
        product_id: true,
        created_at: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            description: true,
            banner: true,
          },
        },
      },
    });

    return item;
  }
}

export { AddItemOrderService };
