import { Request, Response } from "express";
import { AddItemOrderService } from "../../services/order/AddItemOrderService";

class AddItemOrderController {
  async handle(req: Request, res: Response) {
    const { order_id, product_id, amount } = req.body as {
      order_id: string;
      product_id: string;
      amount: number;
    };

    const addItem = new AddItemOrderService();

    const item = await addItem.execute({
      order_id,
      product_id,
      amount,
    });

    res.status(201).json(item);
  }
}

export { AddItemOrderController };
