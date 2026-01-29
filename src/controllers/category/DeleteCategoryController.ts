import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/category/DeleteCategoryService";

class DeleteCategoryController {
  async handle(req: Request, res: Response) {
    const { id } = req.query;

    const deleteCategoryService = new DeleteCategoryService();

    const result = await deleteCategoryService.execute({
      category_id: id as string,
    });

    res.json(result);
  }
}

export { DeleteCategoryController };
