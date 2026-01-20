import prismaClient from "../../prisma/index";

class ListCategoryService {
  async execute() {
    try {
      const categories = await prismaClient.category.findMany({
        select: {
          id: true,
          name: true,
          created_at: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      return categories;
    } catch (error) {
      throw new Error("Erro ao listar categorias");
    }
  }
}

export { ListCategoryService };
