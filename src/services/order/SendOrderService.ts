import prismaCLiente from "../../prisma";

interface SendOrderProps {
  name?: string | undefined | null;
  order_id: string;
}

class SendOrderService {
  async execute({ name, order_id }: SendOrderProps) {
    try {
      //Verificar se essa order_id existe
      const order = await prismaCLiente.order.findFirst({
        where: {
          id: order_id,
        },
      });

      if (!order) {
        throw new Error("Pedido não encontrado");
      }

      //Atualizar a propriedade draft para false (envia para a cozinha)
      const updateOrder = await prismaCLiente.order.update({
        where: {
          id: order_id,
        },
        data: {
          draft: false,
          name: name ?? order.name,
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

export { SendOrderService };
