const { faker } = '@faker-js/faker';

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet")
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(helmet())

app.get("/cars", (req, res) => {
    res.json([
        { nome: "Lancer Evolution X", modelo: "Evo X", marca: "Mitsubishi", ano: 2015, preco: 250000 },
        { nome: "Corolla GLi", modelo: "GLi", marca: "Toyota", ano: 2020, preco: 95000 },
        { nome: "Civic Touring", modelo: "Touring", marca: "Honda", ano: 2021, preco: 145000 },
        { nome: "Golf GTI", modelo: "GTI", marca: "Volkswagen", ano: 2018, preco: 160000 },
        { nome: "Focus Titanium", modelo: "Titanium", marca: "Ford", ano: 2017, preco: 78000 },
        { nome: "Astra SS", modelo: "SS", marca: "Chevrolet", ano: 2008, preco: 42000 },
        { nome: "Onix LTZ", modelo: "LTZ", marca: "Chevrolet", ano: 2022, preco: 82000 },
        { nome: "HB20 Comfort", modelo: "Comfort", marca: "Hyundai", ano: 2019, preco: 65000 },
        { nome: "Sandero RS", modelo: "RS", marca: "Renault", ano: 2019, preco: 78000 },
        { nome: "Uno Sporting", modelo: "Sporting", marca: "Fiat", ano: 2014, preco: 35000 },
        { nome: "Gol GT", modelo: "GT", marca: "Volkswagen", ano: 1992, preco: 28000 },
        { nome: "Palio Sporting", modelo: "Sporting", marca: "Fiat", ano: 2016, preco: 42000 },
        { nome: "Corsa Wind", modelo: "Wind", marca: "Chevrolet", ano: 1998, preco: 15000 },
        { nome: "Ka SE", modelo: "SE", marca: "Ford", ano: 2020, preco: 55000 },
        { nome: "Jetta TSI", modelo: "TSI", marca: "Volkswagen", ano: 2017, preco: 125000 },
        { nome: "Fusion Titanium", modelo: "Titanium", marca: "Ford", ano: 2018, preco: 135000 },
        { nome: "Cruze LTZ", modelo: "LTZ", marca: "Chevrolet", ano: 2019, preco: 115000 },
        { nome: "Civic Si", modelo: "Si", marca: "Honda", ano: 2012, preco: 125000 },
        { nome: "Fit EX", modelo: "EX", marca: "Honda", ano: 2016, preco: 58000 },
        { nome: "City LX", modelo: "LX", marca: "Honda", ano: 2018, preco: 68000 },
        { nome: "Prisma LT", modelo: "LT", marca: "Chevrolet", ano: 2017, preco: 53000 },
        { nome: "Yaris XLS", modelo: "XLS", marca: "Toyota", ano: 2021, preco: 110000 },
        { nome: "Compass Limited", modelo: "Limited", marca: "Jeep", ano: 2022, preco: 185000 },
        { nome: "Renegade Trailhawk", modelo: "Trailhawk", marca: "Jeep", ano: 2020, preco: 140000 },
        { nome: "Tucson GLS", modelo: "GLS", marca: "Hyundai", ano: 2015, preco: 60000 },
        { nome: "Corolla Altis", modelo: "Altis", marca: "Toyota", ano: 2021, preco: 135000 },
        { nome: "Civic EXL", modelo: "EXL", marca: "Honda", ano: 2020, preco: 125000 }])
});

app.post("/cars", (req, res) => {
    const { nome, modelo, marca, ano, preco } = req.body;

    if(!nome || !marca || !preco) {
        return res.status(400).json({
            error: "Campos (nomes, marca e preco), são obrigatorios!!!"
        });
    }
    res.json({
        ensagem: "Carro adicionado com sucesso!!!",
        carro: req.body
    });
});
const PORT = 3003

app.listen(PORT, () => console.log(`A api esta roando em: http:localhost:${PORT}`));