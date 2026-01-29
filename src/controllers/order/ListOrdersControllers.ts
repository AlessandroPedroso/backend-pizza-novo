import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrdersService";

class ListOrdersControllers {
  async handle(req: Request, res: Response) {
    const draft = req.query?.draft as string | undefined;

    const lisrOrders = new ListOrdersService();
    const orders = await lisrOrders.execute({
      draft: draft,
    });

    return res.json(orders);
  }
}

export { ListOrdersControllers };
