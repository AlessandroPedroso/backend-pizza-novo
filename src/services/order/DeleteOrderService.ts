import prismaCLiente from "../../prisma";

interface DeleteOrderProps {
  order_id: string;
}

class DeleteOrderService {
  async execute({ order_id }: DeleteOrderProps) {
    try {
      //Verificar se essa order_id existe
      const order = await prismaCLiente.order.findFirst({
        where: {
          id: order_id,
        },
      });

      if (!order) {
        throw new Error("Falha ao deletar o pedido");
      }
      await prismaCLiente.order.delete({
        where: {
          id: order_id,
        },
      });

      return { message: "Pedido deletado com sucesso" };
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao deletar o pedido!");
    }
  }
}

export { DeleteOrderService };
