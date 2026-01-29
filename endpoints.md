# 📡 Documentação de Endpoints - Backend Pizza

> **Data de atualização:** 29 de Janeiro de 2026

---

## 📌 Informações Gerais

- **Base URL:** `http://localhost:3333`
- **Autenticação:** Bearer Token (JWT)
- **Content-Type:** `application/json` (exceto upload de arquivos)

### Headers de Autenticação

```
Authorization: Bearer <token>
```

---

## 👤 Usuários

### POST `/users` - Criar Usuário

Cria um novo usuário no sistema.

**Autenticação:** ❌ Não requer

**Request Body:**

| Campo      | Tipo   | Obrigatório | Validação           |
| ---------- | ------ | ----------- | ------------------- |
| `name`     | string | ✅          | Mínimo 3 caracteres |
| `email`    | string | ✅          | Email válido        |
| `password` | string | ✅          | Mínimo 6 caracteres |

**Exemplo Request:**

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

**Exemplo Response (201):**

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "João Silva",
  "email": "joao@email.com",
  "role": "STAFF"
}
```

**Erros Possíveis:**

| Status | Mensagem            |
| ------ | ------------------- |
| 400    | Email já cadastrado |
| 400    | Erro de validação   |

---

### POST `/session` - Login

Autentica um usuário e retorna um token JWT.

**Autenticação:** ❌ Não requer

**Request Body:**

| Campo      | Tipo   | Obrigatório | Validação    |
| ---------- | ------ | ----------- | ------------ |
| `email`    | string | ✅          | Email válido |
| `password` | string | ✅          | Obrigatório  |

**Exemplo Request:**

```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

**Exemplo Response (200):**

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "João Silva",
  "email": "joao@email.com",
  "role": "STAFF",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erros Possíveis:**

| Status | Mensagem                  |
| ------ | ------------------------- |
| 400    | Email ou senha incorretos |
| 400    | Erro de validação         |

---

### GET `/me` - Detalhes do Usuário Logado

Retorna os dados do usuário autenticado.

**Autenticação:** ✅ Requer (Bearer Token)

**Request Headers:**

```
Authorization: Bearer <token>
```

**Exemplo Response (200):**

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "João Silva",
  "email": "joao@email.com",
  "role": "STAFF"
}
```

**Erros Possíveis:**

| Status | Mensagem             |
| ------ | -------------------- |
| 401    | Token não autorizado |
| 401    | Token inválido       |

---

## 📂 Categorias

### POST `/category` - Criar Categoria

Cria uma nova categoria de produtos.

**Autenticação:** ✅ Requer (Bearer Token)  
**Permissão:** 🔐 ADMIN

**Request Body:**

| Campo  | Tipo   | Obrigatório | Validação           |
| ------ | ------ | ----------- | ------------------- |
| `name` | string | ✅          | Mínimo 2 caracteres |

**Exemplo Request:**

```json
{
  "name": "Pizzas"
}
```

**Exemplo Response (201):**

```json
{
  "id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
  "name": "Pizzas",
  "created_at": "2026-01-29T10:00:00.000Z",
  "updated_at": "2026-01-29T10:00:00.000Z"
}
```

**Erros Possíveis:**

| Status | Mensagem                       |
| ------ | ------------------------------ |
| 401    | Token não autorizado           |
| 401    | Não autorizado! Somente ADMINs |
| 400    | Erro de validação              |

---

### GET `/category` - Listar Categorias

Retorna todas as categorias cadastradas.

**Autenticação:** ✅ Requer (Bearer Token)

**Exemplo Response (200):**

```json
[
  {
    "id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    "name": "Pizzas",
    "created_at": "2026-01-29T10:00:00.000Z",
    "updated_at": "2026-01-29T10:00:00.000Z"
  },
  {
    "id": "c3d4e5f6-a7b8-9012-cdef-345678901234",
    "name": "Bebidas",
    "created_at": "2026-01-29T10:30:00.000Z",
    "updated_at": "2026-01-29T10:30:00.000Z"
  }
]
```

**Erros Possíveis:**

| Status | Mensagem             |
| ------ | -------------------- |
| 401    | Token não autorizado |

---

### DELETE `/category` - Deletar Categoria

Remove uma categoria do sistema.

**Autenticação:** ✅ Requer (Bearer Token)  
**Permissão:** 🔐 ADMIN

**Query Parameters:**

| Campo | Tipo   | Obrigatório | Validação   |
| ----- | ------ | ----------- | ----------- |
| `id`  | string | ✅          | UUID válido |

**Exemplo Request:**

```
DELETE /category?id=b2c3d4e5-f6a7-8901-bcde-f23456789012
```

**Exemplo Response (200):**

```json
{
  "message": "Categoria deletada com sucesso!"
}
```

**Erros Possíveis:**

| Status | Mensagem                       |
| ------ | ------------------------------ |
| 401    | Token não autorizado           |
| 401    | Não autorizado! Somente ADMINs |
| 400    | Categoria não encontrada       |

---

## 🍕 Produtos

### POST `/product` - Criar Produto

Cria um novo produto com upload de imagem.

**Autenticação:** ✅ Requer (Bearer Token)  
**Permissão:** 🔐 ADMIN  
**Content-Type:** `multipart/form-data`

**Form Data:**

| Campo         | Tipo   | Obrigatório | Validação                          |
| ------------- | ------ | ----------- | ---------------------------------- |
| `name`        | string | ✅          | Mínimo 1 caractere                 |
| `price`       | string | ✅          | Apenas dígitos (preço em centavos) |
| `description` | string | ✅          | Mínimo 1 caractere                 |
| `category_id` | string | ✅          | UUID válido                        |
| `file`        | file   | ✅          | Imagem (JPEG, JPG, PNG) max 4MB    |

**Exemplo Request (form-data):**

```
name: Pizza Margherita
price: 3990
description: Pizza tradicional com molho de tomate, mussarela e manjericão
category_id: b2c3d4e5-f6a7-8901-bcde-f23456789012
file: [arquivo de imagem]
```

**Exemplo Response (201):**

```json
{
  "id": "d4e5f6a7-b8c9-0123-defg-456789012345",
  "name": "Pizza Margherita",
  "price": 3990,
  "description": "Pizza tradicional com molho de tomate, mussarela e manjericão",
  "banner": "https://res.cloudinary.com/.../pizza-margherita.jpg",
  "disable": false,
  "category_id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
  "created_at": "2026-01-29T11:00:00.000Z",
  "updated_at": "2026-01-29T11:00:00.000Z"
}
```

> **Nota:** O campo `price` é enviado como string (centavos). Ex: R$ 39,90 = "3990"

**Erros Possíveis:**

| Status | Mensagem                       |
| ------ | ------------------------------ |
| 401    | Token não autorizado           |
| 401    | Não autorizado! Somente ADMINs |
| 400    | Erro de validação              |
| 400    | Formato de arquivo inválido    |

---

### GET `/products` - Listar Produtos

Retorna todos os produtos cadastrados.

**Autenticação:** ✅ Requer (Bearer Token)

**Query Parameters:**

| Campo      | Tipo   | Obrigatório | Descrição                          |
| ---------- | ------ | ----------- | ---------------------------------- |
| `disabled` | string | ❌          | Filtrar por produtos desabilitados |

**Exemplo Request:**

```
GET /products
GET /products?disabled=true
```

**Exemplo Response (200):**

```json
[
  {
    "id": "d4e5f6a7-b8c9-0123-defg-456789012345",
    "name": "Pizza Margherita",
    "price": 3990,
    "description": "Pizza tradicional com molho de tomate, mussarela e manjericão",
    "banner": "https://res.cloudinary.com/.../pizza-margherita.jpg",
    "disable": false,
    "category_id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    "created_at": "2026-01-29T11:00:00.000Z",
    "updated_at": "2026-01-29T11:00:00.000Z"
  }
]
```

**Erros Possíveis:**

| Status | Mensagem             |
| ------ | -------------------- |
| 401    | Token não autorizado |

---

### DELETE `/products` - Deletar Produto

Remove um produto do sistema.

**Autenticação:** ✅ Requer (Bearer Token)  
**Permissão:** 🔐 ADMIN

**Query Parameters:**

| Campo        | Tipo   | Obrigatório | Validação   |
| ------------ | ------ | ----------- | ----------- |
| `product_id` | string | ✅          | UUID válido |

**Exemplo Request:**

```
DELETE /products?product_id=d4e5f6a7-b8c9-0123-defg-456789012345
```

**Exemplo Response (200):**

```json
{
  "message": "Produto deletado com sucesso!"
}
```

**Erros Possíveis:**

| Status | Mensagem                       |
| ------ | ------------------------------ |
| 401    | Token não autorizado           |
| 401    | Não autorizado! Somente ADMINs |
| 400    | Produto não encontrado         |

---

### GET `/category/products` - Listar Produtos por Categoria

Retorna todos os produtos de uma categoria específica.

**Autenticação:** ✅ Requer (Bearer Token)

**Query Parameters:**

| Campo         | Tipo   | Obrigatório | Validação   |
| ------------- | ------ | ----------- | ----------- |
| `category_id` | string | ✅          | UUID válido |

**Exemplo Request:**

```
GET /category/products?category_id=b2c3d4e5-f6a7-8901-bcde-f23456789012
```

**Exemplo Response (200):**

```json
[
  {
    "id": "d4e5f6a7-b8c9-0123-defg-456789012345",
    "name": "Pizza Margherita",
    "price": 3990,
    "description": "Pizza tradicional com molho de tomate, mussarela e manjericão",
    "banner": "https://res.cloudinary.com/.../pizza-margherita.jpg",
    "disable": false,
    "category_id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    "created_at": "2026-01-29T11:00:00.000Z",
    "updated_at": "2026-01-29T11:00:00.000Z"
  },
  {
    "id": "e5f6a7b8-c9d0-1234-efgh-567890123456",
    "name": "Pizza Calabresa",
    "price": 4290,
    "description": "Pizza com calabresa e cebola",
    "banner": "https://res.cloudinary.com/.../pizza-calabresa.jpg",
    "disable": false,
    "category_id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    "created_at": "2026-01-29T11:30:00.000Z",
    "updated_at": "2026-01-29T11:30:00.000Z"
  }
]
```

**Erros Possíveis:**

| Status | Mensagem             |
| ------ | -------------------- |
| 401    | Token não autorizado |
| 400    | Erro de validação    |

---

## 📋 Pedidos (Orders)

### POST `/order` - Criar Pedido

Cria um novo pedido (rascunho).

**Autenticação:** ✅ Requer (Bearer Token)

**Request Body:**

| Campo   | Tipo   | Obrigatório | Validação              |
| ------- | ------ | ----------- | ---------------------- |
| `table` | number | ✅          | Inteiro positivo (≥ 1) |
| `name`  | string | ❌          | Nome do cliente        |

**Exemplo Request:**

```json
{
  "table": 5,
  "name": "Maria"
}
```

**Exemplo Response (201):**

```json
{
  "id": "f6a7b8c9-d0e1-2345-fghi-678901234567",
  "table": 5,
  "name": "Maria",
  "status": false,
  "draft": true,
  "created_at": "2026-01-29T12:00:00.000Z",
  "updated_at": "2026-01-29T12:00:00.000Z"
}
```

**Erros Possíveis:**

| Status | Mensagem             |
| ------ | -------------------- |
| 401    | Token não autorizado |
| 400    | Erro de validação    |

---

### DELETE `/order` - Deletar Pedido

Remove um pedido do sistema.

**Autenticação:** ✅ Requer (Bearer Token)

**Query Parameters:**

| Campo      | Tipo   | Obrigatório | Validação   |
| ---------- | ------ | ----------- | ----------- |
| `order_id` | string | ✅          | UUID válido |

**Exemplo Request:**

```
DELETE /order?order_id=f6a7b8c9-d0e1-2345-fghi-678901234567
```

**Exemplo Response (200):**

```json
{
  "message": "Pedido deletado com sucesso!"
}
```

**Erros Possíveis:**

| Status | Mensagem              |
| ------ | --------------------- |
| 401    | Token não autorizado  |
| 400    | Pedido não encontrado |

---

### GET `/orders` - Listar Pedidos

Retorna todos os pedidos que não estão em rascunho (draft = false).

**Autenticação:** ✅ Requer (Bearer Token)

**Exemplo Response (200):**

```json
[
  {
    "id": "f6a7b8c9-d0e1-2345-fghi-678901234567",
    "table": 5,
    "name": "Maria",
    "status": false,
    "draft": false,
    "created_at": "2026-01-29T12:00:00.000Z",
    "updated_at": "2026-01-29T12:05:00.000Z"
  },
  {
    "id": "a7b8c9d0-e1f2-3456-ghij-789012345678",
    "table": 3,
    "name": null,
    "status": false,
    "draft": false,
    "created_at": "2026-01-29T12:30:00.000Z",
    "updated_at": "2026-01-29T12:35:00.000Z"
  }
]
```

**Erros Possíveis:**

| Status | Mensagem             |
| ------ | -------------------- |
| 401    | Token não autorizado |

---

### POST `/order/add` - Adicionar Item ao Pedido

Adiciona um produto ao pedido.

**Autenticação:** ✅ Requer (Bearer Token)

**Request Body:**

| Campo        | Tipo   | Obrigatório | Validação              |
| ------------ | ------ | ----------- | ---------------------- |
| `order_id`   | string | ✅          | UUID válido            |
| `product_id` | string | ✅          | UUID válido            |
| `amount`     | number | ✅          | Inteiro positivo (≥ 1) |

**Exemplo Request:**

```json
{
  "order_id": "f6a7b8c9-d0e1-2345-fghi-678901234567",
  "product_id": "d4e5f6a7-b8c9-0123-defg-456789012345",
  "amount": 2
}
```

**Exemplo Response (201):**

```json
{
  "id": "b8c9d0e1-f2a3-4567-hijk-890123456789",
  "amount": 2,
  "order_id": "f6a7b8c9-d0e1-2345-fghi-678901234567",
  "product_id": "d4e5f6a7-b8c9-0123-defg-456789012345",
  "created_at": "2026-01-29T12:10:00.000Z",
  "updated_at": "2026-01-29T12:10:00.000Z"
}
```

**Erros Possíveis:**

| Status | Mensagem               |
| ------ | ---------------------- |
| 401    | Token não autorizado   |
| 400    | Pedido não encontrado  |
| 400    | Produto não encontrado |
| 400    | Erro de validação      |

---

### DELETE `/order/remove` - Remover Item do Pedido

Remove um item específico do pedido.

**Autenticação:** ✅ Requer (Bearer Token)

**Query Parameters:**

| Campo     | Tipo   | Obrigatório | Validação   |
| --------- | ------ | ----------- | ----------- |
| `item_id` | string | ✅          | UUID válido |

**Exemplo Request:**

```
DELETE /order/remove?item_id=b8c9d0e1-f2a3-4567-hijk-890123456789
```

**Exemplo Response (200):**

```json
{
  "message": "Item removido com sucesso!"
}
```

**Erros Possíveis:**

| Status | Mensagem             |
| ------ | -------------------- |
| 401    | Token não autorizado |
| 400    | Item não encontrado  |

---

### GET `/order/detail` - Detalhes do Pedido

Retorna os detalhes completos de um pedido, incluindo seus itens e produtos.

**Autenticação:** ✅ Requer (Bearer Token)

**Query Parameters:**

| Campo      | Tipo   | Obrigatório | Validação   |
| ---------- | ------ | ----------- | ----------- |
| `order_id` | string | ✅          | UUID válido |

**Exemplo Request:**

```
GET /order/detail?order_id=f6a7b8c9-d0e1-2345-fghi-678901234567
```

**Exemplo Response (200):**

```json
{
  "id": "f6a7b8c9-d0e1-2345-fghi-678901234567",
  "table": 5,
  "name": "Maria",
  "status": false,
  "draft": false,
  "created_at": "2026-01-29T12:00:00.000Z",
  "updated_at": "2026-01-29T12:05:00.000Z",
  "items": [
    {
      "id": "b8c9d0e1-f2a3-4567-hijk-890123456789",
      "amount": 2,
      "order_id": "f6a7b8c9-d0e1-2345-fghi-678901234567",
      "product_id": "d4e5f6a7-b8c9-0123-defg-456789012345",
      "product": {
        "id": "d4e5f6a7-b8c9-0123-defg-456789012345",
        "name": "Pizza Margherita",
        "price": 3990,
        "description": "Pizza tradicional com molho de tomate, mussarela e manjericão",
        "banner": "https://res.cloudinary.com/.../pizza-margherita.jpg"
      }
    }
  ]
}
```

**Erros Possíveis:**

| Status | Mensagem              |
| ------ | --------------------- |
| 401    | Token não autorizado  |
| 400    | Pedido não encontrado |

---

### PUT `/order/send` - Enviar Pedido

Envia o pedido para preparo (remove do rascunho).

**Autenticação:** ✅ Requer (Bearer Token)

**Request Body:**

| Campo      | Tipo   | Obrigatório | Validação                  |
| ---------- | ------ | ----------- | -------------------------- |
| `order_id` | string | ✅          | UUID válido                |
| `name`     | string | ❌          | Nome do cliente (opcional) |

**Exemplo Request:**

```json
{
  "order_id": "f6a7b8c9-d0e1-2345-fghi-678901234567",
  "name": "Maria Silva"
}
```

**Exemplo Response (200):**

```json
{
  "id": "f6a7b8c9-d0e1-2345-fghi-678901234567",
  "table": 5,
  "name": "Maria Silva",
  "status": false,
  "draft": false,
  "created_at": "2026-01-29T12:00:00.000Z",
  "updated_at": "2026-01-29T12:15:00.000Z"
}
```

**Erros Possíveis:**

| Status | Mensagem              |
| ------ | --------------------- |
| 401    | Token não autorizado  |
| 400    | Pedido não encontrado |

---

### PUT `/order/finish` - Finalizar Pedido

Marca o pedido como concluído/finalizado.

**Autenticação:** ✅ Requer (Bearer Token)

**Request Body:**

| Campo      | Tipo   | Obrigatório | Validação   |
| ---------- | ------ | ----------- | ----------- |
| `order_id` | string | ✅          | UUID válido |

**Exemplo Request:**

```json
{
  "order_id": "f6a7b8c9-d0e1-2345-fghi-678901234567"
}
```

**Exemplo Response (200):**

```json
{
  "id": "f6a7b8c9-d0e1-2345-fghi-678901234567",
  "table": 5,
  "name": "Maria Silva",
  "status": true,
  "draft": false,
  "created_at": "2026-01-29T12:00:00.000Z",
  "updated_at": "2026-01-29T13:00:00.000Z"
}
```

**Erros Possíveis:**

| Status | Mensagem              |
| ------ | --------------------- |
| 401    | Token não autorizado  |
| 400    | Pedido não encontrado |

---

## 🔴 Erros Comuns

### Formato de Erro de Validação (400)

```json
{
  "error": "Erro validação",
  "details": [
    {
      "campo": "email",
      "message": "Precisa ser um email válido"
    },
    {
      "campo": "password",
      "message": "A senha deve ter no minimo 6 caracteres"
    }
  ]
}
```

### Erro de Autenticação (401)

```json
{
  "error": "Token não autorizado"
}
```

### Erro de Permissão (401)

```json
{
  "error": "Não autorizado! Somente ADMINs"
}
```

---

## 📊 Resumo de Endpoints

| Método | Rota                 | Descrição                     | Auth | Admin |
| ------ | -------------------- | ----------------------------- | ---- | ----- |
| POST   | `/users`             | Criar usuário                 | ❌   | ❌    |
| POST   | `/session`           | Login                         | ❌   | ❌    |
| GET    | `/me`                | Detalhes do usuário logado    | ✅   | ❌    |
| POST   | `/category`          | Criar categoria               | ✅   | ✅    |
| GET    | `/category`          | Listar categorias             | ✅   | ❌    |
| DELETE | `/category`          | Deletar categoria             | ✅   | ✅    |
| POST   | `/product`           | Criar produto                 | ✅   | ✅    |
| GET    | `/products`          | Listar produtos               | ✅   | ❌    |
| DELETE | `/products`          | Deletar produto               | ✅   | ✅    |
| GET    | `/category/products` | Listar produtos por categoria | ✅   | ❌    |
| POST   | `/order`             | Criar pedido                  | ✅   | ❌    |
| DELETE | `/order`             | Deletar pedido                | ✅   | ❌    |
| GET    | `/orders`            | Listar pedidos                | ✅   | ❌    |
| POST   | `/order/add`         | Adicionar item ao pedido      | ✅   | ❌    |
| DELETE | `/order/remove`      | Remover item do pedido        | ✅   | ❌    |
| GET    | `/order/detail`      | Detalhes do pedido            | ✅   | ❌    |
| PUT    | `/order/send`        | Enviar pedido                 | ✅   | ❌    |
| PUT    | `/order/finish`      | Finalizar pedido              | ✅   | ❌    |

---

## 📄 Licença

ISC
