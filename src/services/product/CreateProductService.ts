import { Readable } from "stream";
import cloudinary from "../../config/cloundinary";
import prismaCLiente from "../../prisma";

interface CreateServiceProps {
  name: string;
  price: number;
  description: string;
  category_id: string;
  imageBuffer: Buffer;
  imageName: string;
}

class CreateProductService {
  async execute({
    name,
    price,
    description,
    category_id,
    imageBuffer,
    imageName,
  }: CreateServiceProps) {
    const categoryExists = await prismaCLiente.category.findFirst({
      where: {
        id: category_id,
      },
    });

    if (!categoryExists) {
      throw new Error("Categoria não encontrada");
    }

    //verifica se o produto já existe
    const productExists = await prismaCLiente.product.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
        disable: false,
      },
    });

    if (productExists) {
      throw new Error("Já existe um produto com esse nome");
    }

    //ENVIAR PRO CLOUDINARY SALVAR A IMAGEM E PEGAR A URL
    let bannerUrl = "";
    try {
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
            resource_type: "image",
            public_id: `${Date.now()}-${imageName.split(".")[0]}`, //pizzaCalabresa.png, split separa pelo ponto e pega a primeira parte
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        //Criar o stream do buffe e fazer o pipe para o cloudinary
        const bufferStream = Readable.from(imageBuffer);
        bufferStream.pipe(uploadStream);
      });

      // console.log(result);//confere o result do upload do cloudinary
      bannerUrl = result.secure_url;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao fazer upload da imagem");
    }

    //SALVAR A URL DA IMAGEM E OS DADOS NO BANCO COM UM NOVO PRODUTO
    const product = await prismaCLiente.product.create({
      data: {
        name: name,
        price: price,
        description: description,
        banner: bannerUrl,
        category_id: category_id,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        banner: true,
        category_id: true,
        created_at: true,
      },
    });

    return product;
  }
}

export { CreateProductService };
