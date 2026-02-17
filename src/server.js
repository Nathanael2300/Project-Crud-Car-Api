const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

let list = [
  {
    id: 1,
    nome: "Lancer Evolution X",
    modelo: "Evo X",
    marca: "Mitsubishi",
    ano: 2015,
    preco: 250000,
  },
  {
    id: 2,
    nome: "Corolla GLi",
    modelo: "GLi",
    marca: "Toyota",
    ano: 2020,
    preco: 95000,
  },
  {
    id: 3,
    nome: "Civic Touring",
    modelo: "Touring",
    marca: "Honda",
    ano: 2021,
    preco: 145000,
  },
  {
    id: 4,
    nome: "Golf GTI",
    modelo: "GTI",
    marca: "Volkswagen",
    ano: 2018,
    preco: 160000,
  },
  {
    id: 5,
    nome: "Focus Titanium",
    modelo: "Titanium",
    marca: "Ford",
    ano: 2017,
    preco: 78000,
  },
  {
    id: 6,
    nome: "Astra SS",
    modelo: "SS",
    marca: "Chevrolet",
    ano: 2008,
    preco: 42000,
  },
  {
    id: 7,
    nome: "Onix LTZ",
    modelo: "LTZ",
    marca: "Chevrolet",
    ano: 2022,
    preco: 82000,
  },
  {
    id: 8,
    nome: "HB20 Comfort",
    modelo: "Comfort",
    marca: "Hyundai",
    ano: 2019,
    preco: 65000,
  },
  {
    id: 9,
    nome: "Sandero RS",
    modelo: "RS",
    marca: "Renault",
    ano: 2019,
    preco: 78000,
  },
  {
    id: 10,
    nome: "Uno Sporting",
    modelo: "Sporting",
    marca: "Fiat",
    ano: 2014,
    preco: 35000,
  },
  {
    id: 11,
    nome: "Gol GT",
    modelo: "GT",
    marca: "Volkswagen",
    ano: 1992,
    preco: 28000,
  },
  {
    id: 12,
    nome: "Palio Sporting",
    modelo: "Sporting",
    marca: "Fiat",
    ano: 2016,
    preco: 42000,
  },
  {
    id: 13,
    nome: "Corsa Wind",
    modelo: "Wind",
    marca: "Chevrolet",
    ano: 1998,
    preco: 15000,
  },
  {
    id: 14,
    nome: "Ka SE",
    modelo: "SE",
    marca: "Ford",
    ano: 2020,
    preco: 55000,
  },
  {
    id: 15,
    nome: "Jetta TSI",
    modelo: "TSI",
    marca: "Volkswagen",
    ano: 2017,
    preco: 125000,
  },
  {
    id: 16,
    nome: "Fusion Titanium",
    modelo: "Titanium",
    marca: "Ford",
    ano: 2018,
    preco: 135000,
  },
  {
    id: 17,
    nome: "Cruze LTZ",
    modelo: "LTZ",
    marca: "Chevrolet",
    ano: 2019,
    preco: 115000,
  },
  {
    id: 18,
    nome: "Civic Si",
    modelo: "Si",
    marca: "Honda",
    ano: 2012,
    preco: 125000,
  },
  {
    id: 19,
    nome: "Fit EX",
    modelo: "EX",
    marca: "Honda",
    ano: 2016,
    preco: 58000,
  },
  {
    id: 20,
    nome: "City LX",
    modelo: "LX",
    marca: "Honda",
    ano: 2018,
    preco: 68000,
  },
  {
    id: 21,
    nome: "Prisma LT",
    modelo: "LT",
    marca: "Chevrolet",
    ano: 2017,
    preco: 53000,
  },
  {
    id: 22,
    nome: "Yaris XLS",
    modelo: "XLS",
    marca: "Toyota",
    ano: 2021,
    preco: 110000,
  },
  {
    id: 23,
    nome: "Compass Limited",
    modelo: "Limited",
    marca: "Jeep",
    ano: 2022,
    preco: 185000,
  },
  {
    id: 24,
    nome: "Renegade Trailhawk",
    modelo: "Trailhawk",
    marca: "Jeep",
    ano: 2020,
    preco: 140000,
  },
  {
    id: 25,
    nome: "Tucson GLS",
    modelo: "GLS",
    marca: "Hyundai",
    ano: 2015,
    preco: 60000,
  },
  {
    id: 26,
    nome: "Corolla Altis",
    modelo: "Altis",
    marca: "Toyota",
    ano: 2021,
    preco: 135000,
  },
  {
    id: 27,
    nome: "Civic EXL",
    modelo: "EXL",
    marca: "Honda",
    ano: 2020,
    preco: 125000,
  },
];

app.get("/cars", (req, res) => {
  res.json(list);
});

app.get("/cars/:id", (req, res) => {
  const { id } = req.params;
  const findIdCar = list.find((find) => find.id == id);
  if (!findIdCar) {
    return res.status(404).json({ mensagem: "carro não encontrado" });
  }
  res.json([findIdCar]);
});

app.post("/cars", (req, res) => {
  const { nome, modelo, marca, ano, preco } = req.body;

  if (!nome || !modelo || !marca || !ano || !preco) {
    return res.status(400).json({
      error: "Campos (nomes, modelo,marca, ano e preco), são obrigatorios!!!",
    });
  }
  res.json({
    mensagem: "Carro adicionado com sucesso!!!",
    carro: req.body,
  });
});

app.put("/cars", (req, res) => {
  const { nome, modelo, marca, ano, preco } = req.body;

  const mensagens = [];

  if (nome) mensagens.push("Nome do carro alterado com sucesso!!!");
  if (modelo) mensagens.push("Modelo do carro alterado com sucesso!!!");
  if (marca) mensagens.push("Marca do carro alterado com sucesso!!!");
  if (ano) mensagens.push("Ano do carro alterado com sucesso!!!");
  if (preco) mensagens.push("Preco do carro alterado com sucesso!!!");

  res.json({ mensagem: mensagens.join("-"), carro: req.body });
});

app.delete("/cars/:id", (req, res) => {
  const { id } = req.params;
  const index = list.findIndex((find) => find.id == id);

  const carroDeletado = list[index];

  list.splice(index, 1);
  if (index === -1) {
    return res.status(404).json({ mensagem: "Carro não encontrado" });
  }
  res.json({
    carroDeletado: carroDeletado,
    mensagem: `${carroDeletado.nome} deletado com sucesso!!!`,
  });
});
const PORT = 3003;

app.listen(PORT, () =>
  console.log(`A api esta roando em: http:localhost:${PORT}`),
);
