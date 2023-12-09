# Api Pizzaria

A Api do sistema foi criada utilizando NodeJS aliado ao TypeScript, para gerir o banco de dados e comunicar a aplicação web com o aplicativo mobile.

<!-- ▶️ Rodar api em desenvolvimento

Para realizar o uso das interfaces é necessário api rodando!
Para subir em ambiente local, com o projeto em sua máquina rode na raiz: 
```
``` -->



## Rotas
- Rotas de Pedido
  - POST ``` /order ``` Cria novo pedido(abre uma mesa)
  - POST ``` /order/add ``` Adiciona produto a um pedido
  - DELETE ``` /order ``` Cancela um pedido
  - DELETE ``` /order/remove ``` Remove um produto do pedido
  - PUT ``` /order/send ``` Envia pedido para aplicação web
  - PUT ``` /order/finish ``` Altera o pedido para comcluído
  - GET ``` /orders ``` Retorna todos os pedidos a serem preparados
  - GET ``` /order/detail ``` Retorna todos os detalhes de um pedido

- Rotas de produto
  - POST ``` /product ``` Cria um novo produto
  - GET ``` /category/product ``` Retorna todos os produtos de uma categoria

- Rotas de categoria
  - POST ``` /category ``` Cria uma nova categoria
  - GET ``` /category ``` Retorna todas as categorias

- Rotas de User
  - POST ``` /users ``` Cria um novo usuário
  - POST ``` /session ``` Faz login de um usuário
  - GET ``` /me ``` Retorna os detalhes do usuário




