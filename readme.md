# 📋 Documentação do Projeto - Backend Pizza

> **Data de atualização:** 29 de Janeiro de 2026

---

## 📌 Visão Geral

Este é o backend de uma aplicação de gerenciamento de pizzaria, desenvolvido com **Node.js**, **Express** e **Prisma ORM**. O sistema permite gerenciar usuários, categorias, produtos e pedidos.

---

## 🏗️ Arquitetura do Projeto

O projeto segue a **Arquitetura em Camadas (Routes-Controller-Service)**:

```
[Requisição HTTP]
      ↓
   [Routes] → Define as rotas e aplica middlewares
      ↓
   [Controller] → Recebe a requisição, extrai dados e chama o Service
      ↓
   [Service] → Contém a lógica de negócio, comunica com o banco de dados
      ↓
   [Controller] → Recebe a resposta do Service e retorna ao usuário
      ↓
[Resposta HTTP]
```

### Responsabilidades:

| Camada         | Responsabilidade                                                              |
| -------------- | ----------------------------------------------------------------------------- |
| **Routes**     | Define endpoints, aplica middlewares de autenticação, autorização e validação |
| **Controller** | Recebe requisições, extrai parâmetros e chama o Service correspondente        |
| **Service**    | Executa a lógica de negócio, valida regras e comunica com o banco de dados    |

---

## 📁 Organização de Pastas

```
backend/
├── prisma/
│   ├── schema.prisma              # Modelagem do banco de dados
│   └── migrations/                # Histórico de migrações
│
├── src/
│   ├── @types/
│   │   └── express/
│   │       └── index.d.ts         # Tipagem customizada do Express (user_id no Request)
│   │
│   ├── config/                    # Configurações gerais
│   │   ├── cloundinary.ts         # Configuração do Cloudinary para upload de imagens
│   │   └── multer.ts              # Configuração do Multer para upload de arquivos
│   │
│   ├── controllers/               # Controllers organizados por domínio
│   │   ├── category/
│   │   │   ├── CreateCategoryController.ts
│   │   │   ├── DeleteCategoryController.ts
│   │   │   └── ListCategoryController.ts
│   │   ├── order/
│   │   │   ├── AddItemOrderController.ts
│   │   │   ├── CreateOrderController.ts
│   │   │   ├── DeleteOrderController.ts
│   │   │   ├── DetailOrderController.ts
│   │   │   ├── FinishOrderController.ts
│   │   │   ├── ListOrdersControllers.ts
│   │   │   ├── RemoveItemOrderController.ts
│   │   │   └── SendOrderController.ts
│   │   ├── product/
│   │   │   ├── CreateProductController.ts
│   │   │   ├── DeleteProductController.ts
│   │   │   ├── ListProductsByCategoryController.ts
│   │   │   └── ListProductsController.ts
│   │   └── user/
│   │       ├── AuthUserController.ts
│   │       ├── CreateUserController.ts
│   │       └── DetailUserController.ts
│   │
│   ├── generated/
│   │   └── prisma/                # Cliente Prisma gerado automaticamente
│   │
│   ├── middlewares/
│   │   ├── isAdmin.ts             # Verifica se usuário é ADMIN
│   │   ├── IsAuthenticated.ts     # Verifica token JWT
│   │   └── validateSchema.ts      # Valida requisições com Zod
│   │
│   ├── prisma/
│   │   └── index.ts               # Instância do Prisma Client
│   │
│   ├── schemas/                   # Schemas de validação Zod
│   │   ├── categorySchema.ts
│   │   ├── orderSchema.ts
│   │   ├── productSchema.ts
│   │   └── userSchema.ts
│   │
│   ├── services/                  # Services organizados por domínio
│   │   ├── category/
│   │   │   ├── CreateCategoryService.ts
│   │   │   ├── DeleteCategoryService.ts
│   │   │   └── ListCategoryService.ts
│   │   ├── order/
│   │   │   ├── AddItemOrderService.ts
│   │   │   ├── CreateOrderService.ts
│   │   │   ├── DeleteOrderService.ts
│   │   │   ├── DetailOrderService.ts
│   │   │   ├── FinishOrderService.ts
│   │   │   ├── ListOrdersService.ts
│   │   │   ├── RemoveItemOrderService.ts
│   │   │   └── SendOrderService.ts
│   │   ├── product/
│   │   │   ├── CreateProductService.ts
│   │   │   ├── DeleteProductService.ts
│   │   │   ├── ListProductsByCategoryService.ts
│   │   │   └── ListProductsService.ts
│   │   └── user/
│   │       ├── AuthUserService.ts
│   │       ├── CreateUserService.ts
│   │       └── DetailUserService.ts
│   │
│   ├── routes.ts                  # Definição de todas as rotas
│   └── server.ts                  # Entry point da aplicação
│
├── package.json
├── tsconfig.json
└── prisma.config.ts
```

---

## 📦 Dependências e Versões

### Dependências de Produção

| Biblioteca           | Versão  | Descrição                                    |
| -------------------- | ------- | -------------------------------------------- |
| `express`            | ^5.2.1  | Framework web para Node.js                   |
| `@prisma/client`     | ^7.2.0  | Cliente ORM do Prisma                        |
| `@prisma/adapter-pg` | ^7.2.0  | Adaptador PostgreSQL para Prisma             |
| `pg`                 | ^8.17.1 | Driver PostgreSQL para Node.js               |
| `bcryptjs`           | ^3.0.3  | Hashing de senhas                            |
| `jsonwebtoken`       | ^9.0.3  | Geração e verificação de JWT                 |
| `zod`                | ^4.1.13 | Validação de schemas                         |
| `cors`               | ^2.8.5  | Middleware para CORS                         |
| `dotenv`             | ^17.2.3 | Carrega variáveis de ambiente                |
| `tsx`                | ^4.21.0 | Execução de TypeScript sem compilação prévia |
| `multer`             | ^2.0.2  | Middleware para upload de arquivos           |
| `cloudinary`         | ^2.9.0  | SDK para upload de imagens na nuvem          |

### Dependências de Desenvolvimento

| Biblioteca            | Versão   | Descrição                    |
| --------------------- | -------- | ---------------------------- |
| `typescript`          | ^5.9.3   | Linguagem TypeScript         |
| `prisma`              | ^7.2.0   | CLI do Prisma                |
| `@types/express`      | ^5.0.6   | Tipagem do Express           |
| `@types/node`         | ^24.10.9 | Tipagem do Node.js           |
| `@types/cors`         | ^2.8.19  | Tipagem do CORS              |
| `@types/jsonwebtoken` | ^9.0.10  | Tipagem do JWT               |
| `@types/pg`           | ^8.16.0  | Tipagem do driver PostgreSQL |

---

## 🗄️ Modelagem do Banco de Dados

O projeto utiliza **PostgreSQL** como banco de dados com **Prisma ORM**.

### Diagrama de Relacionamentos

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    User     │       │  Category   │       │   Product   │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │       │ id (PK)     │       │ id (PK)     │
│ name        │       │ name        │◄──────│ category_id │
│ email (UK)  │       │ created_at  │  1:N  │ name        │
│ password    │       │ updated_at  │       │ price       │
│ role        │       └─────────────┘       │ description │
│ created_at  │                             │ banner      │
│ updated_at  │                             │ disable     │
└─────────────┘                             │ created_at  │
                                            │ updated_at  │
                                            └──────┬──────┘
                                                   │
                                                   │ 1:N
                                                   ▼
┌─────────────┐       ┌─────────────┐
│    Order    │       │    Item     │
├─────────────┤       ├─────────────┤
│ id (PK)     │◄──────│ order_id    │
│ table       │  1:N  │ product_id  │───────► Product
│ status      │       │ amount      │
│ draft       │       │ id (PK)     │
│ name        │       │ created_at  │
│ created_at  │       │ updated_at  │
│ updated_at  │       └─────────────┘
└─────────────┘
```

### Models

#### User (users)

| Campo        | Tipo     | Descrição                  |
| ------------ | -------- | -------------------------- |
| `id`         | String   | UUID, Primary Key          |
| `name`       | String   | Nome do usuário (max: 150) |
| `email`      | String   | Email único (max: 255)     |
| `password`   | String   | Senha hasheada (bcrypt)    |
| `role`       | Role     | Papel: STAFF ou ADMIN      |
| `created_at` | DateTime | Data de criação            |
| `updated_at` | DateTime | Data de atualização        |

#### Category (categories)

| Campo        | Tipo     | Descrição           |
| ------------ | -------- | ------------------- |
| `id`         | String   | UUID, Primary Key   |
| `name`       | String   | Nome da categoria   |
| `created_at` | DateTime | Data de criação     |
| `updated_at` | DateTime | Data de atualização |

#### Product (products)

| Campo         | Tipo     | Descrição                           |
| ------------- | -------- | ----------------------------------- |
| `id`          | String   | UUID, Primary Key                   |
| `name`        | String   | Nome do produto                     |
| `price`       | Int      | Preço em centavos                   |
| `description` | String   | Descrição do produto                |
| `banner`      | String   | Caminho da imagem                   |
| `disable`     | Boolean  | Produto desativado (default: false) |
| `category_id` | String   | FK para Category                    |
| `created_at`  | DateTime | Data de criação                     |
| `updated_at`  | DateTime | Data de atualização                 |

#### Order (orders)

| Campo        | Tipo     | Descrição                          |
| ------------ | -------- | ---------------------------------- |
| `id`         | String   | UUID, Primary Key                  |
| `table`      | Int      | Número da mesa                     |
| `status`     | Boolean  | Pedido finalizado (default: false) |
| `draft`      | Boolean  | Rascunho (default: true)           |
| `name`       | String?  | Nome do cliente (opcional)         |
| `created_at` | DateTime | Data de criação                    |
| `updated_at` | DateTime | Data de atualização                |

#### Item (items)

| Campo        | Tipo     | Descrição                        |
| ------------ | -------- | -------------------------------- |
| `id`         | String   | UUID, Primary Key                |
| `amount`     | Int      | Quantidade                       |
| `order_id`   | String   | FK para Order (cascade delete)   |
| `product_id` | String   | FK para Product (cascade delete) |
| `created_at` | DateTime | Data de criação                  |
| `updated_at` | DateTime | Data de atualização              |

### Enum Role

```typescript
enum Role {
  STAFF  // Funcionário padrão
  ADMIN  // Administrador
}
```

---

## 🌐 Endpoints da API

### Usuários

| Método | Rota       | Descrição                  | Middlewares                        |
| ------ | ---------- | -------------------------- | ---------------------------------- |
| POST   | `/users`   | Criar novo usuário         | `validateSchema(createUserSchema)` |
| POST   | `/session` | Autenticação (login)       | `validateSchema(authUserSchema)`   |
| GET    | `/me`      | Detalhes do usuário logado | `isAuthenticated`                  |

### Categorias

| Método | Rota        | Descrição               | Middlewares                                                          |
| ------ | ----------- | ----------------------- | -------------------------------------------------------------------- |
| POST   | `/category` | Criar nova categoria    | `isAuthenticated`, `isAdmin`, `validateSchema(createCategorySchema)` |
| GET    | `/category` | Listar todas categorias | `isAuthenticated`                                                    |
| DELETE | `/category` | Deletar categoria       | `isAuthenticated`, `isAdmin`, `validateSchema(deleteCategorySchema)` |

### Produtos

| Método | Rota                 | Descrição                     | Middlewares                                                                                  |
| ------ | -------------------- | ----------------------------- | -------------------------------------------------------------------------------------------- |
| POST   | `/product`           | Criar novo produto            | `isAuthenticated`, `isAdmin`, `upload.single("file")`, `validateSchema(createProductSchema)` |
| GET    | `/products`          | Listar todos os produtos      | `isAuthenticated`, `validateSchema(listProductsSchema)`                                      |
| DELETE | `/products`          | Deletar produto               | `isAuthenticated`, `isAdmin`, `validateSchema(deleteProductSchema)`                          |
| GET    | `/category/products` | Listar produtos por categoria | `isAuthenticated`, `validateSchema(listProductsByCategorySchema)`                            |

> **Nota:** O endpoint POST `/product` utiliza `multipart/form-data` para envio da imagem do produto.

### Pedidos (Orders)

| Método | Rota            | Descrição                         | Middlewares                                            |
| ------ | --------------- | --------------------------------- | ------------------------------------------------------ |
| POST   | `/order`        | Criar novo pedido                 | `isAuthenticated`, `validateSchema(createOrderSchema)` |
| DELETE | `/order`        | Deletar pedido                    | `isAuthenticated`, `validateSchema(deleteOrderSchema)` |
| GET    | `/orders`       | Listar pedidos (não rascunho)     | `isAuthenticated`                                      |
| POST   | `/order/add`    | Adicionar item ao pedido          | `isAuthenticated`, `validateSchema(addItemSchema)`     |
| DELETE | `/order/remove` | Remover item do pedido            | `isAuthenticated`, `validateSchema(removeItemSchema)`  |
| GET    | `/order/detail` | Detalhes do pedido                | `isAuthenticated`, `validateSchema(detailOrderSchema)` |
| PUT    | `/order/send`   | Enviar pedido (tirar do rascunho) | `isAuthenticated`, `validateSchema(sendOrderSchema)`   |
| PUT    | `/order/finish` | Finalizar pedido                  | `isAuthenticated`, `validateSchema(finishOrderSchema)` |

---

## 🛡️ Middlewares

### 1. `isAuthenticated`

**Localização:** `src/middlewares/IsAuthenticated.ts`

Verifica se a requisição possui um token JWT válido no header `Authorization`.

**Funcionamento:**

- Extrai o token do header `Authorization` (formato: `Bearer <token>`)
- Valida o token usando a chave `JWT_SECRET`
- Adiciona `user_id` ao objeto `Request` para uso posterior
- Retorna 401 se token inválido ou ausente

**Uso:**

```typescript
router.get("/me", isAuthenticated, controller.handle);
```

---

### 2. `isAdmin`

**Localização:** `src/middlewares/isAdmin.ts`

Verifica se o usuário autenticado possui a role `ADMIN`.

**Funcionamento:**

- Busca o usuário no banco pelo `user_id` (obtido do middleware anterior)
- Valida se a role é `ADMIN`
- Retorna 401 se usuário não for admin

**Uso:**

```typescript
router.post("/categories", isAuthenticated, isAdmin, controller.handle);
```

---

### 3. `validateSchema`

**Localização:** `src/middlewares/validateSchema.ts`

Valida o body, query e params da requisição usando schemas Zod.

**Funcionamento:**

- Recebe um schema Zod como parâmetro
- Valida `req.body`, `req.query` e `req.params`
- Retorna 400 com detalhes dos erros de validação
- Chama `next()` se validação passar

**Formato de erro:**

```json
{
  "error": "Erro validação",
  "details": [
    {
      "campo": "name",
      "message": "O nome precisa ter no minimo 3 letras"
    }
  ]
}
```

---

## ✅ Schemas de Validação (Zod)

### User Schemas

#### `createUserSchema`

```typescript
{
  body: {
    name: string; // min 3 caracteres
    email: string; // email válido
    password: string; // min 6 caracteres
  }
}
```

#### `authUserSchema`

```typescript
{
  body: {
    email: string; // email válido
    password: string; // obrigatório (min 1)
  }
}
```

### Category Schemas

#### `createCategorySchema`

```typescript
{
  body: {
    name: string; // min 2 caracteres
  }
}
```

#### `deleteCategorySchema`

```typescript
{
  query: {
    category_id: string; // UUID da categoria
  }
}
```

### Product Schemas

#### `createProductSchema`

```typescript
{
  body: {
    name: string; // obrigatório, min 1 caractere
    price: string; // obrigatório, apenas dígitos (centavos)
    description: string; // obrigatório, min 1 caractere
    category_id: string; // obrigatório, UUID da categoria
  }
}
```

#### `listProductsSchema`

```typescript
{
  query: {
    page?: string; // página (default: "1")
    take?: string; // quantidade por página (default: "10")
  }
}
```

#### `deleteProductSchema`

```typescript
{
  query: {
    product_id: string; // UUID do produto
  }
}
```

#### `listProductsByCategorySchema`

```typescript
{
  query: {
    category_id: string; // UUID da categoria
  }
}
```

> **Nota:** O campo `price` é enviado como string e convertido para `Int` (centavos) no controller.

### Order Schemas

#### `createOrderSchema`

```typescript
{
  body: {
    table: number; // número da mesa (min 1)
    name?: string; // nome do cliente (opcional)
  }
}
```

#### `deleteOrderSchema`

```typescript
{
  query: {
    order_id: string; // UUID do pedido
  }
}
```

#### `addItemSchema`

```typescript
{
  body: {
    order_id: string; // UUID do pedido
    product_id: string; // UUID do produto
    amount: number; // quantidade (min 1)
  }
}
```

#### `removeItemSchema`

```typescript
{
  query: {
    item_id: string; // UUID do item
  }
}
```

#### `detailOrderSchema`

```typescript
{
  query: {
    order_id: string; // UUID do pedido
  }
}
```

#### `sendOrderSchema`

```typescript
{
  body: {
    order_id: string; // UUID do pedido
  }
}
```

#### `finishOrderSchema`

```typescript
{
  body: {
    order_id: string; // UUID do pedido
  }
}
```

---

## 📤 Upload de Arquivos

### Configuração do Multer

**Localização:** `src/config/multer.ts`

```typescript
export default {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 4 * 1024 * 1024, // 4MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png"];
    // Valida formato do arquivo
  },
};
```

**Características:**

- Armazena arquivos na memória (buffer)
- Limite de 4MB por arquivo
- Formatos aceitos: JPEG, JPG, PNG

### Configuração do Cloudinary

**Localização:** `src/config/cloundinary.ts`

Utilizado para armazenar imagens dos produtos na nuvem.

**Funcionamento:**

1. Imagem é recebida via Multer (buffer)
2. Cria-se um stream do buffer
3. Faz upload para o Cloudinary na pasta `products`
4. URL segura é salva no banco de dados (campo `banner`)

---

## 🔐 Tipagem Customizada

### Express Request Extension

**Localização:** `src/@types/express/index.d.ts`

```typescript
declare namespace Express {
  export interface Request {
    user_id: string;
  }
}
```

Permite adicionar `user_id` ao objeto Request após autenticação.

---

## 🔧 Configuração do Prisma

### Conexão

**Localização:** `src/prisma/index.ts`

```typescript
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL!}`;
const adapter = new PrismaPg({ connectionString });

const prismaCLiente = new PrismaClient({ adapter });
```

Utiliza o adaptador `@prisma/adapter-pg` para conexão direta com PostgreSQL.

---

## 🚀 Scripts

| Script | Comando                   | Descrição                               |
| ------ | ------------------------- | --------------------------------------- |
| `dev`  | `tsx watch src/server.ts` | Inicia servidor em modo desenvolvimento |

---

## 📝 Comandos Úteis

```bash
# Criar nova migration
npx prisma migrate dev

# Gerar cliente Prisma
npx prisma generate

# Visualizar banco no Prisma Studio
npx prisma studio

# Iniciar servidor de desenvolvimento
npm run dev
```

---

## 🔒 Variáveis de Ambiente

```env
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=sua_chave_secreta
PORT=3333 # opcional, default: 3333

# Cloudinary (upload de imagens)
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=sua_api_secret
```

---

## 📄 Licença

ISC
