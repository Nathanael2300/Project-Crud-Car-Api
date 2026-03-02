const CarsApi = require("../support/api/carsApi");
const { faker } = require("@faker-js/faker");

describe("POST /cars", () => {
  const Car = {
    nome: faker.vehicle.vehicle(),
    marca: faker.vehicle.manufacturer(),
    modelo: faker.vehicle.model(),
    ano: faker.number.int({ min: 1990, max: 2025 }),
    preco: faker.number.int({ min: 20000, max: 300000 }),
  };

  it("Should register a car in the list", () => {
    const api = new CarsApi();

    return api.createCar(Car).then((createRes) => {
      expect(createRes.status).to.eql(201);
      expect(createRes.body).to.be.an("object");

      const expectedStructure = {
        id: "number",
        nome: "string",
        modelo: "string",
        marca: "string",
        ano: "number",
        preco: "number",
      };

      for (const [field, type] of Object.entries(expectedStructure)) {
        expect(createRes.body).to.have.property(field);
        expect(createRes.body[field]).to.be.a(type);
      }

      const id = createRes.body.id;
      return api.getCarById(id).then((getByIdres) => {
        expect(getByIdres.status).to.eql(200);
        expect(getByIdres.body).to.be.an("object");
        for (const [field, type] of Object.entries(expectedStructure)) {
          expect(getByIdres.body).to.have.property(field);
          expect(getByIdres.body[field]).to.be.a(type);
        }

        const expectedValue = {
          id: id,
          nome: Car.nome,
          modelo: Car.modelo,
          marca: Car.marca,
          ano: Car.ano,
          preco: Car.preco,
        };
        expect(res.status).to.eql(200);
        expect(res.body).to.deep.include(expectedValue);
      });
    });
  });

  const requiredFields = ["nome", "modelo", "marca", "ano", "preco"];

  for (const field of requiredFields) {
    it(`Should not create a car when ${field} is missing`, () => {
      const api = new CarsApi();
      const validCar = {
        nome: Car.nome,
        modelo: Car.modelo,
        marca: Car.marca,
        ano: Car.ano,
        preco: Car.preco,
      };

      delete validCar[field];

      return api
        .createCar(validCar, { failOnStatusCode: false })
        .then((createRes) => {
          expect(createRes.status).to.be.eql(400);
          expect(createRes.body).to.have.property(
            "error",
            "Campos nome, modelo, marca, ano e preco são obrigatórios.",
          );
        });
    });
  }
});
