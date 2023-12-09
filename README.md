# 🍽️ Sistema Pizzaria 🍽️

Sistema criado para controle de pedidos a fim de ser usado em restaurantes, pizzarias e similares!

Feito em aula junto ao @SujeitoProgramador

## Visão geral do projeto
Todas as stacks da aplicação foram criadas com a linguagem JavaScript, e o superset TypeScript.

> A ideia central do sistema é que o atendente que irá utilizar nosso aplicativo mobile consiga se 
comunicar de forma ágil e sem rúidos com o setor de produção, que estará utilizando uma interface web para ter conhecimento dos pedidos que devem preparar.

> Toda a comunicação entre atendente(*mobile*) e cozinha(*web*) é gerida pelo nosso próprio back-end.

### Funcionalidades gerais da aplicação
- Autenticação
  - [x] Cadastrar um novo usuário
  - [x] Logar um usuário
  - [x] Verificar autenticação do usuário para rotas privadas
  - [x] Mostrar detalhes do usuário logado
  
- Produtos
  - [x] Criar e listar categorias de produtos
  - [x] Criar produtos e listar os produtos de uma categoria específica

- Pedidos
  - [x] Abrir uma mesa (pedido) e fechar cancelar ela
  - [x] Adicionar items a uma mesa e removê-los
  - [x] Enviar pedido para a cozinha preparar
  - [x] Listar todos os pedidos registrados pelos atendentes
  - [x] Acessar os detalhes de um pedido
  - [x] Concluir o pedido (entregue ao cliente)

### Api
O servidor foi criado utilizando NodeJS aliado ao framework Express.

[Ver documentação completa da api](./server)

### Web
A aplicação web foi criada utilizando React JS aliado ao framework NextJS.

[Ver documentação completa da aplicação web](./web)

### Mobile
O aplicativo mobile foi criado com React Native junto a ferramenta Expo

[Ver documentação completa do aplicativo mobile](./mobile)


