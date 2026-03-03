# Node-express-cars 🚗

API simples criada com Node.js + Express para fins de estudo e prática de testes automatizados.

O objetivo do projeto é permitir a realização de operações CRUD (Create, Read, Update, Delete) sobre uma lista de carros armazenada em memória — sem banco de dados.

Este projeto também é utilizado para criar e praticar testes automatizados de API usando Cypress.

---

## 🏗 Arquitetura do Projeto

O projeto foi **reestruturado e refatorado seguindo o padrão MVC (Model-View-Controller)**, com separação clara de responsabilidades:

- **Model** → Responsável pela manipulação dos dados em memória.
- **Controller** → Responsável por tratar requisições HTTP, aplicar validações e retornar respostas.
- **Routes** → Responsável por definir os endpoints da aplicação.
- **Tests (Cypress)** → Testes automatizados desacoplados da lógica da aplicação.

Essa arquitetura melhora:

- Organização do código
- Manutenção
- Escalabilidade
- Legibilidade

---

## 🔄 Refatoração da Aplicação

Durante o desenvolvimento, o projeto passou por uma **refatoração completa**, incluindo:

- Reestruturação para arquitetura MVC
- Organização dos controllers
- Padronização de status codes HTTP
- Melhoria no tratamento de erros
- Melhorias nas validações
- Refatoração dos testes automatizados
- Separação clara de responsabilidades

O objetivo foi aplicar boas práticas e tornar a aplicação mais próxima de um ambiente real de desenvolvimento.

---

## 📁 Estrutura do Projeto

```bash
src/
 ├── controllers/
 │    └── carController.js
 ├── models/
 │    └── carModel.js
 ├── routes/
 │    └── carRoutes.js
 ├── app.js
 └── server.js

cypress/
 ├── e2e/
 │    └── cars.cy.js
```

---

## 🛠 Tecnologias utilizadas

- **Cors**
- **Morgan**
- **Helmet**
- **Node.js**
- **Express**
- **Nodemon**
- **JavaScript**
- **Cypress** (para testes automatizados)
- **Faker.js** (para gerar dados aleatórios nos testes)

---

## 🚀 Como rodar o projeto

### 1️⃣ Instale as dependências

```bash
npm install
```

### 2️⃣ Inicie o servidor

```bash
npm run dev
```

O servidor iniciará em:

```bash
http://localhost:3003
```

---

## 🔗 Endpoints da API

A API trabalha com o recurso **/cars**.

### ✔ GET /cars

Retorna a lista completa de carros.

### ✔ GET /cars/:id

Retorna um carro específico pelo ID.

### ✔ POST /cars

Cria um novo carro.

Exemplo de requisição:

```json
{
  "nome": "Corolla XEi",
  "modelo": "XEi",
  "marca": "Toyota",
  "ano": 2020,
  "preco": 120000
}
```

### ✔ PUT /cars/:id

Atualiza um carro pelo ID.

### ✔ DELETE /cars/:id

Remove um carro da lista.

---

## 🧪 Testes automatizados com Cypress

Este projeto conta com testes de API usando Cypress, incluindo:

- Criação de carro (POST)
- Busca de carro pelo ID (GET)
- Validação de status codes
- Uso de dados dinâmicos com Faker
- Chain de requisições (POST → GET)
- Verificação de estrutura do response
- Testes negativos (validação de campos obrigatórios)

Exemplo de teste:

```js
it("Should create a car and get it back", () => {
  // POST
  // GET
  // Validations...
});
```

---

## 🎯 Objetivo do Projeto

Este projeto foi criado com foco em:

- Praticar Node.js e Express
- Estudar CRUD básico
- Aplicar arquitetura MVC
- Praticar refatoração de código
- Criar uma API para treinar automação de testes
- Evoluir para um perfil SDET (Software Development Engineer in Test)

---

## 🚀 Próximos passos (Roadmap)

- Implementar integração com **MySQL** usando Sequelize ou Knex
- Criar camada de serviços (Service Layer)
- Implementar banco de dados real
- Criar testes de integração completos

---

## 🧑‍💻 Autor

**Nathanael Henrique Souza Nunes**  
Foco em QA / SDET  
Automação com Cypress | JavaScript | Node.js
