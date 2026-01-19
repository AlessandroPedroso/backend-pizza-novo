import prismaCLiente from "../../prisma";

interface CreateCategoryProps {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CreateCategoryProps) {
    try {
      const categoryExists = await prismaCLiente.category.findFirst({
        where: {
          name: {
            equals: name,
            mode: "insensitive",
          },
        },
      });

      if (categoryExists) {
        throw new Error("Já existe uma categoria com esse nome");
      }

      const category = await prismaCLiente.category.create({
        data: {
          name: name,
        },
        select: {
          id: true,
          name: true,
          created_at: true,
        },
      });

      return category;
    } catch (error) {
      console.log(error);
      throw new Error("Falha ao criar a categoria");
    }
  }
}

export { CreateCategoryService };
