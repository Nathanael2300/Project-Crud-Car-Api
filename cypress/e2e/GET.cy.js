import "cypress-mochawesome-reporter/register";
const CarsApi = require("../support/api/carsApi");

describe("GET /cars", () => {
  it("Should return a list of cars", () => {
    const api = new CarsApi();

    return api.getAll().then((getres) => {
      expect(getres.status).to.eql(200);
      expect(getres.body).to.be.an("array");
      for (const car of getres.body) {
        expect(car.id).to.be.a("number");
        expect(car.nome).to.be.a("string");
        expect(car.modelo).to.be.a("string");
        expect(car.marca).to.be.a("string");
        expect(car.ano).to.be.a("number");
        expect(car.preco).to.be.a("number");
      }
    });
  });

  it("Should return a car off the list", () => {
    const api = new CarsApi();
    return api.getCarById(1).then((getByIdres) => {
      expect(getByIdres.status).to.eql(200);
      expect(getByIdres.body).to.be.an("object");

      const expectedStructure = {
        id: "number",
        nome: "string",
        modelo: "string",
        marca: "string",
        ano: "number",
        preco: "number",
      };

      for (const [field, type] of Object.entries(expectedStructure)) {
        expect(getByIdres.body[field]).to.be.a(type);
      }
    });
  });
});
