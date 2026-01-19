import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
  async handle(req: Request, res: Response) {
    // Lógica para criar uma categoria
    const { name } = req.body as { name: string };

    const categorService = new CreateCategoryService();
    const category = await categorService.execute({ name });

    return res.status(201).json(category);
  }
}

export { CreateCategoryController };
