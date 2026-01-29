import prismaClient from "../../prisma/index";

interface ListProductsByCategoryProps {
  category_id: string;
}

class ListProductsByCategoryService {
  async execute({ category_id }: ListProductsByCategoryProps) {
    const categoryExists = await prismaClient.category.findFirst({
      where: {
        id: category_id,
      },
    });

    if (!categoryExists) {
      throw new Error("Categoria não encontrada");
    }

    const products = await prismaClient.product.findMany({
      where: {
        category_id,
        disable: false, // Retorna apenas produtos ativos
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
  }
}

export { ListProductsByCategoryService };
