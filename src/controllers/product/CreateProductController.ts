import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    if (!req.file) {
      throw new Error("A imagem do produto é obrigatória");
    }

    // informação do arquivo que foi enviado
    // console.log("====================================");
    // console.log(req.file);
    // console.log("====================================");

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      name,
      price: parseInt(price), //Converte string para Int para ter o valor em centavos
      description,
      category_id,
      imageBuffer: req.file.buffer,
      imageName: req.file.originalname,
    });
    res.status(201).json(product);
  }
}

export { CreateProductController };
