import "cypress-mochawesome-reporter/register";
const CarsApi = require("../support/api/cars.service");
const { faker } = require("@faker-js/faker");
import { CarFactory } from "../support/factories/car.factory";

describe("PUT /cars", () => {
  const CarUpdate = {
    nome: faker.vehicle.vehicle(),
    marca: faker.vehicle.manufacturer(),
    modelo: faker.vehicle.model(),
    ano: faker.number.int({ min: 1990, max: 2025 }),
    preco: faker.number.int({ min: 20000, max: 300000 }),
  };

  it("Should update some field of the car", () => {
    const api = new CarsApi();
    const car = CarFactory.createCar();

    return api.createCar(car).then((createRes) => {
      expect(createRes.body).to.have.property(
        "message",
        "Carro criado com sucesso",
      );
      expect(createRes.status).to.eql(201);
      expect(createRes.body.car).to.have.property("id");
      const id = createRes.body.car.id;
      return api.updateCar(id, CarUpdate).then((UpdateRes) => {
        expect(UpdateRes.status).to.be.eql(200);
        expect(UpdateRes.body).to.have.property(
          "message",
          "Carro atualizado com sucesso",
        );
        const expectedStructure = {
          id: "number",
          nome: "string",
          modelo: "string",
          marca: "string",
          ano: "number",
          preco: "number",
        };

        for (const [field, type] of Object.entries(expectedStructure)) {
          expect(UpdateRes.body.car).to.have.property(field);
          expect(UpdateRes.body.car[field]).to.be.a(type);
        }

        const id = createRes.body.car.id;
        const expectedValue = {
          id: id,
          nome: CarUpdate.nome,
          modelo: CarUpdate.modelo,
          marca: CarUpdate.marca,
          ano: CarUpdate.ano,
          preco: CarUpdate.preco,
        };
        expect(UpdateRes.body.car).to.deep.include(expectedValue);
      });
    });
  });

  const invalidFields = {
    nome: 123,
    modelo: 456,
    marca: 789,
    ano: "1990",
    preco: "150000",
  };
  for (const [field, invalidValue] of Object.entries(invalidFields)) {
    it(`Should not update car when ${field} was invalid type`, () => {
      const api = new CarsApi();
      return api.createCar(CarUpdate).then((createRes) => {
        expect(createRes.status).to.eql(201);

        const id = createRes.body.id;
        return api
          .updateCar(
            id,
            {
              [field]: invalidValue,
            },
            { failOnStatusCode: false },
          )
          .then((updateRes) => {
            expect(updateRes.status).to.eql(400);
          });
      });
    });
  }
});
