# Pizzaria Mobile

A aplicação mobile criada com React Native junto ao Expo irá ser utilizada pelo atendente para registrar os pedidos dos clientes que será enviado ao setor de produção(aplicação web).

#### Foram pensados todos os casos em que o cliente pode preferir cancelar ou alterar algo durante o atendimento.

## ▶️ Testar projeto

Com o projeto em sua máquina, rode na raiz:

```
npm install
```
em seguida:
```
npx expo start
```

>Lembre-se de estar com a api do sistema rodando | [iniciar api](../server)

## 💠 Funcionalidades
- Logar usuário
- Abrir um mesa para novo pedido
- Fechar uma mesa(cliente decidiu não pedir)
- Adicionar produto ao pedido junto da quantidade, e se o cliente optar, excluí-lo
- Fechar pedido que será encaminhado no mesmo momento para o setor de produção

## 🔱 Ferramentas utilizadas
- React Native com Expo
- TypeScript
- React Navigation
- Axios

## Tela de Login
![Login-app](https://github.com/BertanDev/uno_pizza/assets/72395637/7ffbd0fe-f352-4616-af75-fb38007ca7da)

## Tela para abrir um novo pedido
![Novo pedido](https://user-images.githubusercontent.com/72395637/206809093-29d0aef8-b8aa-431d-83c7-8004406419b8.png)

## Tela com pedido aberto sem produtos
![Cadastrando itens-1](https://user-images.githubusercontent.com/72395637/206809390-cde0676d-0183-4beb-9e79-9e5035e72fe3.png)

## Tela com pedido aberto(Modal para seleção de categoria e produto)
![Modal - Aberto](https://user-images.githubusercontent.com/72395637/206809410-1512e480-48e2-43d5-90d4-c342598cb783.png)

## Tela com pedido aberto com items adicionados
![WhatsApp Image 2022-12-09 at 8 06 35 PM](https://user-images.githubusercontent.com/72395637/206809979-d1c1ed6b-7e13-4151-84ac-9890f5e4a2da.jpeg)

## Tela de envio de pedido para setor de produção
![Enviando pedido](https://user-images.githubusercontent.com/72395637/206809994-a593dd4a-811f-4803-b3f5-75ef0c9bba5c.png)
