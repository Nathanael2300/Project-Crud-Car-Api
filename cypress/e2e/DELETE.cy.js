import "cypress-mochawesome-reporter/register";
import CarsApi from "../support/api/cars.service";
import { CarFactory } from "../support/factories/car.factory";
import { faker } from "@faker-js/faker";

describe("DELETE /Cars", () => {
  it("Should delete a car off the list", () => {
    const api = new CarsApi();
    const car = CarFactory.createCar();

    return api.createCar(car).then((createRes) => {
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
