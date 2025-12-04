import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema } from "./schemas/userSchema";
const router = Router();

router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle
);

export { router };

// ARQUITETURA EM CAMADAS ROUTES-CONTROLLER-SERVICE
// CONTROLLER > CHAMA O SERVICE QUE VAI REALIZAR A LOGICA
// SERVICE > RESPONSAVEL PELA LOGICA POR REALIZAR AS OPERAÇÕES
