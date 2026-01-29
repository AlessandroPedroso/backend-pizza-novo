import { Request, Response } from "express";
import { ListProductsService } from "../../services/product/ListProductsService";

class ListProductsController {
  async handle(req: Request, res: Response) {
    const disabled = req.query.disabled as string | undefined;

    const listProductsService = new ListProductsService();

    const products = await listProductsService.execute({
      disable: disabled,
    });

    res.json(products);
  }
}

export { ListProductsController };
