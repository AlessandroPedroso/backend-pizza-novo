import prismaClient from "../../prisma/index";

interface RemoveItemOrderProps {
  item_id: string;
}

class RemoveItemOrderService {
  async execute({ item_id }: RemoveItemOrderProps) {
    const itemExists = await prismaClient.item.findFirst({
      where: {
        id: item_id,
      },
    });

    if (!itemExists) {
      throw new Error("Item não encontrado");
    }

    await prismaClient.item.delete({
      where: {
        id: item_id,
      },
    });

    return { message: "Item removido com sucesso" };
  }
}

export { RemoveItemOrderService };
