import prismaCLiente from "../../prisma";

interface DeleteProductServiceProps {
  product_id: string;
}

class DeleteProductService {
  async execute({ product_id }: DeleteProductServiceProps) {
    const productExists = await prismaCLiente.product.findFirst({
      where: {
        id: product_id,
        disable: false,
      },
    });

    if (!productExists) {
      throw new Error("Produto não encontrado");
    }

    await prismaCLiente.product.update({
      where: {
        id: product_id,
      },
      data: {
        disable: true,
      },
    });

    return { message: "Produto deletado/arquivado com sucesso" };
  }
}

export { DeleteProductService };
