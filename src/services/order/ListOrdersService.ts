import prismaCLiente from "../../prisma";

interface ListOdersServiceProps {
  draft?: string;
}

class ListOrdersService {
  async execute({ draft }: ListOdersServiceProps) {
    const orders = await prismaCLiente.order.findMany({
      where: {
        draft: draft === "true" ? true : false,
      },
      select: {
        id: true,
        table: true,
        name: true,
        draft: true,
        status: true,
        created_at: true,
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
              },
            },
          },
        },
      },
    });
    return orders;
  }
}

export { ListOrdersService };
