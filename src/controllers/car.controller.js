const carModel = require("../models/car.model");

const getAllCars = async function (req, res) {
  try {
    const cars = await carModel.getAll();
    return res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getCarById = async function (req, res) {
  try {
    const id = Number(req.params.id);
    const car = await carModel.getById(id);
    if (!car) {
      return res.status(404).json({ error: "Carro, não encontrado" });
    }
    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const createCar = async function (req, res) {
  try {
    const { nome, modelo, marca, ano, preco } = req.body;

    if (
      nome == null ||
      modelo == null ||
      marca == null ||
      ano == null ||
      preco == null
    ) {
      return res.status(400).json({
        error: "Campos nome, modelo, marca, ano e preco são obrigatórios.",
      });
    }
    const fieldsStrings = [nome, modelo, marca];
    const fieldsNumbers = [ano, preco];
    if (
      fieldsStrings.some(
        (field) => typeof field !== "string" || field.trim() === "",
      )
    ) {
      return res.status(400).json({ error: "Campos com valores invalidos" });
    }
    if (
      fieldsNumbers.some(
        (field) => typeof field !== "number" || Number.isNaN(field),
      )
    ) {
      return res.status(400).json({ error: " Campos com valores invalidos" });
    }
    if (preco < 1) {
      return res.status(400).json({ error: "Preço do veículo inválido." });
    }
    const currentYear = new Date().getFullYear();
    if (!Number.isInteger(ano) || ano < 1990 || ano > currentYear + 1) {
      return res.status(400).json({
        error: `Ano do veículo inválido. (1990 até ${currentYear + 1})`,
      });
    }
    const car = await carModel.create({ nome, modelo, marca, ano, preco });
    res.status(201).json({
      message: "Carro criado com sucesso",
      car,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const updateCar = async function (req, res) {
  try {
    const reqId = Number(req.params.id);

    if (!Number.isInteger(reqId) || reqId <= 0) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const { nome, modelo, marca, ano, preco } = req.body;

    const updateData = {};
    if (nome !== undefined) updateData.nome = nome;
    if (modelo !== undefined) updateData.modelo = modelo;
    if (marca !== undefined) updateData.marca = marca;
    if (ano !== undefined) updateData.ano = ano;
    if (preco !== undefined) updateData.preco = preco;

    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ error: "Envie ao menos 1 campo para atualizar." });
    }

    const stringFields = ["nome", "modelo", "marca"];
    for (const f of stringFields) {
      if (updateData[f] !== undefined) {
        if (typeof updateData[f] !== "string" || updateData[f].trim() === "") {
          return res
            .status(400)
            .json({ error: "Campos com valores invalidos" });
        }
      }
    }

    const numberFields = ["ano", "preco"];
    for (const f of numberFields) {
      if (updateData[f] !== undefined) {
        if (typeof updateData[f] !== "number" || Number.isNaN(updateData[f])) {
          return res
            .status(400)
            .json({ error: "Campos com valores invalidos" });
        }
      }
    }

    if (updateData.preco !== undefined && updateData.preco < 1) {
      return res.status(400).json({ error: "Preço do veículo inválido." });
    }

    if (updateData.ano !== undefined) {
      const currentYear = new Date().getFullYear();
      if (
        !Number.isInteger(updateData.ano) ||
        updateData.ano < 1990 ||
        updateData.ano > currentYear + 1
      ) {
        return res.status(400).json({
          error: `Ano do veículo inválido. (1990 até ${currentYear + 1})`,
        });
      }
    }

    const car = await carModel.update(reqId, updateData);
    if (!car) {
      return res.status(404).json({ error: "Carro não encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Carro atualizado com sucesso", car });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const deleteCar = async function (req, res) {
  try {
    const reqId = Number(req.params.id);
    const car = await carModel.remove(reqId);
    if (!car) {
      return res.status(404).json({ error: "Carro não encontrado" });
    }
    res.status(200).json({
      message: "Carro deletado com sucesso",
      car,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = { getAllCars, getCarById, createCar, updateCar, deleteCar };
