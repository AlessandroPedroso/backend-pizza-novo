import prismaClient from "../../prisma/index";

interface DeleteCategoryProps {
  category_id: string;
}

class DeleteCategoryService {
  async execute({ category_id }: DeleteCategoryProps) {
    const categoryExists = await prismaClient.category.findFirst({
      where: {
        id: category_id,
      },
    });

    if (!categoryExists) {
      throw new Error("Categoria não encontrada");
    }

    // Deleta a categoria e os produtos relacionados (onDelete: Cascade)
    await prismaClient.category.delete({
      where: {
        id: category_id,
      },
    });

    return { message: "Categoria deletada com sucesso" };
  }
}

export { DeleteCategoryService };
