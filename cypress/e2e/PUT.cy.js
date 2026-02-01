const { faker } = require('@faker-js/faker');
import 'cypress-mochawesome-reporter/register';

class SubjectApi {
  requestHTTP = ({ method, url, body }) => {
    return cy.api({ method, url, body });
  };
}

describe("Method PUT", () => {
    it("Should change the data off the car", () => {
        const api = new SubjectApi();
        const updateCar = {
            nome: faker.vehicle.vehicle(),
            modelo: faker.vehicle.model(),
            marca: faker.vehicle.manufacturer(),
            ano: faker.number.int({ min: 2005, max: 2025 }),
            preco: faker.number.int({ min: 100000, max: 300000 })
        }
        const requestPUT = api.requestHTTP({
            method: "PUT",
            url: "/",
            body: updateCar
        });
        return requestPUT().then((res) => {
            cy.wrap(res.status).should("eq", 200);
            cy.wrap(res.body).should('have.property', 'mensagem', 'Nome do carro alterado com sucesso!!!-Modelo do carro alterado com sucesso!!!-Marca do carro alterado com sucesso!!!-Ano do carro alterado com sucesso!!!-Preco do carro alterado com sucesso!!!');
            cy.wrap(res.body.carro).should("deep.equal", {
                nome: updateCar.nome,
                modelo: updateCar.modelo,
                marca: updateCar.marca,
                ano: updateCar.ano,
                preco: updateCar.preco
            });
        });
    });
});
