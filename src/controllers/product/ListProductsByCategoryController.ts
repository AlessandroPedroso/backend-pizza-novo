import { Request, Response } from "express";
import { ListProductsByCategoryService } from "../../services/product/ListProductsByCategoryService";

class ListProductsByCategoryController {
  async handle(req: Request, res: Response) {
    const { category_id } = req.query as { category_id: string };

    const listProductsByCategoryService = new ListProductsByCategoryService();

    const products = await listProductsByCategoryService.execute({
      category_id: category_id,
    });

    res.json(products);
  }
}

export { ListProductsByCategoryController };
