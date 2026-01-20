import { Router } from "express";
import { isAdmin } from "../src/middlewares/isAdmin";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/IsAuthenticated";
import { validateSchema } from "./middlewares/validateSchema";
import { createCategorySchema } from "./schemas/categorySchema";
import { authUserSchema, createUserSchema } from "./schemas/userSchema";

const router = Router();

// Rotas users
router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle,
);

router.post(
  "/session",
  validateSchema(authUserSchema),
  new AuthUserController().handle,
);

router.get("/me", isAuthenticated, new DetailUserController().handle);

// fim das rotas users

// Rotas Categorias
router.post(
  "/category",
  isAuthenticated,
  isAdmin,
  validateSchema(createCategorySchema),
  new CreateCategoryController().handle,
);

router.get("/category", isAuthenticated, new ListCategoryController().handle);

// Rotas Produtos
router.post(
  "/product",
  isAuthenticated,
  isAdmin,
  new CreateProductController().handle,
);

export { router };

// ARQUITETURA EM CAMADAS ROUTES-CONTROLLER-SERVICE
// CONTROLLER > CHAMA O SERVICE QUE VAI REALIZAR A LOGICA
// SERVICE > RESPONSAVEL PELA LOGICA POR REALIZAR AS OPERAÇÕES
