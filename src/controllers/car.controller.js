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
    res.status(201).json(car);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const updateCar = async function (req, res) {
  try {
    const reqId = Number(req.params.id);
    const { nome, modelo, marca, ano, preco } = req.body;
    const fieldsStrings = [nome, modelo, marca];
    const fieldsNumbers = [ano, preco];
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
    if (!Number.isInteger(reqId) || reqId <= 0) {
      return res.status(400).json({ error: "ID inválido." });
    }
    const currentYear = new Date().getFullYear();
    if (!Number.isInteger(ano) || ano < 1990 || ano > currentYear + 1) {
      return res.status(400).json({
        error: `Ano do veículo inválido. (1990 até ${currentYear + 1})`,
      });
    }
    const car = await carModel.update(reqId, {
      nome,
      modelo,
      marca,
      ano,
      preco,
    });
    if (!car) {
      return res.status(404).json({ error: "Carro não encontrado" });
    }
    res.status(200).json({
      message: "Carro atualizado com sucesso",
      car,
    });
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
    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = { getAllCars, getCarById, createCar, updateCar, deleteCar };
