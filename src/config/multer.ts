import multer from "multer";

//Usar o memory storage do multer para armazenar arquivos na memória e enviar diretamente para o Cloudinary
export default {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 4 * 1024 * 1024, //4mb
  },
  fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png"];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato de arquivo inválido, use apenas JPG, JPEG, PNG."));
    }
  },
};
