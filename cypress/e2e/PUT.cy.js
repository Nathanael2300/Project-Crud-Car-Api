const CarsApi = require("../support/api/carsApi");
const { faker } = require("@faker-js/faker");

describe("PUT /cars", () => {
  const Car = {
    nome: faker.vehicle.vehicle(),
    marca: faker.vehicle.manufacturer(),
    modelo: faker.vehicle.model(),
    ano: faker.number.int({ min: 1990, max: 2025 }),
    preco: faker.number.int({ min: 20000, max: 300000 }),
  };

  it("Should update some field of the car", () => {
    const api = new CarsApi();

    const dataUpdate = { ...Car };
    return api.updateCar(1, dataUpdate).then((res) => {
      expect(res.status).to.be.eql(200);
      expect(res.body).to.have.property(
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
        expect(res.body.car).to.have.property(field);
        expect(res.body.car[field]).to.be.a(type);
      }

      const id = res.body.car.id;
      const expectedValue = {
        id: id,
        nome: Car.nome,
        modelo: Car.modelo,
        marca: Car.marca,
        ano: Car.ano,
        preco: Car.preco,
      };
      expect(res.body.car).to.deep.include(expectedValue);
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
      return api.createCar(Car).then((createRes) => {
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
