const CarsApi = require("../support/api/carsApi");
const { faker } = require("@faker-js/faker");

describe("DELETE /Cars", () => {
  const Car = {
    nome: faker.vehicle.vehicle(),
    marca: faker.vehicle.manufacturer(),
    modelo: faker.vehicle.model(),
    ano: faker.number.int({ min: 1990, max: 2025 }),
    preco: faker.number.int({ min: 20000, max: 300000 }),
  };

  it("Should delete a car off the list", () => {
    const api = new CarsApi();

    return api.createCar(Car).then((createRes) => {
      expect(createRes.status).to.eql(201);
      expect(createRes.body).to.be.an("object");
      const id = createRes.body.id;
      return api.deleteCar(id).then((deleteRes) => {
        expect(deleteRes.body).to.have.property(
          "message",
          "Carro deletado com sucesso",
        );
        expect(deleteRes.status).to.eql(200);
        expect(createRes.body).to.be.an("object");
        return api
          .getCarById(id, { failOnStatusCode: false })
          .then((getById) => {
            expect(getById.status).to.eql(404);
            expect(getById.body).to.have.property(
              "error",
              "Carro, não encontrado",
            );
          });
      });
    });
  });
});
