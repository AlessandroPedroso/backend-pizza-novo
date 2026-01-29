import { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";

class DeleteProductController {
  async handle(req: Request, res: Response) {
    const { product_id } = req.query as { product_id: string };

    const deleteProductService = new DeleteProductService();
    const product = await deleteProductService.execute({
      product_id,
    });
    res.json(product);
  }
}

export { DeleteProductController };
