import { Router } from "express";
import multer from "multer";
import { isAdmin } from "../src/middlewares/isAdmin";
import uploadConfig from "./config/multer";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { DeleteCategoryController } from "./controllers/category/DeleteCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { AddItemOrderController } from "./controllers/order/AddItemOrderController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
import { ListOrdersControllers } from "./controllers/order/ListOrdersControllers";
import { RemoveItemOrderController } from "./controllers/order/RemoveItemOrderController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { ListProductsByCategoryController } from "./controllers/product/ListProductsByCategoryController";
import { ListProductsController } from "./controllers/product/ListProductsController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/IsAuthenticated";
import { validateSchema } from "./middlewares/validateSchema";
import {
  createCategorySchema,
  deleteCategorySchema,
} from "./schemas/categorySchema";
import {
  addItemSchema,
  createOrderSchema,
  deleteOrderSchema,
  detailOrderSchema,
  finishOrderSchema,
  removeItemSchema,
  sendOrderSchema,
} from "./schemas/orderSchema";
import {
  createProductSchema,
  deleteProductSchema,
  listProductsByCategorySchema,
  listProductsSchema,
} from "./schemas/productSchema";
import { authUserSchema, createUserSchema } from "./schemas/userSchema";

const router = Router();
const upload = multer(uploadConfig);

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

router.delete(
  "/category",
  isAuthenticated,
  isAdmin,
  validateSchema(deleteCategorySchema),
  new DeleteCategoryController().handle,
);

// Rotas Produtos
router.post(
  "/product",
  isAuthenticated,
  isAdmin,
  upload.single("file"),
  validateSchema(createProductSchema),
  new CreateProductController().handle,
);

router.get(
  "/products",
  isAuthenticated,
  validateSchema(listProductsSchema),
  new ListProductsController().handle,
);

router.delete(
  "/products",
  isAuthenticated,
  isAdmin,
  validateSchema(deleteProductSchema),
  new DeleteProductController().handle,
);

router.get(
  "/category/products",
  isAuthenticated,
  validateSchema(listProductsByCategorySchema),
  new ListProductsByCategoryController().handle,
);

// Rotas Orders
router.post(
  "/order",
  isAuthenticated,
  validateSchema(createOrderSchema),
  new CreateOrderController().handle,
);

router.delete(
  "/order",
  isAuthenticated,
  validateSchema(deleteOrderSchema),
  new DeleteOrderController().handle,
);

router.get("/orders", isAuthenticated, new ListOrdersControllers().handle);

// Adicionar Item a order
router.post(
  "/order/add",
  isAuthenticated,
  validateSchema(addItemSchema),
  new AddItemOrderController().handle,
);

// Remover Item da order
router.delete(
  "/order/remove",
  isAuthenticated,
  validateSchema(removeItemSchema),
  new RemoveItemOrderController().handle,
);

// Detalhes da order
router.get(
  "/order/detail",
  isAuthenticated,
  validateSchema(detailOrderSchema),
  new DetailOrderController().handle,
);

router.put(
  "/order/send",
  isAuthenticated,
  validateSchema(sendOrderSchema),
  new SendOrderController().handle,
);

router.put(
  "/order/finish",
  isAuthenticated,
  validateSchema(finishOrderSchema),
  new FinishOrderController().handle,
);

export { router };

// ARQUITETURA EM CAMADAS ROUTES-CONTROLLER-SERVICE
// CONTROLLER > CHAMA O SERVICE QUE VAI REALIZAR A LOGICA
// SERVICE > RESPONSAVEL PELA LOGICA POR REALIZAR AS OPERAÇÕES
