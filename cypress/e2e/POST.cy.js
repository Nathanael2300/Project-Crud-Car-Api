import "cypress-mochawesome-reporter/register";
import CarsApi from "../support/api/cars.service";
import { CarFactory } from "../support/factories/car.factory";

describe("POST /cars", () => {
  it("Should register a car in the list", () => {
    const api = new CarsApi();
    const car = CarFactory.createCar();

    return api.createCar(car).then((createRes) => {
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
          nome: car.nome,
          modelo: car.modelo,
          marca: car.marca,
          ano: car.ano,
          preco: car.preco,
        };
        expect(getByIdres.status).to.eql(200);
        expect(getByIdres.body).to.deep.include(expectedValue);
      });
    });
  });

  const requiredFields = ["nome", "modelo", "marca", "ano", "preco"];

  for (const field of requiredFields) {
    it(`Should not create a car when ${field} is missing`, () => {
      const api = new CarsApi();
      const car = CarFactory.createCar();

      const validCar = {
        nome: car.nome,
        modelo: car.modelo,
        marca: car.marca,
        ano: car.ano,
        preco: car.preco,
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
