import prismaCLiente from "../../prisma";

interface FinishOrderProps {
  order_id: string;
}

class FinishOrderService {
  async execute({ order_id }: FinishOrderProps) {
    try {
      //Verificar se essa order_id existe
      const order = await prismaCLiente.order.findFirst({
        where: {
          id: order_id,
        },
      });

      if (!order) {
        throw new Error("Falha ao finalizar o pedido");
      }

      const updateOrder = await prismaCLiente.order.update({
        where: {
          id: order_id,
        },
        data: {
          status: true,
        },
        select: {
          id: true,
          table: true,
          name: true,
          draft: true,
          status: true,
          created_at: true,
        },
      });

      return updateOrder;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao enviar o pedido!");
    }
  }
}

export { FinishOrderService };
