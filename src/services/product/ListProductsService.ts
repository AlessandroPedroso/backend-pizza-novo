import prismaClient from "../../prisma/index";

interface ListProductsProps {
  disable?: string;
}

class ListProductsService {
  async execute({ disable }: ListProductsProps) {
    try {
      const products = await prismaClient.product.findMany({
        where: {
          disable: disable === "true" ? true : false,
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          banner: true,
          disable: true,
          category_id: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          created_at: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      return products;
    } catch (error) {
      throw new Error("Falha ao listar produtos");
    }
  }
}

export { ListProductsService };
